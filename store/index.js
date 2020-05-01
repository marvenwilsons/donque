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
        globalModalContent: undefined,
    /** ----- */
    /** Pane System */
        pane:[],
})
export const getters = {
    /** QUEUE GETTERS */
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
    /** ----- */

}
export const mutations = {
    /** QUEUE MUTATIONS */
        stateController(state,payload) {
            state[payload.key] = payload.value
        },
        paneController(state, {index,key,value}){
            state.pane[index][key] = value
        },
        insertQueueItem(state,{fn,param,resetIndex}) {
            state.queue[state.queuePointer].mode = null
            const m = state.queue[state.queuePointer].m // pulling all of available methods in helper.js
            state.queue[state.queuePointer].fn = m[`private.${fn}`] // method found and assign to queue item
            state.queue[state.queuePointer].param = param // function param found
            this.commit('executeQueue') // execute task
            if(typeof resetIndex == 'number') {
                state.queue[resetIndex] = null
                state.queue[resetIndex] = m['sysutil.cp'](state.queueStatic[resetIndex])
                state.queueOnLoop = resetIndex
            } else {
                state.queueOnLoop = null
            }
        },
        async executeQueue(state, payload) {
            // console.log('> executing queue items ***************')
            if(state.queue[state.queuePointer].mode == '--pending--') {
                // executing exec task to get extract the task object
                try {
                    const asyncOpt = await state.queue[state.queuePointer].param(state.queueCurrentTaskAnswer) // task list extracted
                    if(asyncOpt) { // if task object is now available, insert task object to queue                
                        if(asyncOpt.taskParam && asyncOpt.taskParam.resetBackTo != undefined) {
                            if(typeof asyncOpt.taskParam.resetBackTo == 'number') {
                                this.commit('insertQueueItem', { // insert the task item to the queue
                                    fn: asyncOpt.taskName,
                                    param: asyncOpt.taskParam,
                                    resetIndex: state.queuePointer
                                })
                            }                    
                        } else {
                            this.commit('insertQueueItem', { // insert the task item to the queue
                                fn: asyncOpt.taskName,
                                param: asyncOpt.taskParam
                            })
                        }
                    }
                } catch(errObject) {
                    if(errObject.taskName) {
                        this.commit('insertQueueItem', {
                            fn: errObject.taskName,
                            param: errObject.taskParam
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
        },
    /** ----- */
    /** PANE MUTATIONS */
        paneAdd(state,{payload}) {
            state.pane.push({
                ...payload
            })
        },
        paneDelete(state,{paneIndexOrigin}) {
            const numToBeRemoved = state.pane.length - 1
            // console.log('numToBeRemoved',numToBeRemoved)
            // console.log('paneIndexOrigin',paneIndexOrigin)
            state.pane.splice(paneIndexOrigin,numToBeRemoved)
        },
        paneClose(state,{paneIndexOrigin}) {
            state.pane.splice(paneIndexOrigin,1)
        },
        paneUpdateData(state,{paneIndex,paneData}) {
            state.pane[paneIndex].paneConfig.paneData = paneData
        },
        paneUpdateView(state,{paneIndex,viewIndex}) {
            state.pane[paneIndex].paneConfig.defaultPaneView = viewIndex
        },
        paneModalUpdate(state,{paneIndex,payload}) {
            if(payload === 'closeModal') {
                state.pane[paneIndex].paneConfig.modal.modalBody = undefined
                state.pane[paneIndex].paneConfig.modal.modalConfig = undefined
                state.pane[paneIndex].paneConfig.modal.modalErr = undefined
                state.pane[paneIndex].paneConfig.modal.modalInfo = undefined
                state.pane[paneIndex].paneConfig.modal.isClosable = false
                state.pane[paneIndex].paneConfig.modal.modalWidth = undefined
                state.pane[paneIndex].paneConfig.modal.componentConfig = undefined
            } else {
                state.pane[paneIndex].paneConfig.modal[payload.key] = payload.value
            }
        },
        paneModalOverwrite(state,{paneIndex,modalObject}) {
            state.pane[paneIndex].paneConfig.modal = modalObject
        },
        paneSwitchView(state,{paneIndex,paneView}) {
            state.pane[paneIndex].paneConfig.paneView = paneView
        },
        paneUpdate(state,{paneIndex,payload}) {
            state.pane.splice(paneIndex,1,payload)
        },
}

export const actions = {
    async nuxtServerInit ({commit,state},context) { 
        // console.log('> NuxtServerInit')
        const urlPath = context.route.path
        if(!state.app.systemRoutes.includes(urlPath) ) {
            // user choose public route
        } else if(urlPath === '/dqlogin') {
            // user wants to login
            // submit username and password get api key for session
        } else if(urlPath === '/dqadmin') {
            // get services
            const service = await this.$axios
            .get('/$dqappservices/service', {
                // TODO:
                params: {
                    username: 'marvenwilsons', // get from localstorage
                    apikey: 'test' // get from localstorage
                  }
            })
            .then(({data}) => {
                return data.response
            }).catch(err => {
                console.log('> err',err.message)
            })

            const unPackServices = ((s) => {
                return s.map(service => JSON.parse(service))
            })(service)

            // set menu items
            unPackServices.map(items => {
                commit('app/addAppService', items)
                commit('app/addMenu', items.name)
            })
            
            // assign default active menu
            if(!state.app['defualt-active']) {
                commit('app/stateController', {
                    key: 'defualt-active',
                    value: state.app['app-admin-sidebar-items'][0]
                })
            }
        }
        
    }
}