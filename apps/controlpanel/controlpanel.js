import templates from '@/templates'
import utils from '@/utils'

export default function (app) {
    const controlpanel = {}
    controlpanel.actions = {}
    controlpanel.actions.syspane = {}
    controlpanel.actions.syspane.modal = {}
    controlpanel.actions.sysmodal = {}
    controlpanel.actions.dwin = {}
    controlpanel.settings = {}

    controlpanel.onAdminLoad = function() {
        // set current view to pane system
        app.$store.commit('app/stateController', {
            key: 'app-current-view',
            value: 'paneSystem'
        })
    }

    controlpanel.onAdminMount = function() {
        // set default active menu and spawn defualt pane
        controlpanel.actions.syspane.switchMenu(app.$store.state.app['defualt-active'])
    }

    controlpanel.onAdminLogin = function (username, password, db) {
        // reach database for admin resource here, app code executes in the server

        // db.storedFunctions.getAdminServices(username,password)
        // .then(res => {
        //     /**
        //      * returns
        //      * token,services,admiName,siteName
        //      */
        // })
    }

    // syspane init functions

    controlpanel.actions.syspane.switchMenu = function(selectedMenu) {
        // console.log('> switchMenu')
        /** emptying the pane array [done] */
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
        const serviceData = controlpanel.actions.syspane.getInitialData(selectedMenu)
        const serviceDataToPaneObject = controlpanel.actions.syspane.getServiceView(serviceData)
        controlpanel.actions.syspane.addsync(serviceDataToPaneObject)
    }

    controlpanel.actions.syspane.getInitialData = function (serviceName) {
        // console.log('> controlpanel - getInitialData')
        return app.$store.state.app['app-services'][serviceName].data
    }

    // syspane pane delete functions

    controlpanel.actions.syspane.delete = function(paneIndexOrigin) {
        return new Promise((resolve) => {
            if(!paneIndexOrigin) {
                app.systemError(`dseleteSync Error: paneIdnexOrigin cannot be undefined`)
            } else {
                app.$store.commit('paneDelete', {
                    paneIndexOrigin: paneIndexOrigin
                })
                setTimeout(() => {
                    resolve(app.$store.state.pane)
                }, 0);
            }

        })
    }

    controlpanel.actions.syspane.deleteSync = function( paneIndexOrigin ) {
        if(!paneIndexOrigin) {
            app.systemError(`dseleteSync Error: paneIdnexOrigin cannot be undefined`)
        } else {
            app.$store.commit('paneDelete', {
                paneIndexOrigin: paneIndexOrigin
            })
        }
    }


    // syspane update functions

    controlpanel.actions.syspane.updatePane = function (paneIndex, serviceObject) {
        return new Promise((resolve) => {
            app.$store.commit('paneUpdate', {
                paneIndex: paneIndex,
                payload: serviceObject
            })
            setTimeout(() => {
                resolve(app.$store.state.pane[paneIndex])
            }, 0);
        })
    }

    controlpanel.actions.syspane.updatePaneSync = function (paneIndex, serviceObject) {
        app.$store.commit('paneUpdate', {
            paneIndex: paneIndex,
            payload: serviceObject
        })
    }

    controlpanel.actions.syspane.updatepPaneView = function(paneIndex,viewIndex) {
        return new Promise((resolve) =>  {
            app.$store.commit('paneUpdateView', {
                paneIndex,
                viewIndex
            })
            setTimeout(() => {
                resolve(app.$store.state.pane[paneIndex])
            }, 0);
        })
    }

    controlpanel.actions.syspane.updatepPaneViewSync = function(paneIndex,viewIndex) {
        app.$store.commit('paneUpdateView', {
            paneIndex,
            viewIndex
        })
    }

    controlpanel.actions.syspane.updatePaneData = function(paneIndex,paneData,targetKey) {
        app.$store.commit('paneUpdateData', {
            paneIndex,
            paneData,
            targetKey
        })
    }

    controlpanel.actions.syspane.mirrorParentPaneData = function(paneIndex) {

    }

    // syspane modal functions

    controlpanel.actions.syspane.prompt = function (paneIndex,promptObject,fn) {
        const types = ['string','number','select','multiselect','slider', 'minmax', 'password']

            if(promptObject != undefined) {
                if(types.indexOf(promptObject.type) != -1) {
                    // string
                    if(promptObject.type === 'string') {
                        if(typeof promptObject.value == 'string' || promptObject.value == null || promptObject.value == undefined) {
                           controlpanel.actions.syspane.modal.close(paneIndex).then(() => {
                                app.$store.commit('paneModalOverwrite', {
                                    paneIndex,
                                    modalObject: new templates.paneModal({
                                        modalBody: 'logPrompt',
                                        modalHeader: promptObject.header,
                                        isClosable: promptObject.isClosable,
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
                            app.systemError(`panePrompt Error: in second argument, Invalid value type default value type, 
                            it should be a string but got a type of ${typeof promptObject.value}`)
                        }
    
                    }
                    // number
                    if(promptObject.type === 'number') {
                        // value can be undefined and default value
                        if(promptObject.value || promptObject.defaultValue) {
                            if(typeof promptObject.value == 'number' || typeof promptObject.defaultValue == 'number') {
                               controlpanel.actions.syspane.modal.close(paneIndex).then(() => {
                                    app.$store.commit('paneModalOverwrite', {
                                        paneIndex,
                                        modalObject: new templates.paneModal({
                                            modalBody: 'logPrompt',
                                            modalHeader: promptObject.header,
                                            isClosable: promptObject.isClosable,
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
                                app.systemError(`panePrompt Error: in second argument, Invalid value or default value type, 
                                it should be a number but got ${typeof promptObject.value == undefined || typeof promptObject.value == null ? 'undefined' :
                                 `a type of \n (value: ${typeof promptObject.value}) \n (default value: ${typeof promptObject.defaultValue})` }`)
                            }
                        } else {
                           controlpanel.actions.syspane.modal.close(paneIndex).then(() => {
                                app.$store.commit('paneModalOverwrite', {
                                    paneIndex,
                                    modalObject: new templates.paneModal({
                                        modalBody: 'logPrompt',
                                        modalHeader: promptObject.header,
                                        isClosable: promptObject.isClosable,
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
                                        app.systemError(`panePrompt Error: Invalid defaultValue type, defaultValue should be a type of string`)
                                        if(!promptObject.value.includes(promptObject.defaultValue)) {
                                            app.systemError(`panePrompt Error: Cannot find "${promptObject.defaultValue}" in value's array`)
                                        } 
                                    }
                                }
                            }
                            if(Array.isArray(promptObject.value) ){
                               controlpanel.actions.syspane.modal.close(paneIndex).then(() => {
                                    app.$store.commit('paneModalOverwrite', {
                                        paneIndex,
                                        modalObject: new templates.paneModal({
                                            modalBody: 'logPrompt',
                                            modalHeader: promptObject.header,
                                            isClosable: promptObject.isClosable,
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
                                app.systemError(`panePrompt Error: in second argument, Invalid select value type, it should be an array but got a type of ${typeof promptObject.value}`)
                            }
                        } else {
                            app.systemError(`panePrompt Error: in second argument, value cannot be undefined`)
                        }

                    }
                    // multiselect
                    if(promptObject.type === 'multiselect') {
                        if(!promptObject.value) {
                            app.systemError('panePrompt Error: type multiselect value property cannot be undefined or null')
                        } else if(promptObject.defaultValue) {
                            if(!Array.isArray(promptObject.defaultValue)) {
                                app.systemError('panePrompt Error; Invalid defaultValue type, should be an array of string values')
                            } else {
                                promptObject.defaultValue.map(e => {
                                    if(!promptObject.value.includes(e)) {
                                        app.systemError(`panePrompt Error: Cannot find ${e} in values array`)
                                    }
                                })
                            }
                           controlpanel.actions.syspane.modal.close(paneIndex).then(() => {
                                app.$store.commit('paneModalOverwrite', {
                                    paneIndex,
                                    modalObject: new templates.paneModal({
                                        modalBody: 'logPrompt',
                                        modalHeader: promptObject.header,
                                        isClosable: promptObject.isClosable,
                                        modalConfig: {
                                            value: promptObject.value,
                                            fn: fn ? fn : function() {},
                                            type: 'multiselect',
                                            defaultValue: promptObject.defaultValue ? promptObject.defaultValue : []
                                        }
                                    })
                                })
                            })
                        } else {
                            controlpanel.actions.syspane.modal.close(paneIndex).then(() => {
                                app.$store.commit('paneModalOverwrite', {
                                    paneIndex,
                                    modalObject: new templates.paneModal({
                                        modalBody: 'logPrompt',
                                        modalHeader: promptObject.header,
                                        isClosable: promptObject.isClosable,
                                        modalConfig: {
                                            value: promptObject.value,
                                            fn: fn ? fn : function() {},
                                            type: 'multiselect',
                                            defaultValue: promptObject.defaultValue ? promptObject.defaultValue : []
                                        }
                                    })
                                })
                            })
                        }
                    }
                    // slider
                    if(promptObject.type === 'slider') {
                        if(!promptObject.value) {
                            app.systemError('panePrompt Error: value cannot be undefined or null')
                        } else if( Object.keys(promptObject.value).toString() != 'min,max' ) {
                            app.systemError('panePrompt Error: Invalid value properties for slider.')
                        } else if(promptObject.defaultValue) {
                            if(promptObject.defaultValue < promptObject.value.min ) {
                                app.systemError(`panePrompt Error: defaultValue in slider cannot be lesser than ${promptObject.value.min}`)
                            } else if(promptObject.defaultValue > promptObject.value.max) {
                                app.systemError(`panePrompt Error: defaultValue in slider cannot be greater than ${promptObject.value.max}`)
                            } else {
                               controlpanel.actions.syspane.modal.close(paneIndex).then(() => {
                                    app.$store.commit('paneModalOverwrite', {
                                        paneIndex,
                                        modalObject: new templates.paneModal({
                                            modalBody: 'logPrompt',
                                            modalHeader: promptObject.header,
                                            isClosable: promptObject.isClosable,
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
                           controlpanel.actions.syspane.modal.close(paneIndex).then(() => {
                                app.$store.commit('paneModalOverwrite', {
                                    paneIndex,
                                    modalObject: new templates.paneModal({
                                        modalBody: 'logPrompt',
                                        modalHeader: promptObject.header,
                                        isClosable: promptObject.isClosable,
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
                            app.systemError('panePrompt Error: value cannot be undefined or null')
                        } else if( Object.keys(promptObject.value).toString() != 'min,max' ) {
                            app.systemError('panePrompt Error: Invalid value properties for minmax.')
                        }  else if(promptObject.defaultValue) {
                            if(!Array.isArray(promptObject.defaultValue)) {
                                app.systemError('panePrompt Error: Invalid defaultValue type')
                            } else {
                                controlpanel.actions.syspane.modal.close(paneIndex).then(() => {
                                    app.$store.commit('paneModalOverwrite', {
                                        paneIndex,
                                        modalObject: new templates.paneModal({
                                            modalBody: 'logPrompt',
                                            modalHeader: promptObject.header,
                                            isClosable: promptObject.isClosable,
                                            modalConfig: {
                                                value: {
                                                    min: promptObject.value.min,
                                                    max: promptObject.value.max
                                                },
                                                fn: fn ? fn : function() {},
                                                type: 'minmax',
                                                defaultValue: promptObject.defaultValue ? promptObject.defaultValue : [0,0] 
                                            }
                                        })
                                    })
                                })
                            }
                        } else {
                           controlpanel.actions.syspane.modal.close(paneIndex).then(() => {
                                app.$store.commit('paneModalOverwrite', {
                                    paneIndex,
                                    modalObject: new templates.paneModal({
                                        modalBody: 'logPrompt',
                                        modalHeader: promptObject.header,
                                        isClosable: promptObject.isClosable,
                                        modalConfig: {
                                            value: {
                                                min: 0,
                                                max: 100
                                            },
                                            fn: fn ? fn : function() {},
                                            type: 'minmax',
                                            defaultValue: promptObject.defaultValue ? promptObject.defaultValue : [0,0] 
                                        }
                                    })
                                })
                            })
                        }
                    }
                    // password
                    if(promptObject.type === 'password') {
                       controlpanel.actions.syspane.modal.close(paneIndex).then(() => {
                            app.$store.commit('paneModalOverwrite', {
                                paneIndex,
                                modalObject: new templates.paneModal({
                                    modalBody: 'logPrompt',
                                    modalHeader: promptObject.header,
                                    isClosable: promptObject.isClosable,
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
                    app.systemError(`panePrompt Error: in second argument Invalid type: "${promptObject.type}"`)
                }
            } else {
                app.systemError('panePrompt Error: in second argument Invalid promptObject')
            }

            if(promptObject.info) {
                controlpanel.actions.syspane.modal.appendInfoMsg(paneIndex,promptObject.info)
            } else if(promptObject.error) {
                controlpanel.actions.syspane.modal.appendErrorMsg(paneIndex,promptObject.error)
            }
    }

    controlpanel.actions.syspane.close = function (paneIndex) {
        if(app.$store.state.pane.length == 1){
            controlpanel.actions.syspane.switchMenu(app.$store.state.app['defualt-active'])
        } else {
            controlpanel.actions.syspane.delete(paneIndex)
        }
    }

    // syspane render functions

    controlpanel.actions.syspane.getServiceView = function (dataSet,viewIndex) {
        // returns a service objects
        const {views} = app.$store.state.app['app-services'][app.$store.state.app['active-sidebar-item']]
        const deserializeViews = new Function('return ' + views)()
        const helper = {  /** app for global access, if you use app, you have to provide a paneIndex, or if not all panes will be affected */
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
            getCurrentPaneIndex: app.paneIndex,
            sysmodal: controlpanel.actions.sysmodal
        }
        
        // dependency enject the views function
        const serviceObject = deserializeViews(dataSet,helper,utils,templates)

        if(!serviceObject) {
            app.systemError('getServiceView error: Unhandled dataSet in service views, cannot find a service view, check console log for more details')
        } else {
            // Problem start here, the data will be incorrect starting on a non zero index pane
            const { componentConfig, paneConfig, paneOnLoad, onModalData, onEvent } = serviceObject
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
            paneConfig.onEvent = onEvent

            if(typeof viewIndex == 'number') {
                if(paneConfig.paneViews[viewIndex] == undefined) {
                    app.systemError(`System Error: Invalid index value in render method, value: ${viewIndex} \n Cannot set pane view of undefined, reverting to 0 index pane view`)
                } else {
                    paneConfig.defaultPaneView = viewIndex
                }
            }
            return { componentConfig, paneConfig }
        }
    }

    controlpanel.actions.syspane.render = function (dataSet,paneIndex,viewIndex) {
        controlpanel.actions.syspane.renderPane(
                controlpanel.actions.syspane.getServiceView(dataSet,viewIndex),paneIndex,viewIndex
            )
    }

    controlpanel.actions.syspane.renderPane = function (data, paneIndex,viewIndex) {
        if(paneIndex == undefined || paneIndex == null) {
            app.systemError('renderPane error, paneIndex cannot be undefined')
            return
        }
        const { actions } = app.controls


        // console.log('helper',paneIndex, this.$store.state.pane.length - 1)
        if(app.$store.state.pane[paneIndex + 1] == undefined) {
            // console.log('> renderPane Case1')
            /** it means add one pane */ /** add before render here  */
            actions.syspane.addsync(data)
        } else {
            /** it means update the paneData? or replace the pane with a new view  */
            if(paneIndex + 1 == app.$store.state.pane.length - 1) {
                // console.log('> renderPane Case2')
                controlpanel.actions.syspane.updatePane(
                    paneIndex + 1, 
                    controlpanel.actions.syspane.getServiceView(data.paneConfig.paneData,viewIndex)
                ).then(() => {
                    const {syspane,syspanemodal, dwin} =  app.normyDep(paneIndex + 1,app)
                    app.$store.state.pane[paneIndex + 1].paneConfig.paneOnLoad(syspane,syspanemodal, dwin)
                    app.autoScroll()
                })
            } else {
                // console.log('> renderPane Case3', paneIndex)
                // when the pane origin is further down index from the last pane
                controlpanel.actions.syspane.delete(paneIndex + 1)
                .then(() => {
                    controlpanel.actions.syspane.add(data)
                    .then(() => {
                        const {syspane,syspanemodal, dwin} =  app.normyDep(paneIndex + 1,this)
                        app.$store.state.pane[paneIndex + 1].paneConfig.paneOnLoad(syspane,syspanemodal, dwin)
                    })
                })
            }
            
        }
    }

    controlpanel.actions.syspane.add = function(serviceObject) {
        // console.log('> controlpanel - add')
        return new Promise((resolve,reject) => {
            if(!serviceObject.componentConfig || !serviceObject.paneConfig) {
                app.systemError('Invalid pane object')
            } else {
                app.$store.commit('paneAdd', {
                    payload: serviceObject
                })
                if(JSON.stringify(app.$store.state.pane[app.$store.state.pane.length- 1]) ==  JSON.stringify(serviceObject)){
                    resolve(app.$store.state.pane)
                }
            }
        })

    }

    controlpanel.actions.syspane.addsync = function(serviceObject) {
        // console.log('> controlpanel - addsync')
        if(!serviceObject.componentConfig || !serviceObject.paneConfig) {
            app.systemError('Invalid pane object')
        } else {
            app.$store.commit('paneAdd', {
                payload: serviceObject
            })
        }
    }

    // syspane modal

    controlpanel.actions.syspane.modal.update = function (paneIndex, payload) {
        return new Promise(resolve => {
            if(typeof payload === 'object') {
                app.$store.commit('paneModalUpdate', {
                    paneIndex,
                    ...payload
                })
            } else {
                app.$store.commit('paneModalUpdate', {
                    paneIndex,
                    payload
                })
            }

            setTimeout(() => {
                resolve(app.$store.state.pane[paneIndex] )
            }, 0);
        })
    }

    controlpanel.actions.syspane.modal.updateSync = function (paneIndex, mode) {
        app.$store.commit('paneModalUpdate', {
            paneIndex,
            payload: mode
        })
    }

    controlpanel.actions.syspane.modal.close = function (paneIndex) {
        return controlpanel.actions.syspane.modal.update(paneIndex,'closeModal')
    }

    controlpanel.actions.syspane.modal.appendErrorMsg = function (paneIndex,msg) {
        controlpanel.actions.syspane.modal.update(paneIndex,{
            payload: {
                key: 'modalInfo',
                value: undefined
            }
        }).then(() => {
            controlpanel.actions.syspane.modal.update(paneIndex,{
                payload: {
                    key: 'modalErr',
                    value: msg
                }
            })
        })
    }

    controlpanel.actions.syspane.modal.appendInfoMsg = function (paneIndex,msg) {
        controlpanel.actions.syspane.modal.update(paneIndex,{
            payload: {
                key: 'modalErr',
                value: undefined
            }
        }).then(() => {
            controlpanel.actions.syspane.modal.update(paneIndex,{
                payload: {
                    key: 'modalInfo',
                    value: msg
                }
            })
        })
    }

    controlpanel.actions.syspane.modal.logError = function (paneIndex,msg, fn) {
        controlpanel.actions.syspane.modal.close(paneIndex)
        .then(() => {
            app.$store.commit('paneModalOverwrite', {
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
    }

    controlpanel.actions.syspane.modal.logInfo = function (paneIndex,msg, fn) {
        controlpanel.actions.syspane.modal.close(paneIndex).then(() => {
            app.$store.commit('paneModalOverwrite', {
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
    }
 
    controlpanel.actions.syspane.modal.logWarn = function (paneIndex,msg,fn) {
        controlpanel.actions.syspane.modal.close(paneIndex).then(() => {
            app.$store.commit('paneModalOverwrite', {
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
    }

    // sysmodal
    
    controlpanel.actions.sysmodal.spawn = function ({modalType, modalPayload}) {
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

    controlpanel.actions.sysmodal.closeModal = function (cb) {
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
        app.$store.commit('stateController', {
            key: 'loading-msg',
            value: null
        })
        if(cb) {
            setTimeout(() => {
                cb()
            }, 0);
        }
    }

    controlpanel.actions.sysmodal.ask = function ({question, truthy, falsey},cb) {
        controlpanel.actions.sysmodal.spawn({
            modalType: 'boolean',
            modalPayload: {
                truthy,
                falsey,
                question,
                cb,
                closeModal: controlpanel.actions.sysmodal.closeModal
            }
        })
    }

    controlpanel.actions.sysmodal.prompt = function ({type,defaultValue,placeholder,label,err, onSubmit, onCancel}) {
        controlpanel.actions.sysmodal.spawn({
            modalType: 'prompt',
            modalPayload: {
                type,
                defaultValue,
                placeholder,
                label,
                err,
                onSubmit,
                onCancel,
                closeModal: controlpanel.actions.sysmodal.closeModal
            }
        })
    }

    controlpanel.actions.sysmodal.select = function ({options,defaultValue, label, err,onSubmit,onCancel}) {
        controlpanel.actions.sysmodal.spawn({
            modalType: 'select',
            modalPayload: {
                options,
                defaultValue,
                label,
                err,
                onSubmit,
                onCancel,
                closeModal: controlpanel.actions.sysmodal.closeModal
            }
        })
    }

    controlpanel.actions.sysmodal.loginfo = function (msg) {
        controlpanel.actions.sysmodal.spawn({
            modalType: 'loginfo',
            modalPayload: {
                msg
            }
        })
    }

    controlpanel.actions.sysmodal.logerr = function(msg, cb) {
        controlpanel.actions.sysmodal.spawn({
            modalType: 'logerr',
            modalPayload: {
                msg,
                cb
            }
        })
    }

    controlpanel.actions.sysmodal.loading = function(payload) {
        controlpanel.actions.sysmodal.spawn({
            modalType: 'loading',
            modalPayload: {
                payload,
                closeModal: controlpanel.actions.sysmodal.closeModal
            }
        })
    }

    // dwin

    controlpanel.actions.dwin.spawn = function (dWinObject, cb) {
        if(!dWinObject.section || !dWinObject.winView || !dWinObject.viewConfig || !dWinObject.data) {
            app.systemError('dwinSpawn Error: Cannot spawn dWin Invalid dWinObject or has missing properties')
        } else {
            const {section, winView, viewConfig, winConfig, data} = dWinObject
            if(winConfig) {
                if(!winConfig.height) {
                    winConfig.height = '100%'
                }
            }
            app.$store.commit('stateController', {
                key: ((section) => {
                    if(section === 'top') {
                        return 'dWinTop'
                    } else if(section === 'right') {
                        return 'dWinRight'
                    } else {
                        app.systemError('dwinSpawn Error: Invalid dWin section')
                    }
                })(section),
                value: { winView, viewConfig, data, winConfig, cb, close: controlpanel.actions.dwin.close  }
            })
        }
    }

    controlpanel.actions.dwin.close = function (section) {
        app.$store.commit('stateController',{
            key: ((section) => {
                if(section === 'top') {
                    return 'dWinTop'
                } else if(section === 'right') {
                    return 'dWinRight'
                } else {
                    app.systemError('dwinClose Error: Invalid dWin section')
                }
            })(section),
            value: undefined
        })
    }
    
    return controlpanel
}