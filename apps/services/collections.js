const path = require('path')
const Templates = require(path.join(__dirname,'../../server/templates.js'))

module.exports = Templates.Service({
    name: 'Collections',
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
    view: (data,client,utils,Templates) => ({
        arrayViews: [
            // Array view one
            {
                additionalRenderCondition: null,
                paneConfig: {
                    paneName: 'Pages',
                    paneWidth: '450px',
                    isClosable: true,
                    paneViews: ['listify','slide'],
                    defaultPaneView: 0,
                    paneData: data,
                },
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
                paneOnLoad(syspane,syspanemodal, dwin) {
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
                onModalData(syspane,syspanemodal, dwin) {
                    // modalData is the set of input data from the user
                    if(modalData == undefined) {
                        syspanemodal.appendErrorMsg('Page Name Cannot be undefined')
                    }
                },
                onEvent(syspane,syspanemodal, dwin) {
                    
                }
            },
            {
                additionalRenderCondition: data.length === 3,
                paneConfig: {
                    paneName: 'Collections',
                    paneWidth: '450px',
                    isClosable: true,
                    paneViews: ['listify','slide'],
                    defaultPaneView: 0,
                    paneData: data,
                },
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
                paneOnLoad(syspane,syspanemodal, dwin) {
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
                onModalData(syspane,syspanemodal, dwin) {
                    // modalData is the set of input data from the user
                    if(modalData == undefined) {
                        syspanemodal.appendErrorMsg('Page Name Cannot be undefined')
                    }
                },
                onEvent(syspane,syspanemodal, dwin) {
                    return {
                        open() {
                            console.log('opening')
                        }
                    }
                }
            }
        ],
        objectViews: [
            {
                additionalRenderCondition: '',
                paneConfig: {
                    
                },
                componentConfig: {
    
                },
                paneOnLoad(syspane,syspanemodal, dwin) {
    
                },
                onModalData(syspane,syspanemodal, dwin) {
    
                },
                onEvent(syspane,syspanemodal, dwin) {
                    return {
                        myCustomEventName() {
    
                        }
                    }
                }
            }
        ] 
    })
})