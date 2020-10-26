module.exports = () => ({
    // handle what happens when the pane is loaded
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
    // handle when the modal has data passed, 
    // modalData is the set of input data from the user
    onModalData: function(modalData,syspane,syspanemodal, dwin) {
        if(modalData == undefined) {
            syspanemodal.appendErrorMsg('Page Name Cannot be undefined')
        }
    },
    // your custom events
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
                    syspane.closeUnUsedPane()
                })
            },
            'edit page'() {
                syspane.render(event.context.subPages)
            },
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
            }
        }

    }
})