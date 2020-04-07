
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
        queueStatic: null,
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
    insertQueueItem(state,{fn,param,resetBackObject}) {
        state.queue[state.queuePointer].mode = null
        const m = state.queue[state.queuePointer].m() // pulling all of available methods in helper.js
        state.queue[state.queuePointer].fn = m[`DO_NOT_EXECUTE_OUTSIDE_HELPER_$${fn}`] // method found and assign to queue item
        state.queue[state.queuePointer].param = param // function param found
        // // handling resetTask object
        
        this.commit('executeQueue') // execute task
        if(resetBackObject) {
            console.log('reset back object', resetBackObject)
            state.queueResetObject = true
            
        }
    },
    async executeQueue(state, payload) {
        console.log('> executing queue items ***************')

        if(state.queue[state.queuePointer].mode == '--pending--') {
            console.log('handling pending task')
            // executing exec task to get extract the task object
            const asyncOpt = await state.queue[state.queuePointer].param(state.queueCurrentTaskAnswer) // task list extracted
            console.log('asyncOpt', asyncOpt)
            if(asyncOpt) { // if task object is now available, insert task object to queue                
                if(typeof asyncOpt.taskParam.resetBackTo == 'number') {
                    
                    this.commit('insertQueueItem', { // insert the task item to the queue
                        fn: asyncOpt.taskName,
                        param: asyncOpt.taskParam,
                        resetBackObject: state.queue[state.queuePointer]
                    })
                } else {
                    this.commit('insertQueueItem', { // insert the task item to the queue
                        fn: asyncOpt.taskName,
                        param: asyncOpt.taskParam
                    })
                }
            } 
        } else {
            // this is where normal void task gets handled, normaly sync task
            const {fn, param} = state.queue[state.queuePointer] 
            if(fn) {
                fn(param)
            }
        }

    },
    updateQueueAnswers(state,payload) {
        state.queueAnswersArray[payload.index].answer = payload.answer
        if(state.queueResetObject){
            console.log(state.queue)
        }
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