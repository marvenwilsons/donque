const config = {
    adminDefaults: {
        titles: [
            {
                name: 'master',
                services: '*'
            },
            {
                name: 'admin',
                services: [
                    'page',
                    'collections',
                    // 'social' /** TODO social */
                ]
            }
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
                }),
            },
            {
                name: 'Retrieve Account Request',
                schema: JSON.stringify({
                    firstName: 'String',
                    lastName: 'String',
                    email: 'String'
                }),
            },
            {
                name: 'Admin Titles',
                schema: JSON.stringify({
                    name: 'String',
                    services: 'Array', /** array of services id */
                }),
            }
            
        ]
    }
}

module.exports = config