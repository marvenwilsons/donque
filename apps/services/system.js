const path = require('path')
const Templates = require(path.join(__dirname,'../../server/templates.js'))

module.exports = Templates.Service({
    name: 'System',
    data: function(sql,fetch) {
        // perform get request here
        return [
            {
                name: 'services'
            }
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
                            name: 'remove page',
                            handler: function(helper) {
                
                            }
                        },
                    ]
                },
                paneOnLoad: function() {
                }
            }
        }
    },
    config: {
        dataSchema: {}, // define the exact sturcture of data property
        paneName: 'System',
        paneWidth: '600px',
        isClosable: true
    },

})