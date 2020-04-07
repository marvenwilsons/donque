
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
    insertQueueItem(state,{fn,param}) {
        // state.queueState = 'pause'
        state.queue[state.queuePointer].mode = null
        const m = state.queue[state.queuePointer].m()
        state.queue[state.queuePointer].fn = m[`DO_NOT_EXECUTE_OUTSIDE_HELPER_$${fn}`]
        state.queue[state.queuePointer].param = param
        this.commit('executeQueue')
    },
    async executeQueue(state, payload) {
        console.log('> executing queue items ***************')

        if(state.queue[state.queuePointer].mode == '--pending--') {
            console.log('handling exec')
            const asyncOpt = await state.queue[state.queuePointer].param(state.queueCurrentTaskAnswer)
            if(asyncOpt) {
                this.commit('insertQueueItem', {
                    fn: asyncOpt.taskName,
                    param: asyncOpt.taskParam
                })
            }
        } else {
            const {fn, param} = state.queue[state.queuePointer]
            if(fn) {
                fn(param)
            }
        }

    },
    updateQueueAnswers(state,payload) {
        state.queueAnswersArray[payload.index].answer = payload.answer
        // if(payload.pointer) {
        //     state.queuePointer = payload.pointer
        // }
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