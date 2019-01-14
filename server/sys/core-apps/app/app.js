const dbAgent = require('./db-agent')

function App(username, password, token, tokenlife, action, section) {
    let response = {}

    // a. app is initailized?
    const appIsInit = () => {

    }

    // b.
    const getUser = (username,password,token,tokenlife) => {
        // read to db
        dbAgent
            .readFrom(dbAgent.mainDb, 'temp')
            .then(data => {
                
            })

        let user = {
            status: false,
            actions: []
        }
    }

    //
    const getUserActions = () => {

    }

    //
    const taskCanAlterDb = () => {

    }

    //
    const askPassword = () => {

    }

    const executeTask = () => {

    }
    let temp = undefined

    return {
        username,
        password,
        token,
        tokenlife,
        section,
        action,

        start() {
            // b
            const user = getUser(username, password, token, tokenlife)
            const task = `${action}/${section}`

            // a
            if (user.status) {
                // c
                if (user.actions.indexOf(task) != -1) {
                    // d
                    if (taskCanAlterDb(task)) {
                        temp = task
                        // e
                        if (askPassword()) {
                            // f.a
                            executeTask(temp)
                        } else {
                            response.status = false
                            response.message = 'Password Invalid'
                        }
                    } else {
                        // f.b
                        executeTask(task)
                    }
                } else {
                    response.status = false
                    response.message = 'Permission denied'
                }
            } else {
                response.status = false
                response.action = 'login'
            }
        }
    }
}


module.exports = App