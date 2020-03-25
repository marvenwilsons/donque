module.exports = {
    // Collections
    addCollection: require('./collection/addCollection'),
    deleteCollection: require('./collection/deleteCollection'),
    fetchCollections: require('./collection/fetchCollections'),
    updateCollectionSchema: require('./collection/updateCollectionSchema'),
    getCollectionContents: require('./collection/getCollectionContents'),

    // Categories
    addRootCategory : require('./category/addRootCategory'),
    deleteCategory : require('./category/deleteCategory'),
    updateCategory : require('./category/updateCategory'),

    // Entries
    addEntry: require('./collection-entry/addEntry'),
    deleteEntry: require('./collection-entry/deleteEntry'),
    getEntries: require('./collection-entry/getEntries'),
    getEntry: require('./collection-entry/getEntry'),
    updateEntry: require('./collection-entry/updateEntry')
}