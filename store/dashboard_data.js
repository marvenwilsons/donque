export const state = () => ({
    // themes
    themes: undefined, // list of all themes

    // admin related
    admin_resource: undefined, // list of admin resource
    admin_name: undefined,
    admin_title: undefined,
    admin_email: undefined,
    admin_username: undefined,
    admin_theme: undefined,

    // app related
    app_site_title: undefined,
    app_theme: undefined,

    // status
    dashboard_ready: false
})

export const getters = {
    dashboard_ready: state => state.dashboard_ready
}

export const mutations = {
    set_admin_data(state, { title, username, adminName, email, resources, theme }) {      
        state.dashboard_ready = true

        state.title = title
        state.admin_name = adminName
        state.resources = resources
        state.admin_email = email
        state.admin_username = username
        state.admin_theme = theme
    }
}

export const actions = {
    /**
     * This action is invoke on admin layout on mounted hook
     */
    async set_admin_data({commit,state},context) {
        const sdata = await this.$axios
            .$post("/dqapp/_dq", {
                command: "initActorsDashboard",
                section: "adminMethods",
                username: context.username,
                token: context.token
            })
            .then(serverData => {
                if (serverData.status) {
                    return serverData.data.actions[0].content;
                } else {
                    this.$store.commit("modal/set_modal", {
                        head: "Connection error",
                        body: "Error while initializing admins dashboard, server resource cannot be reach.",
                        config: {
                            ui_type: "msg",
                            closable: false
                        }
                    });
                }
            });

        setTimeout(() => {
            commit('set_admin_data', sdata)
            console.log(sdata)
            this.commit('theme/load_theme', sdata)
        },100)
    }
}