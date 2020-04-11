export default {
    'switch-menu'({currentActiveMenu,selectedMenu}) {
        if(currentActiveMenu != selectedMenu) {
            return [
                {
                    taskName: 'sidebar.switch-menu',
                    taskParam: {
                        currentActiveMenu,
                        selectedMenu
                    }
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