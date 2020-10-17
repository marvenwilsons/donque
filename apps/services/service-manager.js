const path = require('path')
const Templates = require(path.join(__dirname,'../../server/templates.js'))

module.exports = Templates.Service({
    name: 'Service Manager',
    initialData: function(sql,fetch) { // on initial load
        // perform get request here
        let nodes = []
        nodes.push(
            {
                pageName: 'Entities',
                admin_id:'test',
                lastModified: 'test 1',
                pageContent: 'none',
                version_id:'000DSFKJHB3J4G5',
                isUndermaintenance: true,
                subPages:[],
                pageId: '22F5E4T2WER',
                // $listifyNodeDesc: 'test'
            }
        )
        nodes.push(
            {
                pageName: 'Instances',
                admin_id:'test',
                lastModified: 'test 1',
                pageContent: 'none',
                version_id:'000DSFKJHB3J4G5',
                isUndermaintenance: true,
                subPages:[],
                pageId: '22F5E4T2WER',
                // $listifyNodeDesc: 'test'
            }
        )
        nodes.push(
            {
                pageName: 'Relationships',
                admin_id:'test',
                lastModified: 'test 1',
                pageContent: 'none',
                version_id:'000DSFKJHB3J4G5',
                isUndermaintenance: true,
                subPages:[],
                pageId: '22F5E4T2WER',
                // $listifyNodeDesc: 'test'
            }
        )
        return new Promise((resolve) => {
            resolve(nodes);
        })
    },
    views: function(data,client,utils,Templates) {
        /** Page list and sub pages */
        if(typeof data === 'object' && Object.keys(data).length == 2 && Object.keys(data)[0] == 'foo') {
            return {
                paneConfig: {
                    paneName: 'test',
                    paneWidth: '550px',
                    isClosable: true,
                    paneViews: ['slide','slide'],
                    defaultPaneView: 0,
                    paneData: data,
                },
                componentConfig: {
                    test: 'test'
                },
                paneOnLoad: function () {

                },
                onEvent(event,syspane,syspanemodal, dwin) {
                    return {
                        openNewPane() {
                            syspane.updatePaneData('my value', 'foo.value')
                        },
                        onDataChange() {
                            if(syspane.getPaneIndex() == 1) {
                                console.log('dataChange', event.context / 2)
                                syspane.updateParentPaneData(event.context)
                            } else if(syspane.getPaneIndex()  > 1 ) {
                                console.log('test')
                            }
                        }
                    }
                }
            }
        }

        if(Array.isArray(data)) {
            return {
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
                    paneName: 'Pages',
                    paneWidth: '450px',
                    isClosable: true,
                    paneViews: ['listify','slide'],
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
        } 
        /** Page Content when user clicks view page */
        if( !Array.isArray(data) && utils.hasSetOfKeys(['pageName','pageId'], data) ) {
            return {
                componentConfig: {
                    msg: 'hello world'
                },
                paneOnLoad: function () {
                    // console.log('> pageContent loaded ',data)
                },
                paneConfig: {
                    paneName: data.pageName,
                    paneWidth: '700px',
                    isClosable: true,
                    paneViews: ['pageContent'],
                    defaultPaneView: 0,
                    paneData: data.item ? data.item : data
                }
            }
        }  
    }
})