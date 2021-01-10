const config = {
    adminDefaults: {
        titles: [
            'owner',
            'spectator'
        ],
        defaultServices: [
            'page',
            'collections',
            'service-manager'
        ],
        /** use on creating new collection */
        defaultCollection: {
            collectionName: '',
            collectionContent: [],
            config: {
                loginOnAccess: false,
                collectionPassword: '',
                collectionUsername: '',
                collectionSchema: {},
                allowedTitlesToAccess: ['owner'] /** array of string, of titles */
            }, 
        }
    }
}

module.exports = config