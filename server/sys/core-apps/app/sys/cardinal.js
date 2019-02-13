const db = require('../database/index')

const Cardinal = async ({ username, password, token, data, command, section, method }) => {
    // dependecies
    // const db = require('../database/index')
    const registry = require('./cmd_lib/registry')

    // command response container
    const response = {
        state: {},
        set data(r) {
            if(r.status === false){
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
    } catch(err){
        response.data = {
            status: false,
            data:{
                msg:`System error, section or command does not exist in registry`
            }
        }
    }
    
    /**
     * returns true if command is allowed for execution
     * returns an object if command is not allowed to execute
     */
    const commandIsAllowed = await registry.dqapp.universalprotocol({
        dep: {
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
        if(commandIsAllowed.data.section === 'dqapp'){
            response.data = commandIsAllowed
        }else{
            console.log('** executing command')
            /**
             * Execute function
             */
            const param = section != 'adminMethods' ? data : {username,password,token,data}

            if (commandIsAllowed.status){
                const CommandResponse = await selectedCommand[command](param)
                response.data = CommandResponse
            }
        }
    }else {
        console.log('** fail')
        response.data = commandIsAllowed.data.msg
    }

    // return
    return new Promise((resolve, reject) => {
        if (response.data.status) {
            console.log('** returning success to client')
            resolve(response.data)
        } else {
            console.log('** returning fail to client')
            reject(response.data)
        }
    })
}

module.exports = Cardinal