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
        let res = undefined
        // just to make sure db server is running
        console.log('retrieving the db data')
        try {
            const data = await db()
            return res = data

        }catch(err){
            if(err.data.ini){
                res = {
                    status: true,
                    data: {
                        msg: 'owner login required',
                        action:{
                            title:'redirect', // prompt_msg, prompt_err_msg, prompt_password, propmpt_credentials, redirect,
                            content:'dqlogin'
                        }
                    }
                }
            }
        }

        return res
        //
    }

    let selectedCommand = undefined
    let hasErr = undefined

    console.log(`   [CardinalSystem] a.`)
    console.log(`   [CardinalSystem] Input command is ${command}`)
    console.log(`   [CardinalSystem] Input section is ${section}`)
    console.log(`   [CardinalSystem] Locating command in section`)
    if (section == undefined && command == undefined) {
        hasErr = true
        response = {
            status: false,
            data: {
                msg: 'Error reaching cardinal system because command and section is undefined, please specify the section and command upon calling the cardinal function'
            }
        }
    } else if (section === undefined && command) {
        hasErr = true
        response = {
            status: false,
            data: {
                msg: 'Error reaching cardinal system because section is undefined, please specify the section upon calling the cardinal function'
            }
        }
    } else if (section && !command) {
        hasErr = true
        response = {
            status: false,
            data: {
                msg: 'Error reaching cardinal system because command is undefined, please specify the command upon calling the cardinal function'
            }
        }
    }
    else if (!registry[section]) {
        console.log(`   [CardinalSystem] section "${section}" not found`)
        console.log(`   [CardinalSystem] returning an error now`)
        hasErr = true
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
            hasErr = true
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

    console.log('cardinal current response')
    let userdb = undefined

    if (hasErr == undefined) {
        userdb = await db(username, password)
    } else {
        return Promise.reject(response)
    }

    if (typeof userdb === 'object' && selectedCommand && typeof selectedCommand == 'object' && userdb.data.msg != 'init required' && hasErr == undefined) {
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
            return new Promise((resolve, reject) => {
                if (r.status) {
                    resolve(r)
                } else {
                    reject(r)
                }
            })
        } else {
            console.log('** fail')
            response = commandIsAllowed.data.msg
        }
    } else if (userdb.data.msg == 'init required' && hasErr == undefined) {
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
            return new Promise((resolve, reject) => {
                if (r.status) {
                    resolve(r)
                } else {
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
    return new Promise((resolve, reject) => {
        if (r.status) {
            resolve(r)
        } else {
            reject(r)
        }
    })
}

module.exports = Cardinal