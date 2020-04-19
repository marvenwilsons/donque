const path = require('path')
const Templates = require(path.join(__dirname,'../../server/templates.js'))

module.exports = Templates.Service({
    name: 'Pages',
    data: [{},{},{}], // from server, represents individual pages
    fistPaneDefualtView: 'listify', // vue component
    dataController: {
        name: 'view page',
        handler: function() {
            // execute compiled task or task here
        },
        name: 'delete page',
        handler: function() {
            // execute compiled task or task here
        }
    },
    views: [
        {
            // if an object has this set of keys then find the component and
            // push a new pane, assign pass the object as a prop to the component
            objectKeys: ['pageName','pageOwner','pageContent'],
            component: '', // vue component
            onLoad(data) {
                
            }
        }
    ],
    config: {
        dataSchema: {}, // define the exact sturcture of data property
        paneName: 'Pages pane!!',
        paneWidth: '500px',
        isClosable: true
    },
    onEmptyData() {
        console.log('test')
    }
})