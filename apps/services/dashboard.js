const path = require('path')
const Templates = require(path.join(__dirname,'../../server/templates.js'))

module.exports = Templates.Service({
    name: 'Dashboard',
    data: ((arg) => {
        // perform an sql queriy here or a fetch
        // should return an array of objects select * from staff
        return []
    }), 
    fistPaneDefualtView: 'uniview', // vue component, uniview handles un-uniformed child objects, each object has its own view
    dataControllers: [],
    views: [
        {
            // if an object has this set of keys then find the component and
            // push a new pane, assign pass the object as a prop to the component
            objectKeys: ['pageName','pageOwner','pageContent'],
            component: '', // vue component
            onLoad(data) {
                // TODO: serialize onLoad
            }
        },
        {
            objectKeys: ['pageName','pageOwner','pageContent'],
            component: '', // vue component
            onLoad(task) {
                // TODO: serialize onLoad
            }
        }
    ],
    config: {
        dataSchema: {}, // define the exact sturcture of data property
        paneName: 'Dashboard and analytics',
        paneWidth: '500px',
        isClosable: true
    },
    onEmptyData: function(task,paneSettings) {
        console.log('testing', task)
    }
})