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
        defaultCollections: [
            {
                name: 'Forgot Password Request',
                schema: JSON.stringify({
                    firstName: 'String',
                    lastName: 'String',
                    email: 'String'
                })
            },
            {
                name: 'Retrieve Account Request',
                schema: JSON.stringify({
                    firstName: 'String',
                    lastName: 'String',
                    email: 'String'
                })
            }
            
        ]
    }
}

module.exports = config