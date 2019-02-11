
const Cardinal = async ({ username, password, token, data, command, section, method }) => {
    
    // dependecies
    const db = require('../database/index')
    const registry = require('./cmd_lib/registry')

    // command response container
    const response = {
        state: {},
        set data(r) {
            this.state = r
        },
        get data() {
            return this.state
        }
    }

    const selectedCommand = registry[section][command]
    
    /**
     * returns true if command is allowed for execution
     * returns an object if command is not allowed to execute
     */
    const commandIsAllowed = await registry.dqapp.universalprotocol({
        dep: {
            db,
            data
        },
        selectedCommand,
        username,
        password,
        token,
        section,
        command,
        method
    })


    if(commandIsAllowed.status){
        console.log('** execute function')
        // response.data
    }else {
        response.data = ''
    }

    // return
    return new Promise((resolve, reject) => {
        if (response.data.status) {
            resolve(response.data)
        } else {
            reject(response.data)
        }
    })
}

module.exports = Cardinal