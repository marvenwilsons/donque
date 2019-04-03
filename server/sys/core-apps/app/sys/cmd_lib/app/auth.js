const permissionHandler = ({ dep, permissions, userData }) => {
    // @dqsys: auth: todo: permissionHandler(),
    console.log('** permission handler')
    if (permissions != null) {
        console.log(userData)
    } else {
        console.log('   [permissionHandler] permission is null returning true')
        return true
    }
}

const commitsHandler = (commitId) => {
    // @dqsys: auth: todo: commitsHandler(),
}

const adminTitleValidator = ({title, userTitle}) => {
    // @dqsys: auth: todo: adminTitleValidator(),
    console.log('** admin title validator')
    
    if (userTitle.includes(title)){
        return true
    } else {
        console.log('   [adminTitleValidator] action not permitted')
        return {
            msg: 'Action not permitted',
            actions: [{
                title: 'prompt_err'
            }]
        }
    }

}

const sectionHandler = (section) => {
    // @dqsys: auth: todo: sectionHandler(),
    console.log('   [Universal protocol] section handler')
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

const validateUserExistance = async ({ ...dbs }, { username, token, command }) => {
    // @dqsys: auth: validateUserExistance()
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
     * b. 
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
    const userId = data.user._id
    const encryptedPassword = data.user.password
    const userUsername = data.user.username

    if (command == 'adminlogin') {
        return true
    } else {
        try {
            const decodedToken = jwt.verify(token, encrypt(decode(encryptedPassword, userUsername), userId))
            return decodedToken._id.toString() === userId.toString()
        } catch (err) {
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
                    contents: 'dqlogin',
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

                // part2
                const permissionHandler_response = permissionHandler({
                    dep: {
                        encrypt,
                        decode
                    },
                    permissions: selectedCommand.prop.permissions,
                    userData: userDoesExist.data.user
                })

                if (permissionHandler_response != true) {
                    hasErr = permissionHandler_response
                }

                // part3
                const adminTitleValidator_response = adminTitleValidator({
                    title: selectedCommand.prop.allowedtitle,
                    userTitle: userDoesExist.data.user.title
                })

                if(adminTitleValidator_response != true) {
                    hasErr = adminTitleValidator_response
                }

                if (!hasErr) {
                    callback(null, {
                        status: true,
                        data: userDoesExist.data
                    })
                } else {
                    console.log('there is error')
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