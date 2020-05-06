import templates from './templates'
import utils from './utils'

export default function (app,method) {
    const i = {}
    
    // system
    i['private.sysutil.cp'] = function(o) {
        if (o === null) return null;
        
                var output, v, key;
                output = Array.isArray(o) ? [] : {};
                for (key in o) {
                  v = o[key];
                  output[key] = typeof v === "object" ? this.cp(v) : v;
                }
        
        return output;
    }
    i['private.insertCompiledTask'] = function ({compiledTask,payload}) {
        // compiled task returns an array of task items
        const prm = payload ? payload : app.$store.state.queueCurrentTaskAnswer
        const ct = Array.isArray(compiledTask) ? compiledTask : compiledTask(prm)
        const pa = () => {
            app.$store.state.queueAnswersArray.push({
                answer: '--not answered--'
            })
        }
        if(Array.isArray(ct)) {
            // push or insert tasks to queue
            if(app.$store.state.queue.length - 1 === app.$store.state.queuePointer) {
                // get function and push to queue
                ct.map(e => {
                    if(e.taskName === 'exec') {
                        app.$store.state.queue.push(new templates.ExecQueueItem({
                            fn: i[`private.${e.taskName}`],
                            param: e.taskParam,
                            m: i
                        }))
                    } else {
                        app.$store.state.queue.push(new templates.NormalQueueItem({
                            fn: i[`private.${e.taskName}`],
                            param: e.taskParam,
                        }))
                    }                    
                    pa()
                })
                app.$store.commit('stateController', {
                    key: 'queuePointer',
                    value: app.$store.state.queuePointer + 1
                })
            } else {
                // insert
                const f = ct.map(e => {
                    pa()
                    if(e.taskName === 'exec') {
                        return new templates.ExecQueueItem({
                            fn: i[`private.${e.taskName}`],
                            param: e.taskParam,
                            m: i
                        })
                    } else {
                        return new templates.NormalQueueItem({
                            fn: i[`private.${e.taskName}`],
                            param: e.taskParam,
                        })
                    }                        
                })
                app.$store.state.queue.splice(app.$store.state.queuePointer ,0,f)
                app.$store.state.queue = app.$store.state.queue.flat()
                app.$store.commit('executeQueue')
            }
        } else {
            alert('Err: Invalid compiled task in insertCompiledTask item')
            location.reload()
        }
    }
    i['private.done'] = function () {
        console.log('> all task done')
        console.log('')
        console.log('')
        app.$store.commit('stateController', {
            key: 'queueState',
            value: 'end'
        })
        app.$store.commit('stateController', {
            key: 'queueCurrentTaskAnswer',
            value: null
        })
        app.$store.commit('stateController', {
            key: 'queuePointer',
            value: null
        })
        app.$store.commit('stateController', {
            key: 'queueAnswersArray',
            value: null
        })
        app.$store.commit('stateController', {
            key: 'queue',
            value: []
        })
        app.$store.commit('stateController', {
            key: 'queueStatic',
            value: null
        })
    }
    i['private.resetTask'] = function ({resetBackTo,injectOrModifyProp}) {
        if(resetBackTo > app.$store.state.queuePointer) {
            alert(`Err: in resetTask task item object, illegal reset value in "resetBackTo" property, value:${resetBackTo}`)
            location.reload()
        } else {
            app.$store.commit('stateController',{
                key: 'queuePointer',
                value: resetBackTo
            })
        }
        
        Object.assign(app.$store.state.queue[app.$store.state.queuePointer].param, injectOrModifyProp)
    }
    i['private.syscall.get'] = function() {
        console.log('getting resources')
        setTimeout(() => {
            app.answerPending({
                data: app.$store.state.pane.length == 0 ? 'test 1' : 'test 2'
            })
        }, 100);
        app.answerPending()
    }
    i['private.syscall.post'] = function() {

    }
    i['private.syscall.delete'] = function() {

    }
    i['private.insert-service'] = function (service) {

    }
    // modal
    i['private.sysmodal.spawn'] = function ({modalType, modalPayload}) {
        if(app.$store.state.queue.length == 0) {
            alert('ERR: Invalid spawnGlobalModal() function invocation, procedures should not directly called on components')
        } else {
            app.$store.commit('stateController', {
                key: 'globalModalState',
                value: true
            })
            app.$store.commit('stateController', {
                key: 'globalModalContentType',
                value: modalType
            })
            app.$store.commit('stateController', {
                key: 'globalModalContent',
                value: modalPayload
            })
            
        } 
    }
    i['private.sysmodal.ask'] = function ({question, truthy, falsey}) {
        i['private.sysmodal.spawn']({
            modalType: 'boolean',
            modalPayload: {
                truthy,
                falsey,
                question
            }
        })
    }
    i['private.sysmodal.prompt'] = function ({type,defaultValue, placeholder, label, err}) {
        i['private.sysmodal.spawn']({
            modalType: 'prompt',
            modalPayload: {
                type,
                defaultValue,
                placeholder,
                label,
                err
            }
        })
    }
    i['private.sysmodal.select'] = function ({options,defaultValue, label, err}) {
        i['private.sysmodal.spawn']({
            modalType: 'select',
            modalPayload: {
                options,
                defaultValue,
                label,
                err
            }
        })
    }
    i['private.sysmodal.loginfo'] = function ({msg}) {
        i['private.sysmodal.spawn']({
            modalType: 'loginfo',
            modalPayload: {
                msg
            }
        })
    }
    i['private.sysmodal.logerr'] = function ({msg}) {
        i['private.sysmodal.spawn']({
            modalType: 'logerr',
            modalPayload: {
                msg
            }
        })
    }
    i['private.sysmodal.loading'] = function ({msg}) {
        i['private.sysmodal.spawn']({
            modalType: 'loading',
            modalPayload: {
                msg
            }
        })
    }
    i['private.sysmodal.close-modal'] = function () {
        // console.log('> Closing Modal')
        app.$store.commit('stateController', {
            key: 'globalModalState',
            value: false
        })
        app.$store.commit('stateController', {
            key: 'globalModalContentType',
            value: undefined
        })
        app.$store.commit('stateController', {
            key: 'globalModalContent',
            value: undefined
        })
        setTimeout(() => {
            app.answerPending('--void--')
        }, 50);
    }
    // sidebar
    i['private.sidebar.switch-menu'] = function ({selectedMenu,payload}) {
        /** emptying the pane array */
        app.$store.commit('stateController', {
            key: 'pane',
            value: []
        })
        /** change the active menu in side bar */
        app.$store.commit('app/stateController', {
            key: 'active-sidebar-item',
            value: selectedMenu
        })
        /** pane add */
        i['private.syspane.add']({
            payload:  app.getServiceView(payload)
        })


        /** move to next queue item */
        app.answerPending()
    }
    // pane system management
    i['private.syspane.add'] = function ({payload}) {
        // console.log('> syspane.add ', payload)
        if(!payload.componentConfig || !payload.paneConfig) {
            app.systemError('Invalid pane object')
        } else {
            app.$store.commit('paneAdd', {
                payload
            })
            app.answerPending()
        }
    }
    i['private.syspane.delete'] = function ({paneIndexOrigin}) {
        app.$store.commit('paneDelete', {
            paneIndexOrigin: paneIndexOrigin
        })
        app.answerPending('--done--')
    }
    i['private.syspane.update-data'] = function ({paneIndex,paneData}) {
        app.$store.commit('paneUpdateData', {
            paneIndex: paneIndex,
            paneData: paneData
        })
        app.answerPending('--done--')
    }
    i['private.syspane.update-pane'] = function ({paneIndex, payload}) {
        app.$store.commit('paneUpdate', {
            paneIndex: paneIndex,
            payload
        })
        app.answerPending('--done--')
    }
    i['private.syspane.update-view'] = function ({paneIndex,paneView}) {
        app.$store.commit('paneUpdateData', {
            paneIndex: paneIndex,
            paneView: paneView
        })
        app.answerPending('--done--')
    }
    i['private.syspane.get-initial-data'] = function ({serviceName}) {
        // console.log('> getting initial data of ',serviceName)
        app.answerPending({
            payload: app.$store.state.app['app-services'][serviceName].data
        })
    },
    i['private.syspane.close-pane-modal'] = function({paneIndex}) {
        console.log('> syspane.close-pane-modal', paneIndex)
        app.$store.commit('paneModalUpdate', {
            paneIndex,
            payload: 'closeModal'
        })
        app.answerPending()
    },

    // pane system rendering
    i['private.syspane.get-service-view'] = function({dataSet,viewIndex}) {
        console.log('> Entering service view')
        // returns a service objects
        const {views} = app.$store.state.app['app-services'][app.$store.state.app['active-sidebar-item']]
        const deserializeViews = new Function('return ' + views)()
        const helper = {  /** this for global access, if you use this, you have to provide a paneIndex, or if not all panes will be affected */
            runCompiledTask : app.runCompiledTask,
            getCompiledTask : app.getCompiledTask,
            paneSettings: app.paneSettings,
            paneModal : app.paneModal,
            renderPane : app.renderPane,
            getServiceView: app.getServiceView,
            closePane: app.closePane,
            render: app.render,
            systemError: app.systemError,
            closeUnUsedPane: app.closeUnUsedPane,
            panePrompt: app.panePrompt,
            updatePaneData: app.updatePaneData,
            updatePaneConfig: app.updatePaneConfig,
            getCurrentPaneIndex: app.paneIndex
        }
        
        // dependency enject the views function
        const serviceObject = deserializeViews(dataSet,helper,utils,templates)

        if(!serviceObject) {
            app.systemError('getServiceView error: Unhandled dataSet in service views, cannot find a service view, check console log for more details')
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
                    app.systemError(`System Error: Invalid index value in render method, value: ${viewIndex} \n Cannot set pane view of undefined, reverting to 0 index pane view`)
                } else {
                    paneConfig.defaultPaneView = viewIndex
                }
            }
            console.log('> Getting service view ', {componentConfig, paneConfig})

            // return { componentConfig, paneConfig }
            app.answerPending({ componentConfig, paneConfig })
        }
    },
    i['private.syspane.render-pane'] = function({data, paneIndex,viewIndex}) {
        console.log('renderPane', data)
        if(paneIndex == undefined || paneIndex == null) {
            this.systemError('renderPane error, paneIndex cannot be undefined')
            return
        }

        // console.log('helper',paneIndex, this.$store.state.pane.length - 1)
        if(app.$store.state.pane[paneIndex + 1] == undefined) {
            // console.log('> renderPane Case1')
            /** it means add one pane */
            this.runCompiledTask([
                new templates.TaskItem('insertCompiledTask',{
                    compiledTask: this.getCompiledTask('syspane.add-pane'),
                    payload: {
                        data
                    }
                }),
                new templates.TaskItem('done')
            ])

        } else {
            console.log('> renderPane Case2')
            /** it means update the paneData? or replace the pane with a new view  */
            if(paneIndex + 1 == this.$store.state.pane.length - 1) {
                const sv = i['private.syspane.get-service-view']({
                    dataSet: data.paneConfig.paneData,viewIndex,
                    viewIndex
                })
                i['private.syspane.update-pane']({paneIndex: paneIndex+1, payload: sv})
                app.answerPending()
                // this.runCompiledTask([
                //     new templates.TaskItem('syspane.update-pane', {
                //         paneIndex: paneIndex + 1,
                //         payload: this.getServiceView(data.paneConfig.paneData,viewIndex)
                //     }),
                //     new templates.TaskItem('done',() => {
                //         const {paneMethods,modalMethods} =  this.normyDep(paneIndex + 1,this)
                //         this.$store.state.pane[paneIndex + 1].paneConfig.paneOnLoad(paneMethods,modalMethods)
                //     })
                // ])


            } else {
                console.log('> renderPane Case3')
                // this.runCompiledTask([
                //     new templates.TaskItem('syspane.delete', {
                //         paneIndexOrigin: paneIndex + 1
                //     }),
                //     new templates.TaskItem('syspane.add', {
                //         payload: data
                //     }),
                //     new templates.TaskItem('done',() => {
                //         const {paneMethods,modalMethods} =  this.normyDep(paneIndex + 1,this)
                //         this.$store.state.pane[paneIndex + 1].paneConfig.paneOnLoad(paneMethods,modalMethods)
                //     })
                // ])
            }
            
        }
    }


    return i[`private.${method}`]
}