const adminMethods = {}
const { security, validator } = require('../utils/utils')
const { encrypt, decrypt } = security
const jwt = require('jsonwebtoken')
const dbAgent = require('./db-agent.js')

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

// iniConf api
adminMethods._updateIniConf_ = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: ['owner'],
            funcIsDestructive: false
        }
    },
    _updateIniConf_({ keyToBeUpdated }) {
        const fs = require('fs')
        const path = require('path')
        console.log
    }
}


// create new application admin <<- done
adminMethods.createAppAdmin = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: ['owner'],
            funcIsDestructive: false
        }
    },
    createAppAdmin({ dep, data }) {
        console.log('** Creating application Admin')
        // get schema
        // hash the username and password
        // add new admin entry to databasen
        const { db } = dep
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

        return new Promise(async (resolve, reject) => {
            console.log('   [createAppAdmin] validating inputs')
            const CANNOT_BE_UNDEFINED_SET = new validator({
                username,
                password,
                adminName,
                roleTitle,
                email
            }),
                validate_cannot_be_undefined_set = CANNOT_BE_UNDEFINED_SET
                    .allowFalsyValue(false)
                    .done()
            validate_cannot_be_undefined_set.hasError && reject(err(validate_cannot_be_undefined_set.error))
            if (hasError) return



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
            admins_username && reject(err(`the username "${username}" is already exist`))
            if (hasError) return

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
            if (hasError) return

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
            if (hasError) return


            /**
             * Validate role
             */
            console.log('   [createAppAdmin] validating role title')
            const A_RULES = new validator(roleTitle, 'admin roles')
            const validate_roles = A_RULES
                .required()
                .isTrue(typeof roleTitle == 'string', `admin role title should be a type of string not ${typeof roles}`)
                .isTrue(`${roleTitle}`.toLowerCase().trim() != 'owner', `Invalid role title,the title named "${roleTitle}" is a reserved title and is already taken`)
                .done()
            validate_roles.hasError && reject(err(validate_roles.error))
            if (hasError) return

            // find role title in the dq_admin_role collection
            let sectionPermissions = undefined
            const role_title = await db.collection('dq_admin_role').findOne({ roleTitle })
            !role_title ? reject(err(`the title "${roleTitle}" does not exist in roles collection`)) : sectionPermissions = role_title
            if (hasError) return

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
            if (hasError) return

            const email_exist = await db.collection('dq_admins').findOne({ email })
            email_exist && reject(err(`Invalid email, the email "${email}" was already in used by another admin`))
            if (hasError) return



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
                adminInstanceAllowed: 1,
                messages: [],
                lastModefied: '',
                lastActivity: '',
                activities: []
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
                            data: {
                                msg: `${adminName} was successfully saved to database`,
                                actions: [{
                                    title: 'prompt_msg'
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
                                actions: [{
                                    title: 'prompt_err'
                                }]
                            }
                        })
                    })
            }
        })

    }
}

