import templates from './templates'
import procedures from './procedures'
import controlpanel from '@/apps/controlpanel/controlpanel'
import utils from './utils'

export default {
    data: () => ({
        h: undefined,
        componentConfig: null,
        controls: undefined,
        actions: undefined
    }),
    mounted() {
        this.$p = this.h
        this.controls = controlpanel(this)
        this.actions = this.controls.actions
    },
    methods: {
        /** sys utils */
        systemError(msg) {
            this.actions.sysmodal.logError(msg)
        },
        m() {
            return this
        },
        cp: utils.copy,
        pipe: utils.pipe,
        validateString:utils.validateString,
        answerPending(answer,pointer) {
            // console.log('> Answering pending question')
            if(answer && answer != '--void--') {
                this.h.$store.commit('stateController', {
                    key: 'queueCurrentTaskAnswer',
                    value: answer
                })

            }

            this.h.$store.commit('updateQueueAnswers', {
                index: this.h.$store.state.queuePointer,
                answer: '--done--',
                pointer
            })
        },
        runCompiledTask(taskArray) {
            /********************************************************************
             * push procedures to queue together with its function dependecies
             * the first item in taskArray is the item that needs to be completed
             * the sencond item to the last are the functions that executes for the
             * purpose of completing the first item in the taskArray.
             * ****************************************************************** 
             */
            let x = []
            let queueAnswersArray = []
            taskArray.map((e,i) => {
                queueAnswersArray.push({
                    answer: '--not answered--'
                })
                if(e) {
                    /*** type 1 is an object that tells what function to execute */
                    // const taskBeingCalled = e.taskName == 'exec' ? true : this[`private.${e.taskName}`]
                    const taskBeingCalled = e.taskName == 'exec' ? true : procedures(this,e.taskName)
                    if(taskBeingCalled == undefined) {
                        new templates.DonqueDevError(`ERR: "${e.taskName}" function or task does not exist`)
                    } else {
                        if(e.taskParam == undefined || e.taskParam == null) {
                            new templates.DonqueDevError(`ERR: "taskParam" property cannot be undefined of null at index: ${i} task name: ${e.taskName}`)
                        } else {
                            if(e.taskName == 'exec') {
                                x.push(new templates.ExecQueueItem({
                                    fn: taskBeingCalled,
                                    param: e.taskParam,
                                    m: this.m
                                }))
                            } else {
                                x.push(new templates.NormalQueueItem({
                                    fn: taskBeingCalled,
                                    param: e.taskParam
                                }))
                            }                     
                        }
                    }
                }
            })
            this.h.$store.commit('stateController', {
                key: 'queue',
                value: x
            })
            const staticCopy = this.cp(x)
            this.h.$store.commit('stateController', {
                key: 'queueStatic',
                value: Object.freeze(staticCopy)
            })
            this.h.$store.commit('stateController', {
                key: 'queueAnswersArray',
                value: queueAnswersArray
            })
        },
        covertToPaneView(n){
            n = n.toLowerCase()
            n = `p-${n}`
            return n
        },
        paneSettings({paneName,paneWidth,isClosable}) {
            if(paneName) {
                this.$store.commit('paneController',{
                    index: this.paneIndex,
                    key: 'paneName',
                    value: paneName
                })
            } 
            
            if(paneWidth) {
                this.$store.commit('paneController',{
                    index: this.paneIndex,
                    key: 'paneWidth',
                    value: paneWidth
                })
            }
            
            if(isClosable) {
                this.$store.commit('paneController',{
                    index: this.paneIndex,
                    key: 'isClosable',
                    value: isClosable
                })
            }
        },
        normyDep(paneIndex,scope) {
            return ((s) => {
                const modalMethods = {
                    closePaneModal: () =>  s.closePaneModal(paneIndex),
                    appendErrorMsg: msg => s.appendErrorMsg(paneIndex,msg),
                    appendInfoMsg:  msg => s.appendInfoMsg(paneIndex,msg),
                    logError:       (msg,fn) => s.paneLogError(paneIndex,msg,fn),
                    logInfo:        (msg,fn) => s.paneLogInfo(paneIndex,msg,fn),
                    logWarn:        (msg,fn) => s.paneLogWarn(paneIndex,msg,fn),
                    updateModalProps:    ({key,value}) => s.updateModalProps(paneIndex,{key,value}),
                }
                const paneMethods = {
                    closePane:      () => s.closePane,
                    closeUnUsedPane: () => s.closeUnUsedPane(paneIndex + 1),
                    // changePaneView: viewIndex => s.changePaneView({paneIndex,viewIndex}),
                    render:         (data,viewIndex) => s.render(data,paneIndex,viewIndex),
                    spawnModal: modalObject => s.spawnModal(paneIndex,modalObject),
                    prompt: (promptObject,cb) => s.panePrompt(paneIndex,promptObject,cb),
                    updatePaneData: (data) => s.updatePaneData(paneIndex,objectData),
                    updatePaneConfig: (config) => s.updatePaneConfig(paneIndex,config) ,
                    getCurrentPaneIndex: () => paneIndex
                }
                const dWinMethods = {
                    spawn: dWinObject => s.dwinSpawn(dWinObject),
                    close: (section) => s.dwinClose(section)
                }
                return { paneMethods, modalMethods, dWinMethods }
            })(scope)
        },
        /** dwin */
        dwinSpawn(dWinObject) {
            // section, winView, viewConfig, data
            if(!dWinObject.section || !dWinObject.winView || !dWinObject.viewConfig || !dWinObject.data) {
                this.systemError('dwinSpawn Error: Cannot spawn dWin Invalid dWinObject or has missing properties')
            } else {
                const {section, winView, viewConfig, winConfig, data} = dWinObject
                if(winConfig) {
                    if(!winConfig.height) {
                        winConfig.height = '100%'
                    }
                }
                this.$store.commit('stateController', {
                    key: ((section) => {
                        if(section === 'top') {
                            return 'dWinTop'
                        } else if(section === 'right') {
                            return 'dWinRight'
                        } else {
                            this.systemError('dwinSpawn Error: Invalid dWin section')
                        }
                    })(section),
                    value: { winView, viewConfig, data, winConfig }
                })
            }
        },
        dwinClose(section) {
            this.$store.commit('stateController',{
                key: ((section) => {
                    if(section === 'top') {
                        return 'dWinTop'
                    } else if(section === 'right') {
                        return 'dWinRight'
                    } else {
                        this.systemError('dwinClose Error: Invalid dWin section')
                    }
                })(section),
                value: undefined
            })
        },
        /** end of dwin */
        renderPane(data, paneIndex,viewIndex) {
            // console.log('renderPane', data)
            if(paneIndex == undefined || paneIndex == null) {
                this.systemError('renderPane error, paneIndex cannot be undefined')
                return
            }
            const { actions } = this.controls


            // console.log('helper',paneIndex, this.$store.state.pane.length - 1)
            if(this.$store.state.pane[paneIndex + 1] == undefined) {
                // console.log('> renderPane Case1')
                /** it means add one pane */
                actions.syspane.addsync(data)
            } else {
                // console.log('> renderPane Case2')
                /** it means update the paneData? or replace the pane with a new view  */
                if(paneIndex + 1 == this.$store.state.pane.length - 1) {
                    actions.syspane.updatePane(paneIndex + 1, this.getServiceView(data.paneConfig.paneData,viewIndex))
                    .then(res => {
                        const {paneMethods,modalMethods} =  this.normyDep(paneIndex + 1,this)
                        this.$store.state.pane[paneIndex + 1].paneConfig.paneOnLoad(paneMethods,modalMethods)
                    })
                } else {
                    // console.log('> renderPane Case3')
                    actions
                    .syspane
                    .add(data)
                    .then(res => {
                        const {paneMethods,modalMethods} =  this.normyDep(paneIndex + 1,this)
                        this.$store.state.pane[paneIndex + 1].paneConfig.paneOnLoad(paneMethods,modalMethods)
                    })
                }
                
            }
            
        },
        getServiceView(dataSet,viewIndex){
            // console.log('> Getting service view ', dataSet)
            // returns a service objects
            const {views} = this.$store.state.app['app-services'][this.$store.state.app['active-sidebar-item']]
            const deserializeViews = new Function('return ' + views)()
            const helper = {  /** this for global access, if you use this, you have to provide a paneIndex, or if not all panes will be affected */
                paneSettings: this.paneSettings,
                paneModal : this.paneModal,
                renderPane : this.renderPane,
                getServiceView: this.getServiceView,
                closePane: this.closePane,
                render: this.render,
                systemError: this.systemError,
                closeUnUsedPane: this.closeUnUsedPane,
                panePrompt: this.panePrompt,
                updatePaneData: this.updatePaneData,
                updatePaneConfig: this.updatePaneConfig,
                getCurrentPaneIndex: this.paneIndex
            }
            
            // dependency enject the views function
            const serviceObject = deserializeViews(dataSet,helper,utils,templates)

            if(!serviceObject) {
                this.systemError('getServiceView error: Unhandled dataSet in service views, cannot find a service view, check console log for more details')
            } else {
                // Problem start here, the data will be incorrect starting on a non zero index pane
                const { componentConfig, paneConfig, paneOnLoad, onModalData } = serviceObject
                if(!paneConfig.modal) {
                    paneConfig.modal = {}
                    paneConfig.modal.modalBody = undefined
                    paneConfig.modal.componentConfig = undefined
                    paneConfig.modal.modalConfig = undefined
                    paneConfig.modal.modalErr = undefined
                    paneConfig.modal.modalInfo = undefined
                    paneConfig.modal.isClosable = false
                    paneConfig.modal.modalWidth = undefined
                }
                paneConfig.modal.onModalData = onModalData
                paneConfig.paneOnLoad = paneOnLoad

                if(typeof viewIndex == 'number') {
                    if(paneConfig.paneViews[viewIndex] == undefined) {
                        this.systemError(`System Error: Invalid index value in render method, value: ${viewIndex} \n Cannot set pane view of undefined, reverting to 0 index pane view`)
                    } else {
                        paneConfig.defaultPaneView = viewIndex
                    }
                }
                return { componentConfig, paneConfig }
            }
            
        },
        render(dataSet,paneIndex,viewIndex) {
            this.renderPane(this.getServiceView(dataSet,viewIndex),paneIndex,viewIndex)
        },
        /** close pane */
        closePane() {      
            if(this.$store.state.pane.length == 1){
                this.actions.syspane.switchMenu(this.$store.state.app['defualt-active'])
            } else {
                this.actions.syspane.delete(this.paneIndex)
            }
        },
        /** closes a the pane modal */
        closePaneModal(paneIndex) {
            return this.actions.syspane.paneModalUpdate(paneIndex,'closeModal')
        },
        closeGlobalModal() {
            this.actions.sysmodal.closeModal()
        },
        /** close all un used pane */
        closeUnUsedPane(paneIndex) {
            this.actions.syspane.delete(paneIndex)
        },
        /** Appends an error msg to the pane modal */
        appendErrorMsg(paneIndex,msg) {
            this.actions.syspane.paneModalUpdate(paneIndex,{
                payload: {
                    key: 'modalInfo',
                    value: undefined
                }
            }).then(() => {
                this.actions.syspane.paneModalUpdate(paneIndex,{
                    payload: {
                        key: 'modalErr',
                        value: msg
                    }
                })
            })
        },
        /** Appends an infomsg to the pane modal */
        appendInfoMsg(paneIndex,msg) {
            this.actions.syspane.paneModalUpdate(paneIndex,{
                payload: {
                    key: 'modalErr',
                    value: msg
                }
            }).then(() => {
                this.actions.syspane.paneModalUpdate(paneIndex,{
                    payload: {
                        key: 'modalInfo',
                        value: undefined
                    }
                })
            })
        },
        /** Update Modal Props */
        updateModalProps(paneIndex, payload) {
            return this.actions.syspane.paneModalUpdate(paneIndex, payload)
        },
        /** spwans a modal to a pane */
        spawnModal(paneIndex,modalObject) {
            // call templates here
            try {
                this.closePaneModal(paneIndex).then(() => {
                    this.$store.commit('paneModalOverwrite', {
                        paneIndex,
                        modalObject: new templates.paneModal(modalObject)
                    })
                })
            }catch(err) {
                this.systemError(`activaPaneModal ERR \n ${err}`)
            }
        },
        /** Spawns an error pane modal, this is a non queue function */
        paneLogError(paneIndex,msg, fn) {
            this.closePaneModal(paneIndex).then(() => {
                this.$store.commit('paneModalOverwrite', {
                    paneIndex,
                    modalObject: new templates.paneModal({
                        modalBody: 'logErr',
                        modalHeader: 'Error!',
                        isClosable: true,
                        modalConfig: {
                            msg,
                            fn: fn ? fn : function() {}
                        }
                    })
                })
            })
        },
        /** Spawns an info pane modal, this is a non queue function */
        paneLogInfo(paneIndex,msg, fn) {
            this.closePaneModal(paneIndex).then(() => {
                this.$store.commit('paneModalOverwrite', {
                    paneIndex,
                    modalObject: new templates.paneModal({
                        modalBody: 'logInfo',
                        modalHeader: 'Info!',
                        isClosable: true,
                        modalConfig: {
                            msg,
                            fn: fn ? fn : function() {}
                        }
                    })
                })
            })
        },
        /** Spawns a warning pane modal, this is a non queue function */
        paneLogWarn(paneIndex,msg, fn) {
            this.closePaneModal(paneIndex).then(() => {
                this.$store.commit('paneModalOverwrite', {
                    paneIndex,
                    modalObject: new templates.paneModal({
                        modalBody: 'logWarn',
                        modalHeader: 'Warning!',
                        isClosable: true,
                        modalConfig: {
                            msg,
                            fn: fn ? fn : function() {}
                        }
                    })
                })
            })
        },
        /** Updates the pane data */
        updatePaneData(paneIndex,paneData) {
            this.commit('paneUpdateData', {
                paneIndex,
                paneData
            })
        },
        updatePaneConfig(paneIndex,config) {
            // console.log('> updatePaneConfig', paneIndex)
            this.$store.commit('paneUpdateConfig', {
                index: paneIndex,
                key: config.key,
                value: config.value
            })
        },
        panePrompt(paneIndex,promptObject,fn) {
            const types = ['string','number','select','multiselect','slider', 'minmax', 'password']

            if(promptObject != undefined) {
                if(types.indexOf(promptObject.type) != -1) {
                    // string
                    if(promptObject.type === 'string') {
                        if(typeof promptObject.value == 'string' || promptObject.value == null || promptObject.value == undefined) {
                            this.closePaneModal(paneIndex).then(() => {
                                this.$store.commit('paneModalOverwrite', {
                                    paneIndex,
                                    modalObject: new templates.paneModal({
                                        modalBody: 'logPrompt',
                                        modalHeader: promptObject.header,
                                        isClosable: true,
                                        modalConfig: {
                                            value: promptObject.value,
                                            fn: fn ? fn : function() {},
                                            type: 'string',
                                            defaultValue: promptObject.defaultValue
                                        }
                                    })
                                })
                            })
                        } else {
                            this.systemError(`panePrompt Error: in second argument, Invalid value type default value type, 
                            it should be a string but got a type of ${typeof promptObject.value}`)
                        }
    
                    }
                    // number
                    if(promptObject.type === 'number') {
                        // value can be undefined and default value
                        if(promptObject.value || promptObject.defaultValue) {
                            if(typeof promptObject.value == 'number' || typeof promptObject.defaultValue == 'number') {
                                this.closePaneModal(paneIndex).then(() => {
                                    this.$store.commit('paneModalOverwrite', {
                                        paneIndex,
                                        modalObject: new templates.paneModal({
                                            modalBody: 'logPrompt',
                                            modalHeader: promptObject.header,
                                            isClosable: true,
                                            modalConfig: {
                                                value: promptObject.value,
                                                fn: fn ? fn : function() {},
                                                type: 'number',
                                                defaultValue: promptObject.defaultValue
                                            }
                                        })
                                    })
                                })
                            } else {
                                this.systemError(`panePrompt Error: in second argument, Invalid value or default value type, 
                                it should be a number but got ${typeof promptObject.value == undefined || typeof promptObject.value == null ? 'undefined' :
                                 `a type of \n (value: ${typeof promptObject.value}) \n (default value: ${typeof promptObject.defaultValue})` }`)
                            }
                        } else {
                            this.closePaneModal(paneIndex).then(() => {
                                this.$store.commit('paneModalOverwrite', {
                                    paneIndex,
                                    modalObject: new templates.paneModal({
                                        modalBody: 'logPrompt',
                                        modalHeader: promptObject.header,
                                        isClosable: true,
                                        modalConfig: {
                                            value: null,
                                            fn: fn ? fn : function() {},
                                            type: 'number',
                                            defaultValue: null
                                        }
                                    })
                                })
                            })
                        }
                    }
                    // select
                    if(promptObject.type === 'select') {
                        if(promptObject.value != undefined) {
                            if(promptObject.defaultValue) {
                                if(promptObject.defaultValue) {
                                    if(typeof promptObject.defaultValue != 'string') {
                                        this.systemError(`panePrompt Error: Invalid defaultValue type, defaultValue should be a type of string`)
                                        if(!promptObject.value.includes(promptObject.defaultValue)) {
                                            this.systemError(`panePrompt Error: Cannot find "${promptObject.defaultValue}" in value's array`)
                                        } 
                                    }
                                }
                            }
                            if(Array.isArray(promptObject.value) ){
                                this.closePaneModal(paneIndex).then(() => {
                                    this.$store.commit('paneModalOverwrite', {
                                        paneIndex,
                                        modalObject: new templates.paneModal({
                                            modalBody: 'logPrompt',
                                            modalHeader: promptObject.header,
                                            isClosable: true,
                                            modalConfig: {
                                                value: promptObject.value,
                                                fn: fn ? fn : function() {},
                                                type: 'select',
                                                defaultValue: promptObject.defaultValue
                                            }
                                        })
                                    })
                                })
                            } else {
                                this.systemError(`panePrompt Error: in second argument, Invalid select value type, it should be an array but got a type of ${typeof promptObject.value}`)
                            }
                        } else {
                            this.systemError(`panePrompt Error: in second argument, value cannot be undefined`)
                        }

                    }
                    // multiselect
                    if(promptObject.type === 'multiselect') {
                        if(!promptObject.value) {
                            this.systemError('panePrompt Error: type multiselect value property cannot be undefined or null')
                        } else if(promptObject.defaultValue) {
                            if(!Array.isArray(promptObject.defaultValue)) {
                                this.systemError('panePrompt Error; Invalid defaultValue type, should be an array of string values')
                            } else {
                                promptObject.defaultValue.map(e => {
                                    if(!promptObject.value.includes(e)) {
                                        this.systemError(`panePrompt Error: Cannot find ${e} in values array`)
                                    }
                                })
                            }
                            this.closePaneModal(paneIndex).then(() => {
                                this.$store.commit('paneModalOverwrite', {
                                    paneIndex,
                                    modalObject: new templates.paneModal({
                                        modalBody: 'logPrompt',
                                        modalHeader: promptObject.header,
                                        isClosable: true,
                                        modalConfig: {
                                            value: promptObject.value,
                                            fn: fn ? fn : function() {},
                                            type: 'multiselect',
                                            defaultValue: promptObject.defaultValue
                                        }
                                    })
                                })
                            })
                        }
                    }
                    // slider
                    if(promptObject.type === 'slider') {
                        if(!promptObject.value) {
                            this.systemError('panePrompt Error: value cannot be undefined or null')
                        } else if( Object.keys(promptObject.value).toString() != 'min,max' ) {
                            this.systemError('panePrompt Error: Invalid value properties for slider.')
                        } else if(promptObject.defaultValue) {
                            if(promptObject.defaultValue < promptObject.value.min ) {
                                this.systemError(`panePrompt Error: defaultValue in slider cannot be lesser than ${promptObject.value.min}`)
                            } else if(promptObject.defaultValue > promptObject.value.max) {
                                this.systemError(`panePrompt Error: defaultValue in slider cannot be greater than ${promptObject.value.max}`)
                            } else {
                                this.closePaneModal(paneIndex).then(() => {
                                    this.$store.commit('paneModalOverwrite', {
                                        paneIndex,
                                        modalObject: new templates.paneModal({
                                            modalBody: 'logPrompt',
                                            modalHeader: promptObject.header,
                                            isClosable: true,
                                            modalConfig: {
                                                value: promptObject.value,
                                                fn: fn ? fn : function() {},
                                                type: 'slider',
                                                defaultValue: promptObject.defaultValue
                                            }
                                        })
                                    })
                                })
                            }
                        } else {
                            this.closePaneModal(paneIndex).then(() => {
                                this.$store.commit('paneModalOverwrite', {
                                    paneIndex,
                                    modalObject: new templates.paneModal({
                                        modalBody: 'logPrompt',
                                        modalHeader: promptObject.header,
                                        isClosable: true,
                                        modalConfig: {
                                            value: promptObject.value,
                                            fn: fn ? fn : function() {},
                                            type: 'slider',
                                            defaultValue: promptObject.value.min
                                        }
                                    })
                                })
                            })
                        }
                    }
                    if(promptObject.type === 'minmax') {
                        if(!promptObject.value) {
                            this.systemError('panePrompt Error: value cannot be undefined or null')
                        } else if( Object.keys(promptObject.value).toString() != 'min,max' ) {
                            this.systemError('panePrompt Error: Invalid value properties for minmax.')
                        }  else if(promptObject.defaultValue) {
                            this.closePaneModal(paneIndex).then(() => {
                                this.$store.commit('paneModalOverwrite', {
                                    paneIndex,
                                    modalObject: new templates.paneModal({
                                        modalBody: 'logPrompt',
                                        modalHeader: promptObject.header,
                                        isClosable: true,
                                        modalConfig: {
                                            value: {
                                                min: promptObject.value.min,
                                                max: promptObject.value.max
                                            },
                                            fn: fn ? fn : function() {},
                                            type: 'minmax',
                                            defaultValue: promptObject.defaultValue
                                        }
                                    })
                                })
                            })
                        } else {
                            this.closePaneModal(paneIndex).then(() => {
                                this.$store.commit('paneModalOverwrite', {
                                    paneIndex,
                                    modalObject: new templates.paneModal({
                                        modalBody: 'logPrompt',
                                        modalHeader: promptObject.header,
                                        isClosable: true,
                                        modalConfig: {
                                            value: {
                                                min: 0,
                                                max: 100
                                            },
                                            fn: fn ? fn : function() {},
                                            type: 'minmax',
                                            defaultValue: [25,75]
                                        }
                                    })
                                })
                            })
                        }
                    }
                    // password
                    if(promptObject.type === 'password') {
                        this.closePaneModal(paneIndex).then(() => {
                            this.$store.commit('paneModalOverwrite', {
                                paneIndex,
                                modalObject: new templates.paneModal({
                                    modalBody: 'logPrompt',
                                    modalHeader: promptObject.header,
                                    isClosable: true,
                                    modalConfig: {
                                        value: promptObject.value,
                                        fn: fn ? fn : function() {},
                                        type: 'password'
                                    }
                                })
                            })
                        })
                    }
                } else {
                    this.systemError(`panePrompt Error: in second argument Invalid type: "${promptObject.type}"`)
                }
            } else {
                this.systemError('panePrompt Error: in second argument Invalid promptObject')
            }

            if(promptObject.info) {
                this.appendInfoMsg(paneIndex,promptObject.info)
            }
        }
    }
}