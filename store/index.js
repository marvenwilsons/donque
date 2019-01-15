import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            app: undefined,
            admin: undefined,
            user: undefined,
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
                closable: false
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

                return this.$axios.$get('/dqapp/app',{
                    params: {
                        content: request.componentName
                    }
                })
                    .then(res => {
                        // store to state
                        store.commit('setApp', res)
                    })
                    .catch(e => {
                        context.error(e)
                    })
            }

        },
        mutations: {
            setApp(state, payload) {
                state.app = payload
            },
            close_pane(state, payload) {
                state.comp.paneWidth.splice(payload, 1)
                state.comp.arr.splice(payload, 1)
                // history.go(-1)
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
            }
        }
    })
}

export default createStore
