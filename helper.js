import sysvoid from '@/apps/compiledTask/sysvoid'
import sysutil from '@/apps/compiledTask/sysutil'
import syspane from '@/apps/compiledTask/syspane'
import templates from './templates'
import procedures from './procedures'
import utils from './utils'

export default {
    data: () => ({
        h: undefined,
        componentConfig: null
    }),
    mounted() {
        this.$p = this.h
    },
    methods: {
    /** sys utils */
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
        getCompiledTask(lib,payload){
            
            // console.log('getCompiledTask')
            if(lib.indexOf('.') != -1) {
                const namespace = lib.split('.')[0]
                const method = lib.split('.')[1]
                // sysvoid <-- methods that does not require any initial input for this compiled task to run
                if(namespace == 'sysvoid') {
                    return sysvoid[method]
                }
                // sysutil, log, log-err, log-info
                else if(namespace == 'sysutil') {
                    return sysutil[method]
                }
                // syspane, managing pane sysytem
                else if(namespace == 'syspane') {
                    return syspane[method]
                }else {
                    alert(`Err: invalid namespace ${namespace}`)
                    location.reload()
                }
            } else {
                alert(`Err: Invalid task name ${lib}`)
                location.reload()
            }
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
        /**TODO pane modal */
        paneModal({header,width,body}) {
            const {isComponent,content} = body
            /** if isComponent is false it will assume it is string, else name of a vue component */
        },
        renderPane(data) {
            // console.log('> from',this.paneIndex)
            if(data.componentConfig || data.paneConfig) {
                this.runCompiledTask([
                    new templates.TaskItem('sysmodal.logerr', {
                        msg: 'SystemError: renderPane error: Invalid input data, input should be a paneData not a serviceObject'
                    }),
                    new templates.TaskItem('sysmodal.close-modal', {}),
                    new templates.TaskItem('exec', function() {
                        window.location.reload()
                    }),
                    new templates.TaskItem('done', {})
                ])
                console.error(`renderPane error: Invalid input data, input should be a paneData not a serviceObject`, data)
            } else {
                this.runCompiledTask([
                    new templates.TaskItem('insertCompiledTask',{
                        compiledTask: this.getCompiledTask('syspane.add-pane'),
                        payload: {
                            data
                        }
                    })
                ])
            }
        },
        getServiceView(dataSet){
            // console.log('> Getting service view ', dataSet)
            // returns a service objects
            const {views} = this.$store.state.app['app-services'][this.$store.state.app['active-sidebar-item']]
            const deserializeViews = new Function('return ' + views)()
            const helper = {
                runCompiledTask : this.runCompiledTask,
                getCompiledTask : this.getCompiledTask,
                paneSettings: this.paneSettings,
                paneModal : this.paneModal,
                renderPane : this.renderPane,
                getServiceView: this.getServiceView
            }
            const serviceObject = deserializeViews(dataSet,helper,utils,templates)

            if(!serviceObject) {
                this.runCompiledTask([
                    new templates.TaskItem('sysmodal.logerr', {
                        msg: 'getServiceView error: Unhandled dataSet in service views, cannot find a service view, check console log for more details'
                    }),
                    new templates.TaskItem('sysmodal.close-modal', {}),
                    new templates.TaskItem('exec', function() {
                        window.location.reload()
                    }),
                    new templates.TaskItem('done', {})
                ])
                console.error('getServiceView error: Unhandled dataSet in service views, cannot find a service view for this data set', dataSet)
                return
            } else {
                // Problem start here, the data will be incorrect starting on a non zero index pane
                const { componentConfig, paneConfig, paneOnLoad } = serviceObject
                paneOnLoad()
                return {
                    componentConfig,
                    paneConfig
                }
                
            }
            
        },
        closePane() {            
            if(this.$store.state.pane.length == 1){
                this.runCompiledTask([
                    new templates.TaskItem('insertCompiledTask', {
                        payload: { 
                            selectedMenu: this.$store.state.app['defualt-active']
                        },
                        compiledTask: this.getCompiledTask('syspane.switch-menu')
                    })
                ])
            } else {
                /** TODO: implement pane close for non 0 index pane */
                this.runCompiledTask([
                    new templates.TaskItem('insertCompiledTask', {
                        payload: { 
                            origin: this.paneIndex
                        },
                        compiledTask: this.getCompiledTask('syspane.close-pane')
                    })
                ])
            }
        }
    }
}