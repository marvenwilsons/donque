export const state = () => ({
    isOpen: true,
    mode: undefined
})

export const getters = {
    notification_state: state => state.isOpen 
}

export const mutations = {
    set_state(state) {
        console.log('set notification state')
        state.isOpen = !state.isOpen
    },
}