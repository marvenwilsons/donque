export const state = () => ({
    visibility: false
})

export const mutations = {
    set_visibility(state,value) {
        state.visibility = value
    }
}