import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            comp: {
                arr: [],
                arrLen: 0,
                currentIndex: 0,
                currentPosition: 0,
                paneTitle: undefined,
                paneWidth: [],
                paneHeadColor: []
            },
            modal: {
                visibility:false,
                head:undefined,
                body:undefined,
                closable: false
            }
        },
        mutations: {
            close_pane(state, payload) {
                state.comp.paneWidth.splice(payload,1)
                state.comp.arr.splice(payload, 1)
            },
            addComponent(state, payload) {
                // console.log(payload)
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
            },
            assign_pane_title(state, payload){
                state.comp.paneTitle = payload
            }
        }
    })
}

export default createStore
