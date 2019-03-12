const adminMethods = {}
const { security, validator } = require('../utils/utils')
const { encrypt, decrypt } = security
const jwt = require('jsonwebtoken')

let adminData = undefined
// Login <<- done
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
            console.log(`   [adminlogin] Updating ${username}'s token`)
            /**
              * Create token
              */
            db.collection('dq_admins').findOneAndUpdate({ username }, {
                $set: {
                    token: jwt.sign({ username, password }, encrypt(password, username))
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
                        console.log(`   [adminlogin] token updated`)
                        reUser = u
                        updateCurrentLiveAdmins()
                        console.log(`   [adminlogin] updating current live admins`)
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
                )
                .then(() => {
                    console.log(`   [adminlogin] ${username} was added to current live admins successfully`)
                })
                .catch(err => {
                    reject({
                        status: false,
                        data: {
                            msg: err
                        }
                    })
                })

        }

        return new Promise((resolve) => {
            if (decrypt(user.password, username) === encrypt(password, username)) {
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
                console.log(`   [adminlogin] resolving`)
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
                                content: 'admin'
                            }
                        ]
                    }
                })
            }
        })
    }
}

// init admin dashboard << -done
adminMethods.initAdminDashboard = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: null,
            funcIsDestructive: false
        }
    },
    initAdminDashboard({ dep, username, token }) {
        console.log('** init admin dashboard')
        return new Promise((resolve, reject) => {
            if (adminData && username === adminData.username && token === adminData.token) {
                resolve({
                    status: true,
                    data: {
                        msg: null,
                        actions: [{
                            title: 'saveToLocalStorage',
                            content: adminData
                        }],
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

// logout <<- done
adminMethods.adminLogout = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: null,
            funcIsDestructive: false
        }
    },
    adminLogout({ dep, username }) {
        console.log('** logging out')
        const { db, user } = dep
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


        return new Promise((resolve, reject) => {
            const clearedToken = clearingToken.then(() => clearingLiveAdmins.then(() => true).catch(() => false))
            if (clearedToken) {
                console.log('   [adminLogout] token cleared!')
                console.log(`   [adminLogout] deleting ${username} to current live admins success!`)
                resolve({
                    status: true,
                    data: {
                        msg: null,
                        actions: [{
                            title: 'redirect',
                            content: 'dqlogin'
                        }]
                    }
                })
            } else {
                reject({
                    status: false,
                    data: {
                        msg: `there was an error while logging ${username} out`,
                        actions: [{}],
                        data: {
                            action: 'process to temp',
                            data: {
                                username
                            }
                        }
                    }
                })
            }
        })
    }

}

// create new application admin
adminMethods.createAppAdmin = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: ['owner'],
            funcIsDestructive: false
        }
    },
    createAppAdmin({ dep, usr, pwd, data }) {
        console.log('** Creating application Admin')
        // get schema
        // hash the username and password
        // add new admin entry to databasen
        const { db, user } = dep
        const { username, password, adminName, roleTitle, email } = data

        let hasError = false

        const err = (err) => {
            console.log('   [createAppAdmin] validation failed')
            hasError = true
            return {
                status: false,
                data: {
                    msg: err,
                    actions: [{
                        title: 'prompt_err'
                    }]
                }
            }
        }

        // db.collection('dq_admins').insertOne({
        //     name:'testing'
        // }).then(() => {
        //     console.log('no error')
        // }).catch(() => {
        //    console.log('errrrr!') 
        // })
        return new Promise(async (resolve, reject) => {
            /**
             * Validate Username
             */
            console.log('   [createAppAdmin] validating username')
            const USERNAME = new validator(username, 'username')
            const validate_username = USERNAME
                .hasSpecialCharacters(false)
                .hasWhiteSpace(false)
                .required()
                .isTrue(username.length >= 6, 'username should have at least a minimum of 6 characters')
                .done()

            validate_username.hasError && reject(err(validate_username.error))

            const admins_username = await db.collection('dq_admins').findOne({ username })
            admins_username && reject(err(`the username "${username}" is already exist in the database`))

            /**
             * Validate password
             */
            console.log('   [createAppAdmin] validating password')
            const PASSWORD = new validator(password, 'password')
            const validate_password = PASSWORD
                .hasWhiteSpace(false)
                .isTrue(password.length > 6, 'password should have at least a minimum of 6 characters')
                .required()
                .done()
            validate_password.hasError && reject(err(validate_password.error))

            /**
             * Validate admin name
             */
            console.log('   [createAppAdmin] validating admin name')
            const ADMIN_NAME = new validator(adminName, 'admin name')
            const validate_admin_name = ADMIN_NAME
                .required()
                .isTrue(adminName.length > 4, 'admin name should have at least a minimum of 4 characters')
                .hasSpecialCharacters(false)
                .done()
            validate_admin_name.hasError && reject(err(validate_admin_name.error))

            /**
             * Validate role
             */
            console.log('   [createAppAdmin] validating role title')
            const A_RULES = new validator(roleTitle, 'admin roles')
            const validate_roles = A_RULES
                .required()
                .isTrue(typeof roleTitle == 'string', `admin role title should be a type of string not ${typeof roles}`)
                .done()
            validate_roles.hasError && reject(err(validate_roles.error))

            // find role title in the dq_admin_role collection
            let sectionPermissions = undefined
            const role_title = await db.collection('dq_admin_role').findOne({ roleTitle })
            !role_title ? reject(err(`the title "${roleTitle}" does not exist in roles collection`)) : sectionPermissions = role_title

            /**
             * Validate email
             */
            console.log('   [createAppAdmin] validating email')
            const EMAILS = new validator(email, 'admins email')
            const validate_email = EMAILS
                .required()
                .hasWhiteSpace(false)
                .hasSetOfCharacters(['@', '.com'], email, true)
                .done()
            validate_email.hasError && reject(err(validate_email.error))

            const email_exist = await db.collection('dq_admins').findOne({ email })
            email_exist && reject(err(`Invalid email, the email "${email}" was already in used by another admin`))


            /**
             * Constructing admin object
             */
            const admin_doc = {
                username,
                password,
                adminName,
                email,
                title: sectionPermissions.roleTitle,
                sectionPermissions: sectionPermissions.sectionPermissions,
                token: '',
                ip: '',
                task: {
                    pending: [],
                    done: []
                },
                messages: [],
                lastModefied:'',
                lastActivity:'',
                activities:[]
            }


            /**
             * Saving object to database
             */
            if (!hasError) {
                console.log('   [createAppAdmin] writting new admin to database')
                db.collection('dq_admins').insertOne(admin_doc)
                    .then(data => {
                        console.log(`   [createAppAdmin] ${adminName} successfully saved to database`)
                        resolve({
                            status: true,
                            data:{
                                msg: `${adminName} was successfully saved to database`,
                                actions:[{
                                    title:'prompt_msg'
                                }]
                            }
                        })
                    })
                    .catch(err => {
                        console.log(`   [createAppAdmin] an unexpected error occured while inserting admin to database`)
                        reject({
                            status: false,
                            data: {
                                msg: err,
                                actions:[{
                                    title:'prompt_err'
                                }]
                            }
                        })
                    })
            }
        })

    }
}

// creates a rule that will be applied for admins
adminMethods.createAppAdminRule = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: ['owner'],
            funcIsDestructive: false
        }
    },
    createAppAdminRule({ dep, title, rules }) {

    }
}

// create new database admin
adminMethods.createDbAdmin = {

}

// UpdateAdmin
adminMethods.UpdateAdmin = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: ['owner'],
            funcIsDestructive: true
        }
    },
    UpdateAdmin({ dep, username, password, data }) {

    }
}

// Delete Admin
adminMethods.DeleteAdmin = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: ['owner'],
            funcIsDestructive: true
        }
    },
    DeleteAdmin({ dep, username }) {

    }
}

// kill database connection
adminMethods.killDbConnection = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: ['owner'],
            funcIsDestructive: true
        }
    },
    killDbConnection() {

    }
}

// message an admin
// assign task to admin

//
adminMethods.properties = {
    get NoValidationRequiredCommands() {
        return ['initapp']
    },
    get Pages() {

    }
}

module.exports = adminMethods