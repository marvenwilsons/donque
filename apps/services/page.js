const path = require('path')
const Templates = require(path.join(__dirname,'../../server/templates.js'))

module.exports = Templates.Service({
    name: 'Pages',
    data: function(sql,fetch) {
        // perform get request here
        return [
            // TODO: should not use normal object, use Templates new page instead for extra validation
            {
                pageName: 'Home',
                pageDetails: {}
            },
            {
                pageName: 'About',
                pageDetails: {}
            },
            {
                pageName: 'Teams',
                pageDetails: {}
            },
            {
                pageName: 'Products',
                pageDetails: {}
            },
            {
                pageName: 'Blog',
                pageDetails: {}
            },
            {
                pageName: 'Achivements',
                pageDetails: {}
            },
            {
                pageName: 'Home',
                pageDetails: {}
            },
            {
                pageName: 'About',
                pageDetails: {}
            },
            {
                pageName: 'Teams',
                pageDetails: {}
            },
            {
                pageName: 'Products',
                pageDetails: {}
            },
            {
                pageName: 'Blog',
                pageDetails: {}
            },
            {
                pageName: 'Achivements',
                pageDetails: {}
            },
            {
                pageName: 'Blog',
                pageDetails: {}
            },
            {
                pageName: 'Achivements',
                pageDetails: {}
            },
            {
                pageName: 'Home',
                pageDetails: {}
            },
            {
                pageName: 'About',
                pageDetails: {}
            },
            {
                pageName: 'Teams',
                pageDetails: {}
            },
            {
                pageName: 'Products',
                pageDetails: {}
            },
            {
                pageName: 'Blog',
                pageDetails: {}
            },
            {
                pageName: 'Achivements',
                pageDetails: {}
            },
        ]
    },
    views: function(data,task,paneSettings,paneModal,utils) {
        if(Array.isArray(data)) {
            return {
                component: 'listify',
                componentConfig: {
                    dataControllers: [
                        {
                            name: 'open page',
                            handler: function(helper) {
                                console.log('hello world')
                                console.log(helper)
                            }
                        },
                        {
                            name: 'sub page',
                            handler: function(helper) {
                
                            }
                        },
                        {
                            name: 'delete page',
                            handler: function(helper) {
                
                            }
                        },
                    ],
                    displayProp: 'pageName'
                },
                paneOnLoad: function() {
                    console.log('testing! on load', data)
                }
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