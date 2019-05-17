const permissionHandler = ({ command, section, userData }) => {
    const sec_Alias = require('./section_alias.json')

    console.log('** permission handler')
    if (userData.resource[sec_Alias[section]] == undefined && command == 'adminlogin' || command == 'adminLogout'){
        // check if this admin is blocked
        if(userData.isBlocked) {
            console.log('   [permissionHandler] user has no permission to login')
            return false
        }else {
            console.log('   [permissionHandler] Auth Ok!')
            return true
        }
    } else if (!userData.resource[sec_Alias[section]][command]) {
        console.log(`   [permissionHandler] user has no permission to perform ${command}`)
        return false
    } else {
        console.log('   [permissionHandler] Auth Ok!')
        return true
    }    
}

const commitsHandler = (commitId) => {
    // @dqsys: auth: todo: commitsHandler(),
}

const functionHandler = ({ dep, isDestructive, userData, pwd, username }) => {
    // @dqsys: auth: todo: functionHandler(),
    const { decode } = dep

    console.log('** function handler')
    if (!isDestructive) {
        console.log('   [functionHandler] function is not destructive')
        return true
    } else {
        console.log('   [functionHandler] function is destructive, password is required')
        if (pwd) {
            // compare password
            console.log('   [functionHandler] password field found, authenticating ...')
            return decode(userData.password, username).toString() === pwd ? true : {
                msg: 'Authentication failed',
                actions: [{
                    title: 'prompt_err'
                }]
            }
        } else {
            console.log('   [functionHandler] password field not found, prompting user for password')
            return {
                msg: 'Password required',
                actions: [{
                    title: 'prompt_password'
                }]
            }
        }
    }

}

const validateUserExistance = async ({ ...dbs }, { username }) => {
    // @dqsys: auth: validateUserExistance()
    console.log('** [ValidatingUserExistance]')
    const { doc } = dbs.data

    const fullPrevilegeTitle = [
        'owner'
    ]

    const userdb = doc.db(doc.appName).collection('dq_admins')
    const db = doc.db(doc.appName)

    return new Promise(async (resolve, reject) => {
        return userdb.findOne({ username }).then(user => {
            resolve({
                validated: true,
                accessType: fullPrevilegeTitle.includes(user.title) ? 'full' : 'limited',
                data: {
                    user,
                    db
                }
            })


        }).catch(err => {
            console.log('   [Auth] User validation fail!')
            reject(`Fail on validating ${username}`)
        })
    })
}

const firstLayerAuthentication = async ({ ...dbs }, { command }) => {
    // @dqsys: auth: firstLayerAuthentication()
    /**
     * Insures nobody can call an api that is not logged in
     * a. check if there are live admins in current live admins array
     */
    console.log('** [FirstLayerAuth] Starting')
    console.log('   [FirstLayerAuth] Checking current live admins')

    const { doc } = dbs.data
    const userdb = doc.db(doc.appName).collection('dq_app')
    const db = doc.db(doc.appName)

    let liveAdmins = undefined
    const currentLiveAdmins = await userdb
        .find()
        .forEach(items => {
            liveAdmins = items
        })
        .then(() => {
            return liveAdmins.currentLiveAdmins
        })
    console.log(currentLiveAdmins)
    return new Promise((resolve, reject) => {
        if (currentLiveAdmins.length === 0 && command != 'adminlogin') {
            resolve(false)
        } else {
            resolve(true)
        }
    })
}

const validateToken = ({ data, token, jwt, encrypt, decode, command }) => {
    console.log('** validating token')
    const userId = data.user._id
    const encryptedPassword = data.user.password
    const userUsername = data.user.username
    if (command == 'adminlogin') {
        console.log('   [validateToken] Token not needed')
        return true
    } else {
        try {
            const decodedToken = jwt.verify(token, encrypt(decode(encryptedPassword, userUsername), userId))
            console.log(`   [validateToken] ${decodedToken._id.toString() === userId.toString() ? 'token accepted' : 'token is invalid'}`)
            return decodedToken._id.toString() === userId.toString()
        } catch (err) {
            console.log(err)
            return false
        }
    }
}

const auth = async ({ dep, selectedCommand, username, password, token, command, data, section, method }, callback) => {
    console.log('   [Auth] Entering auth function')
    const { userdb, jwt, encrypt, decode } = dep

    const isValidRequest = await firstLayerAuthentication(userdb, { command })
    if (isValidRequest != true) {
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
    } else {
        try {
            if (typeof userdb != 'object') {
                console.log('   [Auth] database userdb is invalid')
                console.log('   [Auth] returning an error')
            } else {
                console.log('   [Auth] database is valid')
                console.log('   [Auth] proceeding for authentication')
            }
            const userDoesExist = await validateUserExistance(userdb, { username, password, token, command, jwt, encrypt })

            if (userDoesExist.validated && userDoesExist.accessType == 'limited') {
                // @dqsys: auth: validate token, app admin case, todo

                console.log('   [Auth] access type is limited')

                let hasErr = undefined

                // part1
                const functionHandler_response = functionHandler({
                    dep: {
                        encrypt,
                        decode
                    },
                    isDestructive: selectedCommand.prop.funcIsDestructive,
                    userData: userDoesExist.data.user,
                    pwd: password,
                    username
                })

                if (functionHandler_response != true) {
                    hasErr = functionHandler_response
                }

                // part 2
                if (!validateToken({ data: userDoesExist.data, jwt, token, encrypt, decode, command })) {
                    hasErr = {
                        msg: 'Invalid or expired token',
                        actions: [{
                            title: 'prompt_err'
                        }]
                    }
                }

                // part 3
                const permissionHandler_response = permissionHandler({
                    command,
                    section,
                    userData: userDoesExist.data.user
                })

                // part 3.a
                if (!permissionHandler_response) {
                    console.log(`   [Auth|permission-handler] response - ${permissionHandler_response}`)
                    hasErr = {
                        msg: 'Permission denied',
                        actions: [{
                            title: 'prompt_err'
                        }]
                    }
                }

                
                if (!hasErr) {
                    console.log(`   [Auth] Has error false`)
                    callback(null, {
                        status: true,
                        data: userDoesExist.data
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
            } else if (userDoesExist.validated && userDoesExist.accessType == 'full') {
                console.log('   [Auth] access type is full')

                if (validateToken({ data: userDoesExist.data, jwt, token, encrypt, decode, command })) {
                    const functionHandler_response = functionHandler({
                        dep: {
                            encrypt,
                            decode
                        },
                        isDestructive: selectedCommand.prop.funcIsDestructive,
                        userData: userDoesExist.data.user,
                        pwd: password,
                        username
                    })

                    if (typeof functionHandler_response === 'boolean') {
                        callback(null, {
                            status: true,
                            data: userDoesExist.data
                        })
                    } else {
                        console.log('handler response')
                        console.log({
                            status: false,
                            data: {
                                command,
                                section,
                                ...functionHandler_response
                            }
                        })
                        callback({
                            status: false,
                            data: {
                                command,
                                section,
                                ...functionHandler_response
                            }
                        })
                    }
                } else {
                    callback({
                        status: false,
                        data: {
                            msg: 'Invalid or expired token',
                            actions: [{
                                title: 'prompt_err'
                            }]
                        }
                    })
                }

            } else if (userDoesExist.validated == false) {
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

module.exports = auth