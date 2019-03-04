const adminMethods = {}
const security = require('../utils/utils').encrypt
const jwt = require('jsonwebtoken')

let adminData = undefined
// Login
adminMethods.adminlogin = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: null,
            funcIsDestructive: false
        }
    },
    adminlogin({ dep, username, password }) {
        const { user, db } = dep
        let reUser = user
        console.log('** admin login')
        // check user name validity

        const updateUser = () => {
            /**
              * Create token
              */
            db.collection('dq_admins').findOneAndUpdate({ username }, {
                $set: {
                    token: jwt.sign({ username, password }, security.encrypt(password, username))
                }
            }, {
                    returnOriginal: false
                }, (err, u) => {
                    if (err) {
                        reject({
                            status: false,
                            data: {
                                msg: err
                            }
                        })
                    } else {
                        reUser = u
                        updateCurrentLiveAdmins()
                    }
                })
        }

        const updateCurrentLiveAdmins = () => {
            db
                .collection('dq_app')
                .findOneAndUpdate(
                    { siteOwner: user.adminName },
                    {
                        $push: {
                            currentLiveAdmins: {
                                username,
                                started: new Date()
                            }
                        }
                    }
                ).catch(err => {
                    reject({
                        status: false,
                        data: {
                            msg: err
                        }
                    })
                })

        }

        return new Promise((resolve) => {
            if (security.decrypt(user.password, username) === security.encrypt(password, username)) {
                updateUser()
                /**
                 * Return
                 */
                delete (reUser._id)
                delete (reUser.password)
                delete (reUser.ip)
                adminData = reUser
                // resolve({
                //     status: true,
                //     data: reUser
                // })
                resolve({
                    status: true,
                    data: {
                        msg: 'Auth Ok',
                        actions: [
                            {
                                title: 'saveToLocalStorage',
                                content: {
                                    token: reUser.token,
                                    username: reUser.username
                                }
                            },
                            {
                                title: 'redirect',
                                content:'admin'
                            }
                        ]
                    }
                })
            }
        })
    }
}


adminMethods.initAdminDashboard = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: null,
            funcIsDestructive: false
        }
    },
    initAdminDashboard({ dep, username, token }) {
        return new Promise((resolve, reject) => {
            if (adminData && username === adminData.username && token === adminData.token) {
                resolve({
                    status: true,
                    data: {
                        action: 'save data to localstorage',
                        data: adminData
                    }
                })
            } else {
                reject({
                    status: false,
                    data: {
                        msg: 'Error while initializing admin',
                        action: 'prompt login'
                    }
                })
            }
        })
    }
}

// logout
adminMethods.adminLogout = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: null,
            funcIsDestructive: false
        }
    },
    adminLogout({dep,username}){
        console.log('** logging out')
        const {db,user} = dep
        /**
         * a. delete token
         * b. remove user from current live admins
         * c. refresh admin dashboard
         */
        const clearingToken = db.collection('dq_admins').findOneAndUpdate({ username }, {
            $set: {
                token: undefined
            }
        }, {
            returnOriginal: false
        })

        const clearingLiveAdmins = db
            .collection('dq_app')
            .findOneAndUpdate(
                { siteOwner: user.adminName },
                {
                    $pull: {
                        currentLiveAdmins: {
                            username
                        }
                    }
                }
            )


        return new Promise((resolve,reject) => {
            const clearedToken = clearingToken.then(() => clearingLiveAdmins.then(() => true).catch(() => false))
            if (clearedToken){
                console.log('   [adminLogout] token cleared!')
                console.log(`   [adminLogout] deleting ${username} to current live admins success!`)
                resolve({
                    status: true,
                })
            }else{
                reject({
                    status: false,
                    data:{
                        msg:`there was an error while logging ${username} out`,
                        data: {
                            action: 'process to temp',
                            data:{
                                username
                            }
                        }
                    }
                })
            }            
        })
    }

}

adminMethods.properties = {
    get NoValidationRequiredCommands() {
        return ['initapp']
    },
    get Pages() {

    }
}

// Add new admin
adminMethods.CreateNewAdmin = {
    get permissions() {
        return 'create'
    },
    get allowedTitle() {
        return ['owner']
    },
    get funcIsDestructive() {
        return true
    },
    CreateNewAdmin({ username, password, adminName, roles, database }) {
        console.log('** Creating New Admin')
        // get schema
        // hash the username and password
        // add new admin entry to databasen

        return new Promise((resolve, reject) => {
            resolve({
                status: true,
                data: {
                    msg: 'Test'
                }
            })
        })

    }
}

// UpdateAdmin
adminMethods.UpdateAdmin = {
    get permissions() {
        return ['update']
    },
    get funcIsDestructive() {
        return true
    },
    allowedTitle() {
        return ['owner']
    },
    UpdateAdmin({ dep, username, password, data }) {

    }
}

// Delete Admin
adminMethods.DeleteAdmin = {
    get permissions() {
        return ['delete']
    },
    allowedTitle() {
        return ['Owner']
    },
    DeleteAdmin({ dep, username }) {

    }
}

module.exports = adminMethods