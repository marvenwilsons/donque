import templates from '@/templates'

export default function (app) {
    const controlpanel = {}
    controlpanel.actions = {}
    controlpanel.actions.syspane = {}
    controlpanel.actions.syspane.modal = {}
    controlpanel.actions.sysmodal = {}
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
        // reach database for admin resource here, this code executes in the server

        // db.storedFunctions.getAdminServices(username,password)
        // .then(res => {
        //     /**
        //      * returns
        //      * token,services,admiName,siteName
        //      */
        // })
    }

    // syspane

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
        const serviceDataToPaneObject = app.getServiceView(serviceData)
        controlpanel.actions.syspane.addsync(serviceDataToPaneObject)
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
        console.log('> controlpanel - addsync')
        if(!serviceObject.componentConfig || !serviceObject.paneConfig) {
            app.systemError('Invalid pane object')
        } else {
            app.$store.commit('paneAdd', {
                payload: serviceObject
            })
            console.log(app.$store.state.pane)
        }
    }

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

    controlpanel.actions.syspane.getInitialData = function (serviceName) {
        console.log('> controlpanel - getInitialData')
        return app.$store.state.app['app-services'][serviceName].data
    }

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
                           controlpanel.actions.syspane.modal.close(paneIndex).then(() => {
                                app.$store.commit('paneModalOverwrite', {
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
                            app.systemError('panePrompt Error: value cannot be undefined or null')
                        } else if( Object.keys(promptObject.value).toString() != 'min,max' ) {
                            app.systemError('panePrompt Error: Invalid value properties for minmax.')
                        }  else if(promptObject.defaultValue) {
                           controlpanel.actions.syspane.modal.close(paneIndex).then(() => {
                                app.$store.commit('paneModalOverwrite', {
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
                           controlpanel.actions.syspane.modal.close(paneIndex).then(() => {
                                app.$store.commit('paneModalOverwrite', {
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
                       controlpanel.actions.syspane.modal.close(paneIndex).then(() => {
                            app.$store.commit('paneModalOverwrite', {
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
                    app.systemError(`panePrompt Error: in second argument Invalid type: "${promptObject.type}"`)
                }
            } else {
                app.systemError('panePrompt Error: in second argument Invalid promptObject')
            }

            if(promptObject.info) {
                controlpanel.actions.syspane.modal.appendInfoMsg(paneIndex,promptObject.info)
            }
    }

    controlpanel.actions.syspane.close = function (paneIndex) {
        if(app.$store.state.pane.length == 1){
            controlpanel.actions.syspane.switchMenu(app.$store.state.app['defualt-active'])
        } else {
            controlpanel.actions.syspane.delete(paneIndex)
        }
    }

    // syspane modal

    controlpanel.actions.syspane.modal.update = function (paneIndex, mode) {
        return new Promise(resolve => {
            app.$store.commit('paneModalUpdate', {
                paneIndex,
                payload: mode
            })
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
                value: msg
            }
        }).then(() => {
            controlpanel.actions.syspane.modal.update(paneIndex,{
                payload: {
                    key: 'modalInfo',
                    value: undefined
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

    controlpanel.actions.sysmodal.logerr = function(msg) {
        controlpanel.actions.sysmodal.spawn({
            modalType: 'logerr',
            modalPayload: {
                msg
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

    controlpanel.actions.dwin.spawn = function (dWinObject) {
        if(!dWinObject.section || !dWinObject.winView || !dWinObject.viewConfig || !dWinObject.data) {
            app.systemError('dwinSpawn Error: Cannot spawn dWin Invalid dWinObject or has missing properties')
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
    }

    controlpanel.actions.dwin.close = function () {
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