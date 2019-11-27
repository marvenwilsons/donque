module.exports = {
    // Collections
    addCollection: require('./collection/addCollection'),
    deleteCollection: require('./collection/deleteCollection'),
    fetchCollections: require('./collection/fetchCollections'),
    updateCollectionSchema: require('./collection/updateCollectionSchema'),
    
    // Categories
    addRootCategory : require('./category/addRootCategory'),
    deleteCategory : require('./category/deleteCategory'),
    updateCategory : require('./category/updateCategory')
}