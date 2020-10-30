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
                        warning: null
                    },
                    {
                        name: 'Page Layouts',
                        itemIcon: 'mdi-border-all',
                        additionalContent: undefined,
                        events: ['View My Layouts','Explore More Layouts'],
                        additionalContent: [
                            {
                                type: 'text',
                                title: 'Description',
                                body: 'Page layout is the part of graphic design that deals in the arrangement of visual elements on a page. It generally involves organizational principles of composition to achieve specific communication objectives.'
                            },
                            {
                                type: 'events',
                                title: 'Helpful Materials',
                                body: [
                                    {
                                        title: 'Helpful blog about page layouts',
                                        eventName: 'myEvent'
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        name: 'Color Palletes',
                        itemIcon: 'mdi-grain',
                        additionalContent: undefined,
                        events: ['View My Color Schemes', 'Add New Collection'],
                        additionalContent: [
                            {
                                type: 'text',
                                title: 'Description',
                                body: 'A collection of color scheme, each scheme can have multiple colors, you can change colors from a color scheme, add and remove colors from color scheme or remove color scheme completely'
                            },
                            {
                                type: 'events',
                                title: 'Helpful Materials',
                                body: [
                                    {
                                        title: 'Learn how to choose color wisely',
                                        eventName: 'myEvent'
                                    },
                                    {
                                        title: 'Learn about color relationship and the theory behind',
                                        eventName: 'myEvent'
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        name: 'Design Tools & Resources',
                        itemIcon: 'mdi-grain',
                        additionalContent: undefined,
                        events: [],
                        additionalContent: [
                            {
                                type: 'text',
                                title: 'Description',
                                body: 'A collection of helpful materials that can help you in your journey on designing your website, from materials about icons, logo, color theory and more.'
                            },
                        ]
                    },
                ]
            },
            {
                name: 'System Settings',
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
            }
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
                            
                        },
                        onWarningClick(methods) {
                            console.log('onWarningClick', event)
                            methods.removeWarning('Page Pool')
                        },
                        onServiceClick(methods) {
                            console.log('service handler', event)
                        },
                        onEventClick(methods) {
                            // get the name of the event
                            console.log('onEventClick', event)
                            methods.loading(event.context.itemName)
                            setTimeout(() => {
                                syspane.loading((progress,header,close) => {
                                    header('Fetching package')
                                    progress('starting ...')
                                    setTimeout(() => {
                                        progress('Authenticating ...',3)
                                        setTimeout(() => {
                                            progress('Checking permission ...')
                                            setTimeout(() => {
                                                header('Retrieving Resources ...')
                                                setTimeout(() => {
                                                    progress('end', close)
                                                    methods.loading(false)
                                                }, 1000);
                                            }, 500);
                                        }, 2000);
                                    }, 1000)
                                })
                            }, 1000);
                        }
                    }
                }
            }
        ]
    })
})