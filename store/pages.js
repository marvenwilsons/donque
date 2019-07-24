export const state = () => ({

    // routing sample
    route: undefined,
    // route contents
    route_contents: {},

    // recur
    recur: 0,

    root: undefined
})

export const getters = {
    routes: state => state.route
}

export const mutations = {
    set_route(state,data) {
        state.route = data
        // console.log('setting route')
    },
    set_recur(state,data) {
        state.recur = state.recur + 1
    },
    set_root(state,data) {
        console.log('setting root'),
        console.log(data)
        state.root = data
    }
}
export const actions = {
    update_root({ commit, state }, context){
        this.dispatch("systemCall", {
            command: "getPage",
            section: "pageMethods",
            data: {
                path: context
            },
            method: "post"
        }).then(({ status, data }) => {
            if (status) {
                console.log('yeeehaa!')
                commit('set_root', data.data)
            } else {
                this.commit("modal/set_modal", {
                    head: "Error while fetching editor data",
                    body: data.msg,
                    config: {
                        ui_type: "err",
                        closable: false
                    }
                });
            }
        });
    },
    get_routes({commit}){
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