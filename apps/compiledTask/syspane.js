import Templates from '@/templates'

export default {
    'switch-menu'({currentActiveMenu,selectedMenu}) {
        /**
         *  TODO:
         * 1. reach out to local storage if there is a data saved in there
         *    if there is data alocated for selectedMenu there is no need to reach out to server
         *    a. if there is data alocated use that data
         *    b. if there is no data reach out server
         */
        if(currentActiveMenu != selectedMenu) {
            // this operation should be bloocking, because what if the user switches menus repeatedly
            // it can be costly if you have to reach server repeatedly      
            return [
                new Templates.TaskItem('sysmodal.loading', {
                    msg: `validating and fetching ${selectedMenu} request`
                }),
                new Templates.TaskItem('syspane.get-pane-data', {
                    payload: {
                        section: selectedMenu
                    }
                }),
                new Templates.TaskItem('exec', function({statusCode, status, payload}) {
                    if(statusCode === 200) {
                        return new Promise((resolve,reject) => {
                            resolve(new Templates.TaskItem('insertCompiledTask',{
                                compiledTask: [
                                    new Templates.TaskItem('sidebar.switch-menu', {currentActiveMenu, selectedMenu}),
                                    new Templates.TaskItem('syspane.add',{
                                        payload: {
                                            paneView: selectedMenu,
                                            ...payload
                                        }
                                    }),
                                    new Templates.TaskItem('syspane.update-data', {paneIndex: 0, paneData: payload}),
                                    new Templates.TaskItem('sysmodal.close-modal', {}),
                                    new Templates.TaskItem('done',{})
                                ]
                            }))
                        })
                    }
                }) 
            ]
        } else {
            return [
                new Templates.TaskItem('done',{})
            ]
        }        
    },
    'add-pane'({keys,paneIndex}) {

    }
}