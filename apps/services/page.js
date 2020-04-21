const path = require('path')
const Templates = require(path.join(__dirname,'../../server/templates.js'))

module.exports = Templates.Service({
    name: 'Pages',
    data: function(sql,fetch) {
        // perform get request here
        return [
            ['foo',{}],
            {
                name: 'jane',
                fam: 'doe'
            },
            'hello world',
            123456
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
                    console.log('testing! on load', data)
                }
            }
        }
    },
    config: {
        dataSchema: {}, // define the exact sturcture of data property
        paneName: 'Pages pane!!',
        paneWidth: '500px',
        isClosable: true
    },

})