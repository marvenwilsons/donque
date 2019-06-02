export const state = () => ({
    isOpen: false,
    mode: undefined
})

export const mutations = {
    set_state(state, value) {
        console.log('set notification state')
        state.isOpen = !state.isOpen
    }
}