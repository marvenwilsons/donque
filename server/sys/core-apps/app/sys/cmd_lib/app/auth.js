const permissionHandler = (permissions) => {
    // @dqsys: auth: todo: permissionHandler(),
    console.log('   [Universal protocol] permission handler')
    return true
}

const commitsHandler = (commitId) => {
    // @dqsys: auth: todo: commitsHandler(),
}

const adminTitleValidator = (titles) => {
    // @dqsys: auth: todo: adminTitleValidator(),
    console.log('   [Universal protocol] title handler')
    return true
}

const sectionHandler = (section) => {
    // @dqsys: auth: todo: sectionHandler(),
    console.log('   [Universal protocol] section handler')
}

const functionHandler = ({ dep, isDestructive, userData, pwd, username }) => {
    // @dqsys: auth: todo: functionHandler(),
    const {decode} = dep
    
    console.log('   [Universal protocol] function handler')
    
    if (!isDestructive){
        return true
    }else {
        if(pwd){
            // compare password
            const isValid = decode(userData.password, username).toString() === pwd.toString() ? true : ''

            return decode(userData.password, username).toString() === pwd.toString() ? true : {
                msg: 'Authentication failed',
                actions: [{
                    title: 'prompt_err'
                }]
            }
        }else{
            console.log('   [Universal protocol] password not found')
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
        .then(data => {
            return liveAdmins.currentLiveAdmins
        })

    return new Promise((resolve, reject) => {
        if (currentLiveAdmins.length === 0 && command != 'adminlogin') {
            resolve(false)
        } else {
            resolve(true)
        }
    })
}

const validateToken = ({data, token, jwt, encrypt, decode, command}) => {
    const userId = data.user._id
    const encryptedPassword = data.user.password
    const userUsername = data.user.username

    if(command == 'adminlogin'){
        return true
    }else {
        try{
            const decodedToken = jwt.verify(token, encrypt(decode(encryptedPassword, userUsername), userId))
            return decodedToken._id.toString() === userId.toString()
        }catch(err){
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
                const res = [
                    { output: permissionHandler(selectedCommand.prop) },
                    { output: adminTitleValidator(selectedCommand.prop) },
                    { output: functionHandler(selectedCommand.prop) }
                ]
                let pIndex = undefined
                const temp = res.map((e, i) => e.output === true ? true : pIndex = i)

                if (temp.every(items => items === true)) {
                    callback(null, {
                        status: true
                    })
                } else {
                    callback(res[pIndex].output, null)
                }
            } else if (userDoesExist.validated && userDoesExist.accessType == 'full') {
                console.log('   [Auth] access type is full')
                
                if (validateToken({ data: userDoesExist.data, jwt, token, encrypt, decode, command })){
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
                    
                    if (typeof functionHandler_response === 'boolean'){
                        callback(null, {
                            status: true,
                            data: userDoesExist.data
                        })
                    }else{
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
                }else{
                    callback({
                        status: false,
                        data: {
                            msg: 'Invalid or expired token',
                            actions:[{
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