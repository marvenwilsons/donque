
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
        queueCurrentTaskAnswer: null,
        queuePointer: -1,
        queueAnswersArray: undefined,
    /** ----- */
    /** Gloabal Modal */
        globalModalState: false,
        globalModalContentType: undefined,
        globalModalContent: undefined
    /** ----- */
})
export const getters = {
    queueAnswersArray(state) {
        return state.queueAnswersArray
    }
}
export const mutations = {
    stateController(state,payload) {
        console.log('> stateController changing --', payload.key)
        state[payload.key] = payload.value
    },
    executeQueue(state, payload) {
        console.log('> executing queue items')
        //
        if(payload && payload.asnwerPending == true) {
            if(payload.answer != 'void') {
                console.log('> updating current asnwer pending')
                state.queueCurrentTaskAnswer = payload.answer
            }
        } else {
            state.queuePointer = state.queuePointer + 1
            //
            console.log(`> executing task index number (${state.queuePointer}) in queue`)
            const {fn, param} = state.queue[state.queuePointer]
            //   
            if(fn) {
                fn(param)
            }
        }
    },
    updateQueueAnswers(state,payload) {
        state.queueAnswersArray[payload.index].answer = payload.answer
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