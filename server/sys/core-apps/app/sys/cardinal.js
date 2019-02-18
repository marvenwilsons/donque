const db = require('../database/index')

const Cardinal = async ({ username, password, token, data, command, section, method }) => {
    // dependecies
    const registry = require('./cmd_lib/registry')

    let response = {}

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
            console.log('** [CardinalSystem] command validation done')
            console.log('   [CardinalSystem] executing command')
            /**
             * Execute function
             */
            const _d = commandIsAllowed.data
            const param = section != 'adminMethods' ? data : { dep: _d, username, password, token, data }

            console.log(`   [CardinalSystem] Entering ${section}`)
            console.log(`   [CardinalSystem] Exectuing ${command}`)

            selectedCommand[command](param).then(data => {
                response.data = data
            }).catch(err => {
                response.data = err
            })
        } else {
            console.log('** fail')
            response.data = commandIsAllowed.data.msg
        }
    } else {
        console.log('not connected to db')
    }

    // return
    return await response
}

module.exports = Cardinal