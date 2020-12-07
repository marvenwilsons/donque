const path = require('path')
const Templates = require(path.join(__dirname,'../../server/helper/templates.js'))

module.exports = Templates.Service({
    name: '',
    data: [],
    fistPaneDefualtView: 'listify', // vue component
    dataController: {
        name: 'name',
        handler: function() {
            // execute compiled task or task here
        },
    },
    views: [
        {
            objectKeys: [''],
            component: '', // vue component
            onLoad(data) {
                
            }
        }
    ],
    config: {
        dataSchema: {}, // define the exact sturcture of data property
    },
    onEmptyData() {

    }
})