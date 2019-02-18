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
        console.log('admin login')
        // check user name validity
        return new Promise((resolve, reject) => {
            if (security.decrypt(user.password, username) === security.encrypt(password, username)) {
                let reUser = user

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
                        }
                    })

                /**
                 * Return
                 */
                delete (reUser._id)
                delete (reUser.password)
                delete (reUser.ip)
                adminData = reUser
                resolve({
                    status: true,
                    data: reUser
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
adminMethods.adminlogout = {
    get permissions() {
        return []
    },

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
    CreateNewAdmin({ username, password, adminName, title }) {
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