// creates a rule that will be applied for admins <<- done
adminMethods.createAppAdminRule = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: ['owner'],
            funcIsDestructive: false
        }
    },
    createAppAdminRule({ dep, data }) {
        console.log('** creating app admin role!')

        const { approach, permission, roleTitle } = data
        const { db } = dep
        const valid_permissions = new Set(['c', 'r', 'u', 'd'])
        const valid_approach = ['general', 'section']

        let hasError = false

        const err = (err) => {
            console.log('   [createAppAdminRole] validation failed')
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



        return new Promise(async (resolve, reject) => {

            const create_permission = (admin_perm_doc) => {
                return db.collection('dq_admin_role').insertOne(admin_perm_doc)
                    .then(() => {
                        return {
                            status: true,
                            data: {
                                msg: `Successfully created ${roleTitle}`,
                                actions: [{
                                    title: 'prompt_msg'
                                }]
                            }
                        }
                    }).catch(err => {
                        console.log('   [createAppAdminRole] Creating Permission Error')
                        console.log(err)
                    })
            }

            /**
             * validate 2
             */
            !valid_approach.includes(approach) && reject(err(`Invalid approach "${approach}"`))

            /**
             * validate 4
             */
            console.log('   [adminRole] validating admin role title')
            const ROLE_TITLE = new validator(roleTitle, 'admin role title')
            const validate_role_title = ROLE_TITLE
                .required()
                .hasSpecialCharacters(false)
                .isTrue(`${roleTitle}`.toLocaleLowerCase() != 'owner', `Invalid role title, ${roleTitle} is already taken`)
                .done()
            validate_role_title.hasError && reject(err(validate_role_title.error))

            /**
             * validate 5
             */
            console.log('   [adminRole] checking database')
            const role_title_exist = await db.collection('dq_admin_role').findOne({ roleTitle })
            role_title_exist && reject(err(`the role title named "${roleTitle}" already exist`))

            /**
             * Constructing permission object
             */
            console.log('   [adminRole] constructing object')
            let permission_obj = {
                roleTitle,
                sectionPermissions: {
                    adminActions: [],
                    pageMethods: [],
                    components: [],
                    shell: []
                }
            }

            /**
                 * Core Sections
                 * a. adminActions
                 * b. pageMethods
                 * c. components
                 * d. shell
                 */

            if (approach === 'general' && !permission.includes('r')) {
                console.log('   [adminRole] Error! Unusable permission set')
                reject(err('Error! Unusable permission set, the admin that will be assigned to this permission set cannot even login, because it cannot perform reading'))
            } else if (approach == 'general' && permission.includes('r') && !hasError) {
                !Array.isArray(permission) && reject(err(`permission should be an array not ${typeof permission}`))
                permission.map(e => !valid_permissions.has(e) && reject(err(`Unknown permission type "${e}"`)))

                permission.map(e => {
                    permission_obj.sectionPermissions.adminActions.push(e)
                    permission_obj.sectionPermissions.pageMethods.push(e)
                    permission_obj.sectionPermissions.components.push(e)
                    permission_obj.sectionPermissions.shell.push(e)
                })
                const res = await create_permission(permission_obj)
                resolve(res)
            }

            const SECTION_APPR = new validator(permission, 'section based admin permissions')
            const validate_section_appr = SECTION_APPR
                .required()
                .requiredObjectKeys(['adminActions', 'pageMethods', 'components', 'shell'], permission, {
                    allowExtra: false
                })
                .done()

            if (validate_section_appr.hasError && hasError) {
                reject(err(validate_section_appr.error))
            } else if (!hasError && approach === 'section') {
                console.log('   [adminRole] Case section, saving to db')
                permission_obj.sectionPermissions = permission

                const res = await create_permission(permission_obj)
                resolve(res)
            }

        })

    }
}

