module.exports = async ({ dep, selectedCommand, username, password, token, command, data, section, method }, callback) => {
    /**
     * Deps
     */
    const commits_handler = require('./commits-handler')
    const first_layer_auth = require('./fisrt-layer-auth')
    const fn_handler = require('./function-handler')
    const perm_handler = require('./permission-handler')
    const validate_token = require('./validate-token')
    const validate_user_ex = require('./validate-user-existance')

    /**
     * destruc dep object
     */
    const { userdb, jwt, encrypt, decode } = dep


    /**
     * part 1
     */
    const is_valid_req = await first_layer_auth(userdb,{command})

    if(is_valid_req != true){
        callback({
            status: false,
            data: {
                msg: 'Illegal api call detected request is not permitted',
                actions: [{
                    title: 'redirect',
                    content: 'dqlogin',
                }]
            }
        })
    }

    /**
     * part 2
     */
    if(is_valid_req === true) {
        try {
            const user_does_ex = await validate_user_ex(userdb, { username, password, token, command, jwt, encrypt })

            if(user_does_ex.validated && user_does_ex.accessType == 'limited'){
                console.log('   [Auth] access type is limited')
                let hasErr = undefined

                /**
                 * invoke function handler function
                 */
                const fn_handler_res = fn_handler({
                    dep: {
                        encrypt,
                        decode
                    },
                    isDestructive: selectedCommand.prop.funcIsDestructive,
                    userData: user_does_ex.data.user,
                    pwd: password,
                    username
                })

                fn_handler_res != true && (hasErr = fn_handler_res)

                /**
                 * invoke validate token function
                 */
                if (!validate_token({ data: user_does_ex.data, jwt, token, encrypt, decode, command })){
                    hasErr = {
                        msg: 'Invalid or expired token',
                        actions: [{
                            title: 'prompt_err'
                        }]
                    }
                }

                /**
                 * invoke permission handler function
                 */
                if (!perm_handler({ command, section, userData: user_does_ex.data.user })){
                    console.log(`   [Auth|permission-handler]`)
                    hasErr = {
                        msg: 'Permission denied',
                        actions: [{
                            title: 'prompt_err'
                        }]
                    }
                }
                
                /**
                 * return err to user
                 */
                if (!hasErr) {
                    console.log(`   [Auth] Has error false`)
                    callback(null, {
                        status: true,
                        data: user_does_ex.data
                    })
                } else {
                    console.log(`   [Auth] Has error true`)
                    callback({
                        status: false,
                        data: {
                            command,
                            section,
                            ...hasErr
                        }
                    })
                }
            }else if(user_does_ex.validated && user_does_ex.accessType == 'full') {
                console.log('   [Auth] access type is full')

                /**
                 * Validate token
                 */
                if (validate_token({ data: user_does_ex.data, jwt, token, encrypt, decode, command })){

                    /**
                     * invoke function handler
                     */
                    const fn_handler_res = fn_handler({
                        dep: {
                            encrypt,
                            decode
                        },
                        isDestructive: selectedCommand.prop.funcIsDestructive,
                        userData: user_does_ex.data.user,
                        pwd: password,
                        username
                    })

                    if(typeof fn_handler_res === 'boolean'){
                        callback(null, {
                            status: true,
                            data: user_does_ex.data
                        })
                    }else {
                        console.log('handler response')
                        console.log({
                            status: false,
                            data: {
                                command,
                                section,
                                ...fn_handler_res
                            }
                        })
                        callback({
                            status: false,
                            data: {
                                command,
                                section,
                                ...fn_handler_res
                            }
                        })
                    }
                }
            } else if (user_does_ex.validated == false) {
                // @dqsys: auth: user does not exist in db
                console.log(`   [Auth] Cannot validate "${username}" because it does not exist in the database`)
                callback({
                    status: false,
                    data: {
                        msg: `Cannot validate "${username}" because it does not exist in the database`,
                        actions: [{
                            title: 'prompt_err'
                        }]
                    }
                }, null)
            }
        } catch (err) {
            if (command === 'dqinitapp' && section === 'dqapp') {
                callback(null, {
                    status: true
                })
            } else {
                callback({
                    status: false,
                    data: {
                        msg: err,
                        actions: [{
                            title: 'prompt_err'
                        }]
                    }
                })
            }
        }
    }
}