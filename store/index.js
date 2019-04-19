import Vuex from 'vuex'
import paneConf from "@/server/sys/core-apps/pane-system/module/paneconf.js";

const createStore = () => {
    return new Vuex.Store({
        state: {
            app: undefined,
            admin: undefined,
            user: undefined,
            notificationPane: false,
            actions: undefined,
            current_action_title: '',
            message: undefined,
            resources: undefined,
            administrationCurrentView: undefined,
            isCurrentProcessDone: undefined,
            hasErr: false,
            paneConf,
            comp: {
                arr: [],
                arrLen: 0,
                currentIndex: 0,
                currentPosition: 0,
                paneTitle: undefined,
                paneWidth: [],
                paneHeadColor: [],
                currentUrl: undefined,
                parentUrl: undefined
            },
            modal: {
                visibility: false,
                head: undefined,
                body: undefined,
                closable: false,
            },
            spinner: false,
            execAfterTruthyModalClose: undefined
        },
        getters: {
            actionState: state => {
                return state.actions
            },
            modalState: state => {
                return !state.modal.visibility ? 'modal is open' : 'modal is close'
            },
            hasErr: state => {
                return state.hasErr
            }

        },
        actions: {
            close_pane: ({ commit }, payload) => {
                commit('close_pane', payload)
                if (payload.position == 0) {
                    commit('addComponent', {
                        component: {
                            name: 'dashboard'
                        },
                        position: 0
                    })
                }
            },
            firstLoad: ({ commit }) => {
                commit('addComponent', {
                    component: {
                        name: 'dashboard'
                    },
                    position: 0
                })
            },
            nuxtServerInit(store, context) {
                // on every first load after login
                let request = {}
                request.componentName = context.route.matched[0].name
                console.log('hello world!')
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
            // general purpose method to reach the cardinal system
            systemCall({commit, state},context) {
                console.log('** [systemCall]-[store] reaching server')
                context.username = localStorage.getItem("username")
                context.token = localStorage.getItem("auth")

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
                                if(!response.status){
                                    state.hasErr = true
                                }else {
                                    state.hasErr = false
                                }
                                return response
                            }).catch(err => {
                                console.log(err)
                            })
                }
            },
            // this function execute after every modal close and successful reach to cardinal system 
            execAfterTruthy({state}) {
                if(state.execAfterTruthyModalClose){
                    state.execAfterTruthyModalClose()
                }
            },
            // Pane method
            changeCurrentPanesWith({commit, state}, context) {

            }
        },
        mutations: {
            systemCallMutation(state, payload) {
                state.message = payload.msg
                state.actions = payload.actions
            },
            notificationPane(state, payload) {
                state.notificationPane = payload
            },
            signOut() {
                this.$axios.$post('/dqapp/_dq', {
                    token: localStorage.getItem("auth"),
                    username: localStorage.getItem("username"),
                    section: 'adminMethods',
                    command: 'adminLogout'
                }).then((data) => {
                    if (data.status) {
                        localStorage.clear();
                        location.reload()
                    }
                })
            },
            setApp(state, payload) {
                console.log('payload')
                state.actions = payload.data.actions
                state.app = payload
            },
            close_pane(state, payload) {
                state.comp.paneWidth.splice(payload, 1)
                state.comp.arr.splice(payload, 1)
            },
            addComponent(state, payload) {
                // pushing new item to array
                state.comp.arr.push(payload.component)

                // current position click
                state.comp.currentPosition = payload.position

                // array lenth
                var len = state.comp.arr.length
                state.comp.arrLen = len

                // current index
                if (len === 0) {
                    state.comp.currentIndex = NaN
                } else {
                    state.comp.currentIndex = len - 1
                }

                // fires when switch to another pane
                if (state.comp.arrLen != state.comp.currentPosition + 1) {
                    // remove item in arr position and replace it with new component 
                    state.comp.arr.splice(state.comp.currentPosition, state.comp.arrLen, payload.component)

                    state.comp.arr.splice(state.comp.currentIndex, 1)

                    var currentLength = state.comp.arr.splice(state.comp.currentIndex, 1).length + state.comp.arrLen - 1
                    state.comp.arrLen = currentLength
                }


                // current url
                let cur_url = []
                state.comp.arr.map(e => {
                    cur_url.push(e.headName)
                })
                state.comp.currentUrl = `admin/${cur_url.join('/')}`
                state.comp.parentUrl = state.comp.currentUrl.split('/')[state.comp.currentPosition]

                // if (state.comp.currentIndex == 0){
                //     history.pushState(null, null, state.comp.currentUrl)
                // } else if (state.comp.currentIndex == 1){
                //     history.pushState(null, null, cur_url.join('/'))
                // }
            },
            assign_pane_title(state, payload) {
                state.comp.paneTitle = payload
            },
            changeCurrentPaneSettings(state,{property, value}) {
                if(property === 'pane-width'){
                    const currentValidLen = state.comp.arr.length - 1 < 0 ? 0 : state.comp.arr.length - 1
                    state.comp.arr[currentValidLen].headWidth = value
                }else {
                    alert(`Error in Mutations: changeCurrentPaneSettings property ${property} has no cases`)
                }
            }
            
        }
    })
}

export default createStore
