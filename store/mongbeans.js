export const state = () => ({
    mongbeans: [], // array of object only
    expandedCount: 0,
    initialKeys: [],
    nesteds: {},
    isLoaded: false,
    isCollapse: false,
    widths: {},
    curr_width: undefined,
    testData: false,
})

export const mutations = {
    populateInitailKeys({ state }, context) {
        state.initialKeys = Object.keys(context)
    },
    changeCollapseState({ state }, context) {
        state.isCollapse = context
    },
    setCurWidth(state, context) {
        if(typeof context === 'number'){
            state.curr_width = context
        }else {
            state.curr_width = Object.values(state.widths).sort()[0]
        }
    }
}

export const getters = {
    latestMongbeans: state => {
        return state.mongbeans
    },
    getLatestExpandedCount: state => {
        return state.expandedCount
    },
    getCollapseState(state) {
        return state.isCollapse
    }
}