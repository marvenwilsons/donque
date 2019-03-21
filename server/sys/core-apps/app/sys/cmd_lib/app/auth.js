const permissionHandler = (permissions) => {
    // dqsys: auth: METHOD: permissionHandler
    console.log('   [Universal protocol] permission handler')
    return true
}

const commitsHandler = (commitId) => {
    // dqsys: auth: METHOD: commitsHandler
}

const adminTitleValidator = (titles) => {
    // dqsys: auth: METHOD: adminTitleValidator
    console.log('   [Universal protocol] title handler')
    return true
}

const sectionHandler = (section) => {
    // dqsys: auth: METHOD: sectionHandler
    console.log('   [Universal protocol] section handler')
}

const functionHandler = (func) => {
    // dqsys: auth: METHOD: functionHandler
    console.log('   [Universal protocol] function handler')
    // return {
    //     status:false,
    //     data:'func needs addtional auth process'
    // }
    true
}

const validateUserExistance = async ({ ...dbs }, { username, token, command }) => {
    // dqsys: auth: METHOD: validateUserExistance
    const { doc } = dbs.data

    const fullPrevilegeTitle = [
        'owner'
    ]

    const userdb = doc.db(doc.appName).collection('dq_admins')
    const db = doc.db(doc.appName)

    return new Promise(async (resolve, reject) => {
        userdb.findOne({ username }).then(user => {
            // console.log(data.token === token)
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
    // dqsys: auth: METHOD: firstLayerAuthentication
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

const auth = async ({ dep, selectedCommand, username, password, token, command, data, section, method }, callback) => {
    console.log('   [Auth] Entering auth function')
    const { userdb } = dep

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
            const userDoesExist = await validateUserExistance(userdb, { username, password, token, command })

            if (userDoesExist.validated && userDoesExist.accessType == 'limited') {
                // dqsys: auth: validate token, app admin case

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

                // dqsys: auth: validate token, owner case
                console.log('   [Auth] Validating token')
                let tokenIsValid = undefined
                if(command == 'adminlogin'){
                    tokenIsValid = true
                }else {
                    tokenIsValid = userDoesExist.data.user.token == token
                }

                if (tokenIsValid){
                    callback(null, {
                        status: true,
                        data: userDoesExist.data
                    })
                }else {
                    callback({
                        status: false,
                        data: {
                            msg: 'Invalid or expired token',
                            actions:[{
                                title:'prompt_err'
                            }]
                        }
                    })
                }


                
            } else if (userDoesExist.validated == false) {
                // dqsys: auth: user does not exist in db
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