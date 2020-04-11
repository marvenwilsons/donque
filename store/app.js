export const state = () => ({
    /** App Admin State */
        'app-admin-name': null,
        'app-name': null,
        'app-admin-resources': null,
    /** ----- */
    /** App Side bar state */
        'app-admin-sidebar-items': [
            'Dashboard',
            'Pages',
            'Collections',
            'Files',
            'Office',
            'Marketplace'
        ],
        'active-sidebar-item': 'Dashboard',
    /** ----- */
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
}