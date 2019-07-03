export const state = () => ({

    // routing sample
    route: undefined,
    // route contents
    route_contents: {}
})

export const mutations = {
    set_route(state,data) {
        state.route = data
        console.log('setting route')
    }
}
export const actions = {
    get_routes({commit,state},context){
        this.dispatch('systemCall', {
            command: "getAllRoutes",
            section: "pageMethods",
            username: localStorage.getItem("username"),
            token: localStorage.getItem("auth"),
            method: "get"
        })
            .then(data => {                
                if (data.status){
                    commit('set_route', data.data.actions[0].contents)
                } else {
                    this.commit("modal/set_modal", {
                        head: "Error while fetching all routes",
                        body: data.data.msg,
                        config: {
                            ui_type: "prompt_err",
                            closable: false
                        }
                    });
                }   
            })
            .catch(err => {
                this.commit("modal/set_modal", {
                    head: "Page error",
                    body: err,
                    config: {
                        ui_type: "prompt_err",
                        closable: false
                    }
                });
            });
    }
}