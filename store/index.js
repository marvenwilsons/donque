
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
        queuePointer: null,
        queueAnswersArray: null,
        queueState: null,
    /** ----- */
    /** Gloabal Modal */
        globalModalState: false,
        globalModalContentType: undefined,
        globalModalContent: undefined
    /** ----- */
})
export const getters = {
    queueAnswersArray(state) {
        return {
            latestArrayState: state.queueAnswersArray,
            latestPointer: state.queuePointer
        }

    },
    queueArray(state) {
        return {
            queue: state.queue,
            queueLength: state.queue.length
        }
    },
    queuePointer(state) {
        return state.queuePointer
    },
    queueState(state) {
        return state.queueState
    }

}
export const mutations = {
    stateController(state,payload) {
        state[payload.key] = payload.value
    },
    queueAnswersArrayController(state,{index,answer}) {
        state.queueAnswersArray[index].answer = answer
    },
    executeQueue(state, payload) {
        console.log('> executing queue items')
        console.log(state.queueState)

        try {
            const {fn, param} = state.queue[state.queuePointer]
            if(fn) {
                fn(param)
            }
        }catch(err) {
            console.log('executeQueue err', state.queuePointer)
            return
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