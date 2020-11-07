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
        this.validator = utils.stringValidator
    },
    methods: {
        /** sys utils */
        systemError(msg) {
            this.actions.sysmodal.logerr(`FATAL: ${msg}`, () => {
                location.reload()
            })
        },
        m() {
            return this
        },
        cp: utils.copy,
        pipe: utils.pipe,
        validateString:utils.validateString,
        commonStringValidations: utils.commonStringValidations.vs1,
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
                const syspanemodal = {
                    /** this methods only work when the pane modal is activated */
                    close: () =>  s.actions.syspane.modal.update(paneIndex,'closeModal'),
                    appendErrorMsg: msg => s.actions.syspane.modal.appendErrorMsg(paneIndex,msg),
                    appendInfoMsg:  msg => s.actions.syspane.modal.appendInfoMsg(paneIndex,msg),
                    logError:  (msg,fn) => s.actions.syspane.modal.logError(paneIndex,msg,fn),
                    logInfo:   (msg,fn) => s.actions.syspane.modal.logInfo(paneIndex,msg,fn),
                    logWarn:   (msg,fn) => s.actions.syspane.modal.logWarn(paneIndex,msg,fn),
                }
                const syspane = {
                    close:      () => s.actions.syspane.close(paneIndex),
                    closeUnUsedPane: () => s.actions.syspane.delete(paneIndex + 1),
                    render:   (data,viewIndex,beforeRender) => s.actions.syspane.render(data,paneIndex,viewIndex,beforeRender),
                    spawnModal:    modalObject => s.spawnModal(paneIndex,modalObject),
                    prompt:  (promptObject,cb) => s.actions.syspane.prompt(paneIndex,promptObject,cb),
                    updatePaneData:  (objData,targetKey) => s.actions.syspane.updatePaneData(paneIndex,objData,targetKey),
                    updateTargetPaneData:  (pi,objData,targetKey) => s.actions.syspane.updatePaneData(pi,objData,targetKey),
                    updateChildPaneData:(objData,targetKey) => s.actions.syspane.updatePaneData(paneIndex + 1,objData,targetKey),
                    updateParentPaneData:(objData,targetKey) => s.actions.syspane.updatePaneData(paneIndex - 1,objData,targetKey),
                    updatePaneConfig: (config) => s.updatePaneConfig(paneIndex,config) ,
                    getPaneIndex:    () => paneIndex,
                    // loading is not a syspane method but a sysmodal method
                    loading: s.actions.sysmodal.loading
                }
                const dwin = {
                    spawn: (dWinObject,cb) => s.actions.dwin.spawn(dWinObject,cb),
                    close: section => s.actions.dwin.close(section),
                    changeView: section => s.actions.dwin.changeView(section),
                }
                return { syspane, syspanemodal, dwin }
            })(scope)
        },
        autoScroll() {
            // auto scroll
            const paneContainer = document.getElementById('dq-main-w')
            const paneContainerWidth = paneContainer.offsetWidth
            const hostContainer = document.getElementById('dq-host-container')
            const hostContainerWidth = Math.round(hostContainer.getBoundingClientRect().width)
            if(paneContainerWidth > hostContainerWidth) {
                setTimeout(() => {
                    hostContainer.scrollTo({ top: 0, left: paneContainerWidth, behavior: 'smooth' })
                },50)
            }
        },
        /** close pane */
        closePane(id) {      
            const pane =  document.getElementById(id)
            

            if(this.paneIndex == 0){
                this.actions.syspane.close(this.paneIndex)
            } else {
                pane.classList.add('closeAnimation')
                setTimeout(() => {
                    this.actions.syspane.close(this.paneIndex)
                }, 250);
            }
        },
        /** closes a the pane modal */
        closePaneModal(paneIndex) {
            return this.actions.syspane.modal.update(paneIndex,'closeModal')
        },
        closeGlobalModal(cb) {
            this.actions.sysmodal.closeModal()
            if(cb) {
                cb()
            }
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
        updatePaneConfig(paneIndex,config) {
            this.$store.commit('paneUpdateConfig', {
                index: paneIndex,
                key: config.key,
                value: config.value
            })
        }
    }
}