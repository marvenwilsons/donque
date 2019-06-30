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
        // systemCall
        setTimeout(() => {
            commit('set_route',{
                home: {},
                products: {
                    _id: {}
                },
                services: {
                    service1: {},
                    service2: {},
                    service3: {
                        scope: {},
                        scope1: {},
                        scope2: {
                            insider: {},
                            insider2: {}
                        },
                    }
                },
                team: {
                    devs: {},
                    directors: {}
                },
                portfolio: {}
            })
        }, 100);
    }
}