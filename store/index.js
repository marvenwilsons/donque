
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
        queueExecType: undefined,
        queuePendingTask: {
            taskName: undefined,
            taskAnswer: undefined
        },
        queuePointer: - 1,
    /** ----- */
    /** Gloabal Modal */
        globalModalState: false,
        globalModalContentType: undefined,
        globalModalContent: undefined
    /** ----- */
})
export const mutations = {
    stateController(state,payload) {
        console.log('> stateController changing --', payload.key)
        state[payload.key] = payload.value
    },
    executeQueue(state, payload) {
        state.queuePointer = state.queuePointer + 1
        console.log('> executing queue')
        //
        const {fn, param} = state.queue[state.queuePointer]
        fn(param)
    }
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