// UpdateAdmin <<- done
adminMethods.updateAppAdmin = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: ['owner'],
            funcIsDestructive: true
        }
    },
    updateAppAdmin({ dep, data }) {
        const { users_username, customData } = data
        const { db } = dep

        console.log(`** [updateAppAdmin] Updating ${users_username}`)

        const updatetableProps = ['username', 'password', 'adminName', 'email', 'title', 'ip']
        const ownerInifConfProps = ['adminName', 'username']
        const toBeUpdatedProps = Object.keys(customData)
        let hasError = false
        cannotBeUpdatedProps = []

        const err = (err) => {
            console.log('   [updateAppAdmin] validation failed')
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

        return new Promise(async (resolve, reject) => {
            // v1
            toBeUpdatedProps.length != 1 && reject(err('Invalid input, You can only update one property at a time'))

            // v2
            toBeUpdatedProps.map(items => {
                if (!updatetableProps.includes(items)) {
                    hasError = true
                    cannotBeUpdatedProps.push(items)
                }
            })

            if (hasError) {
                const errmsg = `Illegal operation detected, Unable to update property "${cannotBeUpdatedProps}" because it is either not listed in "updatetableProps" array or it is not part of the admin schema`
                reject(err(errmsg))
                return
            }

            // v3
            const VT = new validator(customData[toBeUpdatedProps[0]], toBeUpdatedProps[0])
            const validate_vt = VT
                .hasNumbers(false)
                .hasWhiteSpace(false)
                .hasSpecialCharacters(false)
                .isTrue(`${customData[toBeUpdatedProps[0]]}`.length > 5, `${toBeUpdatedProps[0]} should have at least a minimum of 5 characters`)
                .done()
            validate_vt.hasError && reject(err(validate_vt.error))
            if (hasError) return

            // update function
            const updateAdmin = () => {
                return db.collection('dq_admins').findOneAndUpdate(
                    { username: users_username },
                    { $set: customData },
                    { returnOriginal: false }
                ).then(() => {
                    return true
                }).catch(error => {
                    return error
                })
            }

            // final
            db.collection('dq_admins').findOne({ username: users_username })
                .then(data => {
                    const prevType = typeof data[toBeUpdatedProps[0]]
                    const pushType = typeof customData[toBeUpdatedProps[0]]

                    if (prevType != pushType) {
                        reject(err(`Illegal operation detected, Unable to update ${toBeUpdatedProps[0]}, because the data type of ${toBeUpdatedProps[0]} is not the valid, type should be ${prevType} instead of ${pushType}`))
                        return
                    }

                    if (data.title === 'owner' && ownerInifConfProps.includes(Object.keys(customData)[0])) {
                        return {
                            s: true,
                            data
                        }
                    } else {
                        return false
                    }

                })
                .then(async (data) => {
                    if (data.s) {
                        console.log('   [updateAppAdmin] Updating IniConf')
                        console.log('   [updateAppAdmin] Updating Owner admin')
                        // update iniConf
                        // adminMethods._updateIniConf_._updateIniConf_({})
                        // encrypt(username, adminName)
                        let value = undefined
                        if (toBeUpdatedProps[0] === 'username') {
                            value = encrypt(customData[toBeUpdatedProps[0]], data.data.adminName)
                        } else {
                            value = customData[toBeUpdatedProps[0]]
                        }

                        dbAgent.updateProp('JSON', 'iniConf', {
                            location: null,
                            key: toBeUpdatedProps[0],
                            value,
                            action: 'update value'
                        }).then(async () => {
                            const upadmn = await updateAdmin()
                            if (upadmn) {
                                resolve({
                                    status: true,
                                    data: {
                                        msg: `Successfully updated ${toBeUpdatedProps[0]} to ${customData[toBeUpdatedProps[0]]}`,
                                        actions: [{
                                            title: 'prompt_msg'
                                        }]
                                    }
                                })
                            } else {
                                reject(err(data))
                            }
                        })

                        // update admin
                    } else {
                        // update admin
                        const upadmn = await updateAdmin()
                        if (upadmn) {
                            resolve({
                                status: true,
                                data: {
                                    msg: `Successfully updated ${toBeUpdatedProps[0]} to ${customData[toBeUpdatedProps[0]]}`,
                                    actions: [{
                                        title: 'prompt_msg'
                                    }]
                                }
                            })
                        } else {
                            reject(err(data))
                        }
                    }
                })
                .catch(e => {
                    reject(err(`Error while locating user ${users_username}`))
                })

        })

    }
}

// viewAppAdmin
adminMethods.viewAppAdmin = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: ['owner'],
            funcIsDestructive: true
        }
    },
    viewAppAdmin({ dep, data }) {
        const { db } = dep

        return new Promise(async (resolve, reject) => {
            const user = await db.collection('dq_admins').findOne(data)
            const allowedSearchKeys = ['username','adminName','title','email','ip']
            const inp = allowedSearchKeys.includes(Object.keys(data)[0])
            let err = false

            if(!inp){
                err = true
                reject({
                    status: false,
                    data: {
                        msg: `Invalid key ${Object.keys(data)[0]}`,
                        actions: [{
                            title:'prompt_err'
                        }]
                    }
                })
            }

            if (Object.keys(data).length != 1){
                err = true
                reject({
                    status: false,
                    data: {
                        msg: `Invalid input, too many keys for a findOne operation`,
                        actions: [{
                            title:'prompt_err'
                        }]
                    }
                })
            }
            
            if(user && err == false){
                resolve({
                    status: true,
                    data: {
                        msg: null,
                        actions:[],
                        content: user
                    } 
                })
            }else if(!user) {
                reject({
                    status: false,
                    data: {
                        msg: `There is no such admin ${data[Object.keys(data)]}`,
                        actions: [{
                            title: 'prompt_err'
                        }]
                    }
                })
            }
        })
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

// create new database admin
adminMethods.createDbAdmin = {

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