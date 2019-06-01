export const state = () => {
    isOpen: false
    mode: undefined
}

export const mutations = {
    set_state(state, value) {
        state.isOpen = value
    }
}