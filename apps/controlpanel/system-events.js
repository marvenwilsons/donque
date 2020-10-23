
export async function onAdminLogin_client(d,commit,state) {
    // TODO system events
    // db gives you postgress functions
    // server gives you the system nodejs sever ralated functions
    // client gives you the client function like local storage functions

    // const {axios} = client
    // perform get request using axios, with username and password
    // hash the payload before sending request to server

    // get services
    const service = await d.$axios
    .get('/$dqappservices/service', {
        // TODO: 1
        params: {
          username: 'marvenwilsons', // TODO: get from localstorage
          apikey: 'test' // TODO: get from localstorage
        }
    })
    .then(({data}) => {
        return data.response
    })
    .catch(err => {
        console.log('> err',err.message)
    })

    const unPackServices = ((s) => s.map(service => JSON.parse(service)))(service)

    // set menu items
    unPackServices.map(items => {
        commit('app/addAppService', items)
        commit('app/addMenu', items.name)
    })
    
    // assign default active menu
    if(!state.app['defualt-active']) {
        commit('app/stateController', {
            key: 'defualt-active',
            value: state.app['app-admin-sidebar-items'][0]
        })
    }
}

export function onAdminLogin_server(postgress, server, payload) {
    // hashed payload usename and password has been received
    // cifer hashed payload
    // reach postgress.storedFunctions.adminLogin(ciferedPayload)
}

export function onAdminLogout_client(client) {

}

export function onAdminLogout_server(db, server) {

}

export function beforePublicRouteGetRequest(routeName) {
    // get page contents, get page navigation guards
}

export function afterPublicRouteGetRequest() {

}

export default {
    onAdminLogin_client,
    onAdminLogin_server,
    onAdminLogout_client,
    onAdminLogout_server,
    beforePublicRouteGetRequest,
    afterPublicRouteGetRequest
}