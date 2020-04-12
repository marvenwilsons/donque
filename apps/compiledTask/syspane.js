export default {
    'switch-menu'({currentActiveMenu,selectedMenu}) {
        /**
         * 1. reach out to local storage if there is a data saved in there
         *    if there is data alocated for selectedMenu there is no need to reach out to server
         *    a. if there is data alocated use that data
         *    b. if there is no data reach out server
         */
        if(currentActiveMenu != selectedMenu) {
            // this operation should be bloocking, because what if the user switches menus repeatedly
            // it can be costly if you have to reach server repeatedly      
            return [
                {
                    taskName: 'sysmodal.loading',
                    taskParam: {
                        msg: `Fetching ${selectedMenu} resoruces, please wait a moment`
                    }
                },
                {
                    taskName: 'syspane.get-pane-data',
                    taskParam: {
                        payload: {
                            section: selectedMenu
                        }
                    }
                },
                {
                    taskName: 'exec',
                    taskParam: function(data) {
                        console.log('this is data', data)

                        return new Promise((resolve,reject) => {
                            resolve({
                                taskName: 'sysmodal.loginfo',
                                taskParam: {
                                    msg: 'everything okay!'
                                }
                            })
                        })
                    }
                },
                // side bar mutation
                {
                    taskName: 'sidebar.switch-menu',
                    taskParam: {
                        currentActiveMenu,
                        selectedMenu
                    }
                },
                // get server data
                
                {
                    taskName: 'syspane.add',
                    taskParam: {
                        payload: {
                            paneView: selectedMenu
                        }
                    }
                },
                {
                    taskName: 'sysmodal.close-modal',
                    taskParam: {}
                },
                {
                    taskName: 'done',
                    taskParam: {}
                }
            ]
        } else {
            return [
                {
                    taskName: 'done',
                    taskParam: {}
                }
            ]
        }        
    }
}