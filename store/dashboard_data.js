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
    app_theme: undefined
})

export const mutations = {
    set_admin_data(state, { title, username, adminName, email, resources, theme }) {           
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
    async set_admin_data({commit},context) {
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
                    alert("Error while initializing admins dashboard");
                }
            });

        commit('set_admin_data', sdata)
        this.commit('theme/load_theme', sdata)
    }
}