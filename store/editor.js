export const state = () => ({
    currentClicked: undefined,
    currentHover: undefined
})

export const mutations = {
    setCurrentClicked(state,payload) {
        state.currentClicked = payload
    },
    hover(state,payload) {
        console.log(payload)
        state.currentHover =  payload
    }
}