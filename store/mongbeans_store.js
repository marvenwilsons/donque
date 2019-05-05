// DISCONTTNUED

const mongbeans = {
    state: {
        mongbeans: [], // array of object only
        expandedCount: 0,
        initialKeys: [],
        nesteds: {},
        isLoaded: false,
        widths: {},
        curr_width: undefined
    },
    actions: {
        populateInitailKeys({state},context){
            state.initialKeys = Object.keys(context)
        },
        populateMongBeans({ commit, state }, context) {
            state.mongbeans.push(context)
        },
        incExpandedCount: ({state}) => {
            state.expandedCount++
        },
        trimMongBeansArray: ({ state }, context) => {
            // find the similar object in the mongbeans array from context.val then get the array index

            function isEquivalent(a, b) {
                // Create arrays of property names
                var aProps = Object.getOwnPropertyNames(a === null ? {} : a);
                var bProps = Object.getOwnPropertyNames(b === null ? {} : b);

                // If number of properties is different,
                // objects are not equivalent
                if (aProps.length != bProps.length) {
                    return false;
                }

                for (var i = 0; i < aProps.length; i++) {
                    var propName = aProps[i];

                    // If values of same property are not equal,
                    // objects are not equivalent
                    if (a[propName] !== b[propName]) {
                        return false;
                    }
                }

                // If we made it this far, objects
                // are considered equivalent
                return true;
            }

            function getItemsFromIndex(index) {
                console.log('getitems from index')
                const arrlen = state.mongbeans.length
            }

            state.mongbeans.map((items,items_index) => {
                if (isEquivalent(items.val,context.val)){
                    getItemsFromIndex(items_index)
                    state.mongbeans.splice(items_index,items_index)
                }
            })
        }
    },
    getters: {
        getNesteds(state) {

        },
        latestMongbeans: state => {
            return state.mongbeans
        },
        getLatestExpandedCount: state => {
            console.log('latest expanded count')

            return state.expandedCount
        }
    }
}

export default mongbeans
