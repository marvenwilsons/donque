const db = require('../database/index')

const Cardinal = async ({ username, password, token, data, command, section, method }) => {


    console.log('** Starting CardinalSystem')
    // dependecies
    const registry = require('./cmd_lib/registry')

    let response = undefined

    if (!command && !section && !token && !data) {
        /**
         * Only works when 
         */
        
        // just to make sure db server is running
        const appState = await db()
        //
        return {
            status: true,
            data: appState
        }
    }

    let selectedCommand = undefined

    console.log(`   [CardinalSystem] a.`)
    console.log(`   [CardinalSystem] Input command is ${command}`)
    console.log(`   [CardinalSystem] Input section is ${section}`)
    console.log(`   [CardinalSystem] Locating command in section`)
    if (!registry[section]) {
        console.log(`   [CardinalSystem] section "${section}" not found`)
        console.log(`   [CardinalSystem] returning an error now`)
        response = {
            status: false,
            data: {
                msg: `The section named ${section} does not exist in the registry`
            }
        }
    } else {
        console.log('   [CardinalSystem] Section found')
        console.log('   [CardinalSystem] Locating command')
        if (!registry[section][command]) {
            console.log(`   [CardinalSystem] command "${command}" not found`)
            console.log(`   [CardinalSystem] returning an error now`)
            response = {
                status: false,
                data: {
                    msg: `The command named ${command} does not exist in the registry`
                }
            }
        } else {
            console.log('   [CardinalSystem] Command found')
            selectedCommand = registry[section][command]
        }
    }

    const userdb = await db(username, password)
    if (typeof userdb === 'object' && selectedCommand && typeof selectedCommand == 'object' && userdb.data.action != 'SystemInit') {
        console.log(`** [CardinalSystem] Api Calls`)
        console.log(`   [CardinalSystem] b.`)

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
            console.log('** CardinalSystem Command executor')
            console.log('   [CardinalSystem] command validation done')
            console.log('   [CardinalSystem] executing command')
            /**
             * Execute function
             */
            const _d = commandIsAllowed.data
            const param = section != 'adminMethods' ? data : { dep: _d, username, password, token, data }

            console.log(`   [CardinalSystem] Entering ${section}`)
            console.log(`   [CardinalSystem] Executing ${command}`)

            const r = await selectedCommand[command](param)
            .then(async data => {
                const d = await data
                return d
            }).catch(async err => {
                return err
            })
            return new Promise((resolve,reject) => {
                if(r.status){
                    resolve(r)
                }else{
                    reject(r)
                }
            })
        } else {
            console.log('** fail')
            response = commandIsAllowed.data.msg
        }
    } else if (userdb.data.action == 'SystemInit') {
        if (command != 'dqinitapp') {
            console.log('** CardinalSystem SystemInit handler')
            console.log('   [CardinalSystem] Illegal call of command')
            response = {
                status: false,
                data: {
                    msg: `Cant perform "${command}" command because application is not yet initialize`
                }
            }
        } else {
            console.log('** CardinalSystem SystemInit handler')
            console.log('   [CardinalSystem] Skip auth process')
            console.log('   [CardinalSystem] Commence Initialization')
            const r = await selectedCommand[command](data).then(async data => {
                console.log(`** CardinalSystem command confirmed done`)
                const d = await data
                return d
            }).catch(err => {
                console.log(`** CardinalSystem error executing command`)
                return err
            })
            return new Promise((resolve,reject) => {
                if(r.status){
                    resolve(r)
                }else{
                    reject(r)
                }
            })
        }
    } else {
        console.log('not connected to db')
    }

    // return
    // return await response
    const r = await response
    return new Promise((resolve,reject) => {
        if(r.status){
            resolve(r)
        }else{
            reject(r)
        }
    })
}

module.exports = Cardinal