const path = require('path')
const Templates = require(path.join(__dirname,'../../server/templates.js'))

module.exports = Templates.Service({
    name: 'Service Manager',
    initialData (sql,fetch) { // on initial load
        // perform get request here
        let nodes = []
        return new Promise((resolve) => {
            resolve(nodes);
        })
    },
    view: (data,client,utils,Templates) =>  ({
        arrayViews: [
            {
                componentConfig: {
                    uniview: {
                        flexDirection: 'col',
                        itemMargin: '20px'
                    },
                    events: ['open'],
                    displayProp: 'pageName',
                    ableToAddItem: false,
                    infoDisplay: ['pageName'],
                    hideControlls: true
                },
                paneConfig: {
                    paneName: 'Service Manager',
                    paneWidth: '100%',
                    isClosable: true,
                    paneViews: ['serviceMaker','slide'],
                    defaultPaneView: 0,
                    paneData: data,
                },
                paneOnLoad: function(syspane,syspanemodal, dwin) {
                    if(data.length == 0) {
                        syspane.prompt({
                            type: 'string',
                            header: 'Page Name',
                            info: 'There are no page(s) to display, Create a new page to get started.',
                            isClosable: false,
                        }, (input) => {
                            console.log('input -> ',input)
                        })
                    }
                },
                onModalData: function(modalData,syspane,syspanemodal, dwin) {
                    // modalData is the set of input data from the user
                    if(modalData == undefined) {
                        syspanemodal.appendErrorMsg('Page Name Cannot be undefined')
                    }
                },
                onEvent(event,syspane,syspanemodal, dwin) {
                    return {
                        addNewPage() {
                            syspane.prompt({
                                type: 'string',
                                header: 'Page Name',
                                isClosable: true,
                            }, (input) => {
                                console.log('input -> ',input)
                            })
                        },
                        'view page'() {
                            syspane.render(event.context)
                        },
                        'sub page'() {
                            syspane.render(event.context.subPages)
                        },
                        'delete page'() { 
                            syspanemodal.logError(`Warning! Are you sure you want to delete ${event.context.pageName}`,() => {
                                syspanemodal.close()
                                syspane.closeUnUsedPane(s)
                            })
                        },
                        // 'edit page'() {
                        //     syspane.render(event.context.subPages)
                        // },
                        rename() {
                            syspane.prompt({
                                type: 'password',
                                value: null,
                                header: 'Enter Password',
                                defaultValue: null,
                                info: 'Enter password',
                                isClosable: true
                            }, (data) => {
                                console.log(data)
                            })
                        },
                        openNewPane() {
                            console.log('open new pane zero pane',event.context)
                            syspane.render(event.context)
                        },
                        onDataChange() {
                            syspane.updateChildPaneData(event.context)
                        }
                    }

                }
            }
        ]
    })
})