export const state = () => ({
    /** App Admin State */
        'app-admin-name': null,
        'app-name': null,
        'app-admin-resources': {},
        'app-current-view': null,
        'app-current-resource': null,
    /** ----- */
    /** App Side bar state */
        'app-admin-sidebar-items': [],
        'active-sidebar-item': null,
        'defualt-active': '',
    /** ----- */
        'app-services': {},
        'loading-msg': null,

    systemRoutes: [
        '/dqlogin',
        '/dqadmin',
        '/dqinit',
    ],
})

export const mutations = {
    stateController(state,payload) {
        state[payload.key] = payload.value
    },
    addAppService(state,payload) {
        // console.log('> addAppService')
        state['app-services'][payload.name] = payload
    },
    addMenu(state,payload) {
        state['app-admin-sidebar-items'].push(payload)
    }
}