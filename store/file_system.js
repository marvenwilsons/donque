export const state = () => ({
    tempData: undefined
})

export const mutations = {
    setTempData(state,payload) {
        state.tempData = payload
    }
}

export const actions = {
    setTempData({commit,state},context) {
        commit('setTempData',context)

        setTimeout(() => {
            commit('setTempData',undefined)
        }, 1000);
    }
}