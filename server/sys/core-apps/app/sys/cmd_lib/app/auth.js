const permissionHandler = (permissions) => {
    console.log('   [Universal protocol] permission handler')
    return true
}

const commitsHandler = (commitId) => {

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

const validateUserExistance = async ({...dbs}, { username }) => {
    const {doc} = dbs.data

    const userdb = doc.db(doc.appName).collection('dq_admins')
    const db = doc.db(doc.appName)
    const user = await userdb.findOne({ username })

    const fullPrevilegeTitle = [
        'owner'
    ]

    return new Promise((resolve,reject) => {
        if(user){
            console.log('   [Auth] User validated Ok!')
            resolve({
                validated: true,
                accessType: fullPrevilegeTitle.includes(user.title) ? 'full' : 'limited',
                data: {
                    user,
                    db
                }
            })
        }else{
            console.log('   [Auth] User validation fail!')
            reject({
                validated: false,
            })
        }
    })
}

const firstLayerAuthentication = async ({userdb,command}) => {
    /**
     * Insures nobody can call an api that is not logged in
     * a. check if there are live admins in current live admins array
     * b. 
     */
    console.log('** [FirstLayerAuth] Starting')
    console.log('   [FirstLayerAuth] Checking current live admins')

    // read current live admins
}

const auth = async ({ dep, selectedCommand, username, password, token, command, data, section, method }, callback) => {
    console.log('   [Auth] Entering auth function')
    const { userdb } = dep

    try{
        if(typeof userdb != 'object'){
            console.log('   [Auth] database userdb is invalid')
            console.log('   [Auth] returning an error')
        }else{
            console.log('   [Auth] database is valid')
            console.log('   [Auth] proceeding for authentication')
        }

        const isValidRequest = await firstLayerAuthentication({userdb,command})
        // return here if request is not valid, otherwise continue

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
        } else if (userDoesExist.validated && userDoesExist.accessType == 'full') {
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
        
    }catch(err){
        if(command === 'dqinitapp' && section === 'dqapp'){
            callback(null,{
                status: true
            })
        }else {
            callback({
                status: false,
                data: {
                    msg: err
                }
            })
        }
        
    }
}

module.exports = auth