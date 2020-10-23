
export function onAdminLogin_client(client, payload) {
    // TODO system events
    // db gives you postgress functions
    // server gives you the system nodejs sever ralated functions
    // client gives you the client function like local storage functions

    // const {axios} = client
    // perform get request using axios, with username and password
    // hash the payload before sending request to server
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