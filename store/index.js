
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
        queuePointer: 0,
        queueAnswersArray: [],
    /** ----- */
    /** Gloabal Modal */
        globalModalState: false,
        globalModalContentType: undefined,
        globalModalContent: undefined
    /** ----- */
})
export const getters = {
    queuePointer(state) {
        console.log('hey')
        return state.queuePointer
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
            console.log('asnwer pending ..')
            state.queueCurrentTaskAnswer = payload.answer
        } else {
            this.commit('startQueueProcessing')
            state.queuePointer = state.queuePointer + 1

            if(state.queueExecType === 'sync') {
                console.log('> executing type1')
                try{
                    /**
                     * type 1
                     */
                    const {fn, param} = state.queue[state.queuePointer]
                    fn(param)
                    if(state.queuePointer != state.queue.length) {
                        this.commit('executeQueue')
                    }
                }catch(err) {
                    /**
                     * type 2
                     */
                    if(err.message == `Cannot read property 'fn' of undefined`) {
                        console.log('> executing type2')
                        console.log(state.queue[state.queuePointer])
                    }
                }
            } else {
    
            }
        }
    },
    startQueueProcessing() {
        /**
         * ask the question is queueAnswersArray index (n) already answered?
         * if yes --> is (n) === to the length of queue 
         * if no --> call executeQueue
         * if yes --> stop interval
         */
        
        // setInterval(() => {
        //     console.log('test')
        // },1000)
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