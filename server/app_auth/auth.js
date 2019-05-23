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