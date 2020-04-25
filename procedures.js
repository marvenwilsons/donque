import templates from './templates'

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
        // console.log('> all task done')
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
    i['private.sidebar.switch-menu'] = function ({selectedMenu}) {
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
        /** move to next */
        app.answerPending()
    }
    // pane system
    i['private.syspane.add'] = function ({paneIndex, payload}) {
        // payload.onEmptyData()
        if(app.$store.state.pane.length == 0) {
            const deserializeViews = new Function('return ' + payload.views)()
            const unpacked = deserializeViews(payload.data)
            // console.log('lakjsih',unpacked)
            app.$store.commit('paneAdd', {
                paneIndex: paneIndex,
                payload: {
                    ...unpacked.paneConfig,
                    paneData: payload.data,
                    views: payload.views
                }
            })
        } else {
            //TODO: implement adding new pane from 0 index pane
            console.log('> CODE IT!', paneIndex,payload.paneConfig)
            // const { paneConfig, paneView, paneName, paneWidth, isClosable } = payload.paneConfig
            if(app.$store.state.pane[ paneIndex + 1] == undefined) {
                app.$store.commit('paneAdd', {
                    paneIndex: paneIndex,
                    payload: {
                        ...payload.paneConfig,
                        ...payload
                    }
                })
            } else {
                i['private.syspane.update-data']({paneIndex: paneIndex + 1, paneData: payload.paneConfig.paneData})
            }
            
        }
        
        app.answerPending()
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
    i['private.syspane.update-view'] = function ({paneIndex,paneView}) {
        app.$store.commit('paneUpdateData', {
            paneIndex: paneIndex,
            paneView: paneView
        })
        app.answerPending('--done--')
    }
    i['private.syspane.get-pane-data'] = function ({paneIndex, payload}) {
        if(app.$store.state.app['app-admin-resources']){
            // console.log('> getting pane data', payload.section)
            app.$store.state.app['app-services'].map(serviceItem => {
                if(serviceItem.name === payload.section) {
                    app.answerPending({
                        statusCode: 200,
                        status: true,
                        payload: serviceItem
                    })
                }
            })
        } else {
            setTimeout(() => {
                app.answerPending({
                    statusCode: 200,
                    status: true,
                    payload: 'test payload'
                })
            }, 500);
        }
    }


    return i[`private.${method}`]
}