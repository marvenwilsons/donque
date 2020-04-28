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
                new Templates.TaskItem('syspane.get-initial-data', {
                    serviceName: selectedMenu
                }),
                new Templates.TaskItem('exec', function({payload}) {
                    return new Promise((resolve,reject) => {
                        resolve(new Templates.TaskItem('insertCompiledTask',{
                            compiledTask: [
                                new Templates.TaskItem('sidebar.switch-menu', {currentActiveMenu, selectedMenu, payload}),
                                new Templates.TaskItem('sysmodal.close-modal', {}),
                                new Templates.TaskItem('done',{})
                            ]
                        }))
                    })
                }) 
            ]
        } else {
            return [
                new Templates.TaskItem('done',{})
            ]
        }        
    },
    'add-pane'({data}) {
        return [
            new Templates.TaskItem('syspane.add', {
                payload: data
            }),
            new Templates.TaskItem('sysmodal.close-modal', {}),
            new Templates.TaskItem('done', {})
        ]
    },
    'close-pane'(payload){
        return [
            /**TODO: implement prompt user for unsave changes before closing the pane */
            // new Templates.TaskItem('sysmodal.loginfo', {
            //     msg: 'are you sure you want to close this pane? all unsave changes will be lost permanently.'
            // }),
            // new Templates.TaskItem('sysmodal.close-modal', {}),
            new Templates.TaskItem('syspane.delete', {
                paneIndexOrigin: payload.origin
            }),
            new Templates.TaskItem('done', {})
        ]
    }
}