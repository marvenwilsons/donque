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
                lastUpdated: null,
                updatedBy: null
            },
            {
                pageName: 'About',
                lastUpdated: null,
                updatedBy: null
            },
            {
                pageName: 'Teams',
                lastUpdated: null,
                updatedBy: null
            },
            {
                pageName: 'Products',
                lastUpdated: null,
                updatedBy: null
            },
            {
                pageName: 'Blog',
                lastUpdated: null,
                updatedBy: null
            },
            {
                pageName: 'Achivements',
                lastUpdated: null,
                updatedBy: null
            }
        ]
    },
    views: function(data,task,paneSettings,paneModal,utils,templates) {
        if(Array.isArray(data)) {
            return {
                component: 'listify',
                componentConfig: {
                    dataControllers: [
                        {
                            name: 'open page',
                            handler: function(item) {
                                // add new pane
                                task.runCompiledTask([
                                    new templates.taskItem('')
                                ])
                            }
                        },
                        {
                            name: 'sub page',
                            handler: function(helper) {
                                task.runCompiledTask([

                                ])
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