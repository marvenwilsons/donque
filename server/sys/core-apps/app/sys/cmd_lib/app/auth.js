const permissionHandler = (permissions) => {
    console.log('   [Universal protocol] permission handler')
    return true
}

const titleHandler = (titles) => {
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

const security = require('../utils/utils').encrypt

const _validateUser = async (dbclient, { username }) => {
    console.log('   [Universal protocol] Validating user')
    const userdb = dbclient.db(dbclient.appName).collection('dq_admins')
    const db = dbclient.db(dbclient.appName)
    const user = await userdb.findOne({username})

    return new Promise(async (resolve, reject) => {
        if (dbclient.applicationUserType === 'appUser') {
            /**
             * Get dq user admin
             */
            console.log('   [Universal protocol] validating user: user is an app admin only')
            
            if(user){
                if (user.title == 'owner'){
                    resolve({
                        validated: true,
                        action: 'full access',
                        data: {
                            user,
                            db
                        }
                    })
                }else{
                    resolve({
                        validated: true,
                        action: 'limited',
                        data: {
                            user,
                            db
                        }
                    })
                }
            }else{
                reject({
                    validated: false,
                    msg: `Could not find user "${username}" in database`
                })
            }

        } else {
            /**
             * is db admin is owner ? full access : validate
             */
            if (dbclient.isOwner){
                console.log('   [Universal protocol] validating user: user is an owner')
                resolve({
                    validated: true,
                    action:'full access',
                    data: {
                        user,
                        db
                    }
                })
            }else{
                console.log('** [validateUser] user is an admin database and app admin')
                resolve({
                    validated: true,
                    action: 'limited',
                    data: {
                        user,
                        db
                    }
                })
            }
        }
    })
}

const validateUserExistance = async (dbclient, { username }) => {
    const userdb = dbclient.db(dbclient.appName).collection('dq_admins')
    const db = dbclient.db(dbclient.appName)
    const user = await userdb.findOne({ username })

    const fullPrevilegeTitle = [
        'owner'
    ]

    return new Promise((resolve,reject) => {
        if(user){
            resolve({
                validated: true,
                accessType: fullPrevilegeTitle.includes(user.title) ? 'full' : 'limited',
                data: {
                    user,
                    db
                }
            })
        }else{
            reject({
                validated: false,
            })
        }
    })
}

const auth = async ({ dep, selectedCommand, username, password, token, command, data, section, method }, callback) => {
    const { userdb } = dep

    const userDoesExist = await validateUserExistance(userdb, { username, password, token })
    
    if (userDoesExist.validated && userDoesExist.accessType == 'limited') {
        const res = [
            { output: permissionHandler(selectedCommand.prop) },
            { output: titleHandler(selectedCommand.prop) },
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
    } else if (userDoesExist.validated && userDoesExist.accessType == 'full'){
        callback(null, {
            status: true,
            data: userDoesExist.data
        })
    } else {
        callback({
            status: false,
            data: {
                msg: `Cannot validate "${username}" because it does not exist in the database`
            }
        }, null)
    }
}

module.exports = auth