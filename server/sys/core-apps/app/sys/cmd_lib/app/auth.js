const permissionHandler = (permissions) => {
    return true
}

const titleHandler = (titles) => {
    return true
}

const sectionHandler = (section) => {

}

const functionHandler = (func) => {
    // return {
    //     status:false,
    //     data:'func needs addtional auth process'
    // }
    true
}

const security = require('../utils/utils').encrypt

const validateUser = async (dbclient, { username, password, token }) => {

    const userdb = dbclient.db(dbclient.appName).collection('dq_admins')
    const db = dbclient.db(dbclient.appName)
    const user = await userdb.findOne({ $and: [{ username }, { password: security.encrypt(password, username) }] })

    return new Promise(async (resolve, reject) => {
        if (dbclient.applicationUserType === 'appUser') {
            /**
             * Get dq user admin
             */
            console.log('** [validateUser] user is an app admin only')
            
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
                console.log('** [validateUser] user is an owner')
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

const auth = async ({ dep, selectedCommand, username, password, token, command, data, section, method }, callback) => {
    const { userdb } = dep

    const isAValidUser = await validateUser(userdb, { username, password, token })
    
    if (isAValidUser.validated && isAValidUser.action == 'limited') {
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
    } else if (isAValidUser.validated && isAValidUser.action == 'full access'){
        callback(null, {
            status: true,
            data: isAValidUser.data
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