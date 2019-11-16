export const state = () => ({
    app: undefined, // add data use for initialing the app admin area
    admin: undefined, // data for the current log admin, used for inializing the admin dashboard
    actions: [], // actions received from server, an object containing array of actions
    messages: undefined,
    resources: undefined,
    actionPointer: undefined,
    fromServer: false,
    current_page: undefined,
    collection_data: [],
    is404: false,
})

export const getters = {
    actionState: state => {
        return state.actions
    },
    actionPointer: state => state.actionPointer,
    modalState: state => {
        return !state.modal.visibility ? 'modal is open' : 'modal is close'
    },
    hasErr: state => {
        return state.hasErr
    }
}

export const mutations = {
    setAppData(state,serverData) {
        console.log('** setting app data')
        state.actions = serverData.data.actions
        state.app = serverData
        
        //
        if (serverData.data.public){
            state.current_page = serverData.data.public.sections
            
            // @collections store
            // fetch collections
            // loop through the current page data, find if there is an object
            // that isAlist, then get the address of the list use it to fetch the collection
            // assign the value to the collection_data
            // this.dispatch('systemCall', {

            // })
        }
    },
    set404(state,val) {
        state.is404 = val
    },
    systemCallMutation(state,payloadData){
        console.log('** systemCall mutation')
        console.log(`   actionPointer (b) ${state.actionPointer}`)

        state.actions = payloadData.actions
        state.messages = payloadData.msg
        state.actionPointer = 0
        state.fromServer = true

        console.log(`   actionPointer (a) ${state.actionPointer}`)
    },

    // actions
    setActions(state,payload) {
        state.actions.push(payload)
    },
    clearActions(state){
        state.actions = []
    },
    nextAction(state) {
        const clear = () => {
            state.actions = []
            state.messages = undefined
            state.actionPointer = undefined
            state.modal.visibility = false
            state.fromServer = false
            this.commit('modal/reset_modal')
        }
        
        if (state.actions.length - 1 != state.actionPointer){
            state.actionPointer = state.actionPointer + 1
            if (state.fromServer == false){
                clear()
            }
        }else{
            // clear actions, msgs, actionPointer
            if (state.actions[state.actionPointer].title != 'prompt_err'){
                this.commit("modal/exec_after_hook")
            }
            clear()
        }
    },

    //
    logout() {
        this.$axios.$post('/dqapp/_dq', {
            token: localStorage.getItem("auth"),
            username: localStorage.getItem("username"),
            section: 'adminMethods',
            command: 'adminLogout'
        }).then((data) => {
            if (data.status) {
                localStorage.clear()
                location.reload()
            }
        })        
    }
}

export const actions = {
    /**
     * fetch data from server for application to start
     */
    nuxtServerInit (store,context) {
        console.log('** [NuxtServerInit] fetching server resource')

        let param = {}

        if(context.route.path == '/admin'){
            param = {
                content: 'init',
                path: context.route.path
            }
        } else {
            param = {
                username: undefined,
                token: undefined,
                section: 'pageMethods',
                command: 'getPageContents',
                data: {
                    path: context.route.path
                }
            }
        }
        
        return this.$axios.$get('/dqapp/_dq', {params: param})
            .then(serverData => {
                // store to state
                console.log('** [NuxtServerInit] server resource received')
                store.commit('setAppData', serverData)
            })
            .catch(e => {
                console.log('err')
                console.log(e)
                context.error(e)
            })
    },
    /**
     * general purpose method for reaching the
     * server
     */
    systemCall({commit,state},context) {
        console.log('** SystemCall')
        switch (context.method) {
            case 'get' || 'read':
                console.log(`** [systemCall]-[store] fetching ${context.command}`)
                context.username = localStorage.getItem('username')
                context.token = localStorage.getItem('auth')
                return this.$axios.$get('/dqapp/_dq', {
                    params: context
                }).then(response => {
                    console.log(`** [systemCall]-[store] request Ok!`)
                    if (response.data.msg != null){
                        commit('systemCallMutation', {
                            msg: response.data.msg,
                            actions: response.data.actions
                        })
                    }

                    return response
                }).catch(err => {
                    console.log(`** [systemCall]-[store] fetch error!`)                    
                    this.commit("modal/set_modal", {
                        head: "SystemCall Error",
                        body: err,
                        config: {
                            ui_type: "err",
                            closable: false
                        }
                    });
                })
            case 'post' || 'update' || 'delete':
                console.log(`** [systemCall]-[store] executing ${context.command}`)
                context.username = localStorage.getItem('username')
                context.token = localStorage.getItem('auth')
                return this.$axios.$post('/dqapp/_dq', context)
                    .then(response => {
                        console.log(response)
                        if (response.data.msg != null) {
                            commit('systemCallMutation', {
                                msg: response.data.msg,
                                actions: response.data.actions
                            })
                        }
                        console.log(`** [systemCall]-[store] request Ok!`)
                        if (!response.status) {
                            state.hasErr = true
                        } else {
                            state.hasErr = false
                        }
                        return response
                    }).catch(err => {
                        console.log(err)
                    })
        }
    }
}   