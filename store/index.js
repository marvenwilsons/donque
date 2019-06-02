export const state = () => {
    app: undefined // add data use for initialing the app admin area
    admin: undefined // data for the current log admin, used for inializing the admin dashboard
    actions: undefined // actions received from server, an object containing array of actions
    messages: undefined
    resources: undefined
}

export const getters = {
    actionState: state => {
        console.log('store action state')
        return state.actions
    },
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
        console.log(serverData.data)
        state.actions = serverData.data.actions
        state.app = serverData
    },
    systemCallMutation(state,payloadData){
        state.actions = payloadData.actions
        state.messages = payloadData.msg
    },
    setActions(state,payload) {
        state.actions = payload
    },
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
        return this.$axios.$get('/dqapp/_dq', {
            params: {
                content: 'init',
                path: context.route.matched[0].name
            }
        })
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
                return this.$axios.$get('/dqapp/_dq', {
                    params: context
                }).then(response => {
                    console.log(`** [systemCall]-[store] request Ok!`)
                    console.log(response)
                    commit('systemCallMutation', {
                        msg: response.data.msg,
                        actions: response.data.actions
                    })
                    return response
                }).catch(err => {
                    console.log(`** [systemCall]-[store] fetch error!`)
                    alert('there was an error in systemCall store')
                    console.log(err)
                })
            case 'post' || 'update' || 'delete':
                console.log(`** [systemCall]-[store] executing ${context.command}`)
                return this.$axios.$post('/dqapp/_dq', context)
                    .then(response => {
                        commit('systemCallMutation', {
                            msg: response.data.msg,
                            actions: response.data.actions
                        })
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