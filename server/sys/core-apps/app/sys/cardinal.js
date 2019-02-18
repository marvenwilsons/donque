const db = require('../database/index')

const Cardinal = async ({ username, password, token, data, command, section, method }) => {
    // dependecies
    const registry = require('./cmd_lib/registry')

    // command response container
    const response = {
        state: {},
        set data(r) {
            if (r.status === false) {
                throw Error(r.data.msg)
            }
            this.state = r
        },
        get data() {
            return this.state
        }
    }

    let selectedCommand = undefined

    try {
        selectedCommand = registry[section][command]
    } catch (err) {
        response.data = {
            status: false,
            data: {
                msg: `CardinalSystem Error: ${section} ${registry[section] == undefined ? 'section' : 'command'} does not exist or is undefined`
            }
        }
    }

    const userdb = await db(username, password)
    if (userdb) {

        /**
         * returns true if command is allowed for execution
         * returns an object if command is not allowed to execute
         */
        const commandIsAllowed = await registry.dqapp.universalprotocol({
            dep: {
                data,
                userdb
            },
            selectedCommand,
            username,
            password,
            token,
            section,
            command,
            method
        })

        if (commandIsAllowed.status) {
            console.log('** [CardinalSystem] execute function')
            if (commandIsAllowed.data.section === 'dqapp') {
                response.data = commandIsAllowed
            } else {
                console.log('** [CardinalSystem] executing command')
                /**
                 * Execute function
                 */
                const _d = commandIsAllowed.data
                const param = section != 'adminMethods' ? data : { dep: _d,username, password, token, data }

                if (commandIsAllowed.status) {
                    const CommandResponse = await selectedCommand[command](param)
                    response.data = CommandResponse
                }
            }
        } else {
            console.log('** fail')
            response.data = commandIsAllowed.data.msg
        }
    }else{
        console.log('not connected to db')
    }

    // return
    return new Promise((resolve, reject) => {
        if (response.data.status) {
            console.log('** [CardinalSystem] returning success to client')
            resolve(response.data)
        } else {
            console.log('** returning fail to client')
            reject(response.data)
        }
    })
}

module.exports = Cardinal