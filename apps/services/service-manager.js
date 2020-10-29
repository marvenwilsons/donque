const path = require('path')
const Templates = require(path.join(__dirname,'../../server/templates.js'))

module.exports = Templates.Service({
    name: 'Service Manager',
    initialData (sql,fetch) { // on initial load
        // perform get request here
        let nodes = [
            {
                name: 'Page Services',
                items: [
                    {
                        name: 'Page Pool',
                        itemIcon: 'mdi-poll',
                        additionalContent: [
                          {
                              type: 'text',
                              title: 'Description',
                              body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsum aspernatur modi aliquam, expedita in distinctio enim. Officiis, ullam amet. Quia quam totam commodi aspernatur, illo facere. Porro, excepturi enim?'
                          },
                          {
                              type: 'events',
                              title: 'Other Services',
                              body: [
                                  {
                                      title: 'Click and you will be directed to a dq service this is a verly long tile like super long',
                                      eventName: 'myEvent'
                                  },
                                  {
                                      title: 'Click and you will be directed to a dq service',
                                      eventName: 'myEvent'
                                  },
                                  {
                                      title: 'Click and you will be directed to a dq service this is a verly long tile like super long',
                                      eventName: 'myEvent'
                                  },
                                  {
                                      title: 'Click and you will be directed to a dq service',
                                      eventName: 'myEvent'
                                  }
                              ]
                          },
                          {
                              type: 'events',
                              title: 'Tutorials',
                              body: [
                                  {
                                      title: 'Click and you will be directed to a dq service this is a verly long tile like super long',
                                      eventName: 'myEvent'
                                  },
                                  {
                                      title: 'Click and you will be directed to a dq service',
                                      eventName: 'myEvent'
                                  },
                                  {
                                      title: 'Click and you will be directed to a dq service this is a verly long tile like super long',
                                      eventName: 'myEvent'
                                  },
                                  {
                                      title: 'Click and you will be directed to a dq service',
                                      eventName: 'myEvent'
                                  }
                              ]
                          },
                        ],
                        events: ['View', "Create", "Edit"],
                        warning: 'Pool option needs to be updated'
                    },
                    {
                        name: 'Page Layouts',
                        itemIcon: 'mdi-border-all',
                        additionalContent: undefined,
                        events: ['View My Layouts','Download Page Layouts']
                    },
                    {
                        name: 'Color Palletes',
                        itemIcon: 'mdi-grain',
                        additionalContent: undefined,
                        events: []
                    },
                ]
            },
        ]
        return new Promise((resolve) => {
            resolve(nodes);
        })
    },
    view: (data,client,utils,Templates) =>  ({
        arrayViews: [
            {
                componentConfig: {},
                paneConfig: {
                    paneName: 'Service Manager',
                    paneWidth: 'initial',
                    isClosable: true,
                    paneViews: ['simpleNavs'],
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
                onEvent(event,syspane,syspanemodal, dwin, axios) {
                    return {
                        navClick(methods) {
                            
                        }
                    }
                }
            }
        ]
    })
})