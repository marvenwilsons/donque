
export const state = () => ({
    /** queue */
        queue: [],
        queueExecType: undefined,
        queueCurrentTaskAnswer: null,
        queuePointer: null,
        queueAnswersArray: null,
        queueState: null,
        queueStatic: null,
        queueOnLoop: null,
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
    insertQueueItem(state,{fn,param,resetIndex}) {
        state.queue[state.queuePointer].mode = null
        const m = state.queue[state.queuePointer].m() // pulling all of available methods in helper.js
        state.queue[state.queuePointer].fn = m[`DO_NOT_EXECUTE_OUTSIDE_HELPER_$${fn}`] // method found and assign to queue item
        state.queue[state.queuePointer].param = param // function param found
        this.commit('executeQueue') // execute task
        if(typeof resetIndex == 'number') {
            state.queue[resetIndex] = null
            state.queue[resetIndex] = m.cp(state.queueStatic[resetIndex])
            state.queueOnLoop = resetIndex
        } else {
            state.queueOnLoop = null
        }
    },
    async executeQueue(state, payload) {
        console.log('> executing queue items ***************')
        if(state.queue[state.queuePointer].mode == '--pending--') {
            // executing exec task to get extract the task object
            const asyncOpt = await state.queue[state.queuePointer].param(state.queueCurrentTaskAnswer) // task list extracted
            if(asyncOpt) { // if task object is now available, insert task object to queue                
                if(typeof asyncOpt.taskParam.resetBackTo == 'number') {
                    this.commit('insertQueueItem', { // insert the task item to the queue
                        fn: asyncOpt.taskName,
                        param: asyncOpt.taskParam,
                        resetIndex: state.queuePointer
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
        if(typeof state.queueOnLoop === 'number'){
            if(state.queueAnswersArray[payload.index].answer == payload.answer) {
                state.queueAnswersArray[payload.index].answer = null
                state.queueAnswersArray[payload.index].answer = payload.answer
            }
        } else {
            state.queueAnswersArray[payload.index].answer = payload.answer
        }
    }
}

export const actions = {
    nuxtServerInit (store,context) { 
        console.log('> NuxtServerInit')
        const urlPath = context.route.path
        if(!store.state.app.systemRoutes.includes(urlPath) ) {
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