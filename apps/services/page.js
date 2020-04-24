const path = require('path')
const Templates = require(path.join(__dirname,'../../server/templates.js'))

module.exports = Templates.Service({
    name: 'Pages',
    data: function(sql,fetch) {
        // perform get request here
        return [
            // TODO: should not use normal object, use Templates new page instead for extra validation
            {
                pageName: '/',
                lastUpdated: null,
                updatedBy: null
            },
            {
                pageName: '/about',
                lastUpdated: 'Dec 7 20',
                updatedBy: 'owner'
            },
            {
                pageName: '/teams',
                lastUpdated: 'Oct 4 20',
                updatedBy: 'owner'
            },
            {
                pageName: '/products',
                lastUpdated: null,
                updatedBy: null
            },
            {
                pageName: '/blog',
                lastUpdated: null,
                updatedBy: null
            },
            {
                pageName: '/achivements',
                lastUpdated: null,
                updatedBy: null
            },
            {
                pageName: '/my-service-canada-account',
                lastUpdated: null,
                updatedBy: null
            }
        ]
    },
    views: function(data,helper,utils,templates) {
        
        if(Array.isArray(data) || typeof data === 'object' && data.controllerName === 'sub page') {
            return {
                component: 'listify',
                componentConfig: {
                    dataControllers: [
                        {
                            name: 'open page',
                            handler: function(item) {
                                const componentName = helper.paneGetView(item)
                                helper.paneAdd(componentName)
                            }
                        },
                        {
                            name: 'sub page',
                            handler: function() {
                                console.log('sub page')
                                console.log(data)
                            }
                        },
                        {
                            name: 'delete page',
                            handler: function(helper) {
                
                            }
                        },
                        {
                            name: 'rename page',
                            handler: function(helper) {
                                
                            }
                        }
                    ],
                    displayProp: 'pageName',
                    ableToAddItem: true,
                    infoDisplay: ['pageName','lastUpdated','updatedBy']

                },
                paneOnLoad: function() {
                    // console.log('testing! on load', data)
                }
            }
        } else if(typeof data === 'object' && !Array.isArray(data) && data.controllerName === 'open page' ) {
            // && utils.hasSetOfKeys(['pageName','lastUpdated','updatedBy'],)
            // console.log('this is the view you are looking for', data)
            return {
                component: 'pageContent',
                payload: data.item,
                componentConfig: {},
                paneOnLoad: function () {}
            }
        }
    },
    config: {
        dataSchema: {}, // define the exact sturcture of data property
        paneName: 'Pages',
        paneWidth: '550px',
        isClosable: true
    },

})