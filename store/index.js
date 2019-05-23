export const state = () => {
    app: undefined
    admin: undefined
}

export const mutations = {
    setAppdata(state,arg) {

    }
}

export const actions = {
    /**
     * fetch data from server on app start
     */
    nuxtServerInit (store,context) {
        return this.$axios.$get('/dqapp/_dq', {
            params: {
                content: 'init',
                path: context.route.matched[0].name
            }
        })
            .then(res => {
                // store to state
                console.log('store received data')
                store.commit('setApp', res)
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