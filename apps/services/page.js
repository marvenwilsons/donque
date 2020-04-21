const path = require('path')
const Templates = require(path.join(__dirname,'../../server/templates.js'))

module.exports = Templates.Service({
    name: 'Pages',
    data: ((arg) => {
        // perform an sql queriy here or a fetch
        // should return an array of objects select * from staff
        return []
    }), 
    fistPaneDefualtView: 'listify', // vue component
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
    ],
    views: [
        {
            // if an object has this set of keys then find the component and
            // push a new pane, assign pass the object as a prop to the component
            objectKeys: ['pageName','pageOwner','pageContent'],
            component: '', // vue component
            onLoad(data) {
                // TODO: serialize onLoad
            }
        }
    ],
    config: {
        dataSchema: {}, // define the exact sturcture of data property
        paneName: 'Pages pane!!',
        paneWidth: '500px',
        isClosable: true
    },
    onEmptyData: function(task,paneSettings) {
        console.log('testing', task)
    }
})