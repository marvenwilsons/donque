const permissionHandler = (permissions) => {
    console.log('   [Universal protocol] permission handler')
    return true
}

const commitsHandler = (commitId) => {

}

const adminTitleValidator = (titles) => {
    console.log('   [Universal protocol] title handler')
    return true
}

const sectionHandler = (section) => {
    console.log('   [Universal protocol] section handler')
}

const functionHandler = (func) => {
    console.log('   [Universal protocol] function handler')
    // return {
    //     status:false,
    //     data:'func needs addtional auth process'
    // }
    true
}

const validateUserExistance = async ({ ...dbs }, { username }) => {
    const { doc } = dbs.data

    const userdb = doc.db(doc.appName).collection('dq_admins')
    const db = doc.db(doc.appName)
    const user = await userdb.findOne({ username })

    const fullPrevilegeTitle = [
        'owner'
    ]

    return new Promise((resolve, reject) => {
        if (user) {
            console.log('   [Auth] User validated Ok!')
            resolve({
                validated: true,
                accessType: fullPrevilegeTitle.includes(user.title) ? 'full' : 'limited',
                data: {
                    user,
                    db
                }
            })
        } else {
            console.log('   [Auth] User validation fail!')
            reject(`Fail on validating ${username}`)
        }
    })
}

const firstLayerAuthentication = async ({ ...dbs }, { command }) => {
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

    return new Promise((resolve,reject) => {
        if(currentLiveAdmins.length === 0 && command != 'adminlogin'){
            resolve(false)
        }else{
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
            const userDoesExist = await validateUserExistance(userdb, { username, password, token })

            if (userDoesExist.validated && userDoesExist.accessType == 'limited') {
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
                callback(null, {
                    status: true,
                    data: userDoesExist.data
                })
            } else if (userDoesExist.validated == false) {
                console.log(`   [Auth] Cannot validate "${username}" because it does not exist in the database`)
                callback({
                    status: false,
                    data: {
                        msg: `Cannot validate "${username}" because it does not exist in the database`,
                        actions: [{
                            title:'prompt_err'
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
                            title:'prompt_err'
                        }]
                    }
                })
            }

        }
    }



}

module.exports = auth