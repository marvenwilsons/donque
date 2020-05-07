export default function (app) {
    const controlpanel = {}
    controlpanel.actions = {}
    controlpanel.actions.syspane = {}
    controlpanel.actions.sysmodal = {}

    controlpanel.onAdminDashboardLoad = (controlpanel) => {
        // set current view to pane system
        app.$store.commit('app/stateController', {
            key: 'app-current-view',
            value: 'paneSystem'
        })
        // set default active menu and spawn defualt pane

    }

    // syspane

    controlpanel.actions.syspane.switchMenu = function(selectedMenu) {
        console.log('> switchMenu')
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
        console.log('> controlpanel - add')
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

    controlpanel.actions.syspane.paneModalUpdate = function (paneIndex, mode) {
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

    controlpanel.actions.syspane.paneModalUpdateSync = function (paneIndex, mode) {
        app.$store.commit('paneModalUpdate', {
            paneIndex,
            payload: mode
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

    controlpanel.actions.sysmodal.closeModal = function () {
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
    }

    controlpanel.actions.sysmodal.ask = function ({question, truthy, falsey}) {
        controlpanel.actions.sysmodal.spawn({
            modalType: 'boolean',
            modalPayload: {
                truthy,
                falsey,
                question
            }
        })
    }

    controlpanel.actions.sysmodal.prompt = function ({type,defaultValue,placeholder,label,err}) {
        controlpanel.actions.sysmodal.spawn({
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

    controlpanel.actions.sysmodal.select = function ({options,defaultValue, label, err}) {
        controlpanel.actions.sysmodal.spawn({
            modalType: 'select',
            modalPayload: {
                options,
                defaultValue,
                label,
                err
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

    controlpanel.actions.sysmodal.loading = function({msg}) {
        controlpanel.actions.sysmodal.spawn({
            modalType: 'loading',
            modalPayload: {
                msg
            }
        })
    }
    
    return controlpanel
}