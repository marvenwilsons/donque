
export const state = () => ({
    adminName: '',
    siteName: '',
    adminPermSet: undefined,
    systemRoutes: [
        '/dqlogin',
        '/dqadmin',
        '/dqinit',
    ],
    /** queue */
        queue: [],
        queuePendingTask: {
            taskName: undefined,
            taskAnswer: undefined
        },
    /** ----- */
    /** Gloabal Modal */
        globalModalState: false,
        globalModalContentType: undefined,
        globalModalDynamicContent: undefined
    /** ----- */
})

export const mutations = {
    
}

export const actions = {
    nuxtServerInit (store,context) { 
        console.log('> NuxtServerInit')
        const urlPath = context.route.path
        if(!store.state.systemRoutes.includes(urlPath) ) {
            // user choose public route
        } else if(urlPath === '/dqlogin') {
            // user wants to login
            // submit username and password get api key for session
        } else if(urlPath === '/dqadmin') {
            // user wants to manage admin methods
            // submit username, and API key
        }
        
    }
}