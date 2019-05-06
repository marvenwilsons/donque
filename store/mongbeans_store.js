// DISCONTTNUED

const mongbeans = {
    state: {
        mongbeans: [], // array of object only
        expandedCount: 0,
        initialKeys: [],
        nesteds: {},
        isLoaded: false,
        isCollapse: false,
        widths: {},
        curr_width: undefined,
        testData: false,
    },
    actions: {
        populateInitailKeys({state},context){
            state.initialKeys = Object.keys(context)
        },
        changeCollapseState( {state}, context ) {
            state.isCollapse = context
        }
    },
    getters: {
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
}

export default mongbeans
