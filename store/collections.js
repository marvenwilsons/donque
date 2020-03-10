export const state = () => ({
    rawData_fromServer: [],
    collections: [],
    categories: [],
    
    //
    Category_being_opened: undefined // title or name, String type
})

// getter returns data
export const getters = {
    // Collections
    getAllCollections: state => {
        return state.collections
    },
    getCollection(state) {
        /**
         * @param CollectionName: String, Name of the collection
         * returns the schema the info and the categories of the collection
         * requested
         * @Return type: Object
         */
        return function(CollectionName) {
            let f = undefined
            if(state.rawData_fromServer) {
                state.rawData_fromServer.map(collection => {
                    if(collection.collection_name == CollectionName) {
                        f = collection
                    } 
                })
            }

            if(!f) {
                f = `Cannot find collection "${CollectionName}"`
            }

            return f
        }
    },
}

// mutating the state
export const mutations = {
    mutate_Collections(state, payload) {
        state.collections = payload
    },
    mutate_Categories(state,payload) {
        
    },
    mutate_RawData(state,payload) {
        state.rawData_fromServer = payload
    },
    mutate_Category_being_opened(state, payload) {
        state.Category_being_opened = payload
    }
}
// actions executing mutations
export const actions = {
    //
    getCollectionDataFromServer({ commit, state }, context) {
        this.dispatch("systemCall", {
            command: "fetchCollections",
            section: "collectionMethods",
            data: {},
            method: "post"
        })
        .then(({ data, status }) => {
            if (status) {
                //
                const ContentFrom_Server = data.actions[0].contents;
                commit('mutate_RawData',ContentFrom_Server)

                //
                setTimeout(() => {
                    this.dispatch('collections/parseAndPopulateCollections')
                    this.dispatch('collections/parseAndPopulateCategories')
                }, 0);
            }
        })
        .catch(err => {
            alert(err);
        });
    },
    //
    parseAndPopulateCollections({commit, state}, context) {
        let cls = []
        state.rawData_fromServer.map(e => {
            cls.push({
                'Collection Name' : e.collection_name,
                'Categories' : e.categories
            })
        })

        commit('mutate_Collections',cls)        
    },
    parseAndPopulateCategories({commit, state}, context) {

    }
}