const adminMethods = {}

let adminData = undefined
/*****************************************************
 * Access
 */
// Login <<- done
adminMethods.adminlogin = {
    get prop() {
        return {
            allowedtitle: null,
            funcIsDestructive: false
        }
    },
    adminlogin({ dep, username, password }) {
        // @dqsys: admin: adminlogin()
        const { user, userdb, db, jwt, encrypt, decode } = dep
        let reUser = user
        console.log('** admin login')
        const siteTitle = userdb.data.doc.appName.toString().replace('dq_', '')
        // check user name validity

        const updateUser = () => {
            console.log(`   [adminlogin] Updating ${username}'s token`)
            /**
              * Create token
              */
            // @adminlogin: part1 creating token
            return db.collection('dq_admins').findOne({ username }).then((data) => {
                return db.collection('dq_admins').findOneAndUpdate(
                    { username },
                    {
                        $set: {
                            token: jwt.sign({ _id: data._id.toString() }, encrypt(password, data._id.toString()))
                        }
                    },
                    { returnOriginal: false }).then((data) => {
                        console.log(`   [adminlogin] token updated`)
                        reUser = data
                        console.log(`   [adminlogin] updating current live admins`)
                        return updateCurrentLiveAdmins()
                    }).catch(err => {
                        return {
                            status: false,
                            data: {
                                msg: err
                            }
                        }
                    })
            })
        }

        const updateCurrentLiveAdmins = () => {
            return db
                .collection('dq_app')
                .findOneAndUpdate(
                    { siteTitle },
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
                    return true
                })
                .catch(err => {
                    return {
                        status: false,
                        data: {
                            msg: err
                        }
                    }
                })

        }

        return new Promise(async (resolve, reject) => {
            const u = await updateUser()
            // console.log(decode(user.password, username) == password)
            if (decode(user.password, username) == password && u) {
                /**
                 * Return
                 */
                delete (reUser._id)
                delete (reUser.password)
                delete (reUser.ip)
                adminData = reUser

                console.log(`   [adminlogin] token ${adminData.value.token}`)

                console.log(`   [adminlogin] resolving`)
                resolve({
                    status: true,
                    data: {
                        msg: 'Auth Ok',
                        actions: [
                            {
                                title: 'saveToLocalStorage',
                                content: {
                                    token: adminData.value.token,
                                    username: adminData.value.username
                                }
                            },
                            {
                                title: 'redirect',
                                content: 'admin'
                            }
                        ]
                    }
                })
            } else {
                console.log('adminlogin error not yet ready')
                reject({
                    status: false,
                    data: {
                        msg: 'Invalid username or password',
                        actions: [{
                            title: 'prompt_err'
                        }]
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
            allowedtitle: null,
            funcIsDestructive: false
        }
    },
    adminLogout({ dep, username }) {
        // @dqsys: admin: adminLogout()
        console.log('** logging out')
        const { db, user } = dep
        /**
         * a. delete token
         * b. remove user from current live admins
         * c. refresh admin dashboard
         */
        // @adminlogout: part1 setting token to undefined
        const clearingToken = db.collection('dq_admins').findOneAndUpdate({ username }, {
            $set: {
                token: undefined
            }
        }, {
                returnOriginal: false
            })

        // @adminlogout: part2 pulling admin out to current live admins
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
            // @adminlogout: part0 exec
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
/**
 * Create methods for admin
 */
//@adminMethods:create. create new application admin <<- todo
adminMethods.createNewAppActor = {
    get prop() {
        return {
            allowedtitle: ['owner'],
            funcIsDestructive: false
        }
    },
    createNewAppActor({ dep, data }) {
        // @dqsys: admin: createNewAppActor()
        console.log('** Creating application Admin')
        // get schema
        // hash the username and password
        // add new admin entry to databasen
        const { db, encrypt, validator } = dep

        const { username, password, adminName, roleTitle, email } = data

        let hasError = false

        const err = (err) => {
            console.log('   [createNewAppActor] validation failed')
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
            console.log('   [createNewAppActor] validating inputs')
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
            console.log('   [createNewAppActor] validating username')
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
            console.log('   [createNewAppActor] validating password')
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
            console.log('   [createNewAppActor] validating admin name')
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
            console.log('   [createNewAppActor] validating role title')
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
            console.log('   [createNewAppActor] validating email')
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
            const pwd = encrypt(password, username)
            const admin_doc = {
                username,
                password: pwd,
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
                parentAdmin: '',
                childAdmins: [],
                resources: [
                    { name: 'dashboard' },
                    { name: 'messages' },
                    { name: 'tasks' },
                    { name: 'work' },
                ], // should be encrypted
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
                console.log('   [createNewAppActor] writting new admin to database')
                db.collection('dq_admins').insertOne(admin_doc)
                    .then(data => {
                        console.log(`   [createNewAppActor] ${adminName} successfully saved to database`)
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
                        console.log(`   [createNewAppActor] an unexpected error occured while inserting admin to database`)
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
//@adminMethods:create. creates a rule that will be applied for admins <<- done
adminMethods.createNewAppActorRule = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: ['owner'],
            funcIsDestructive: false
        }
    },
    createNewAppActorRule({ dep, data }) {
        // @dqsys: admin: createNewAppActorRule()
        console.log('** creating app admin role!')

        const { approach, permission, roleTitle } = data
        const { db, validator } = dep
        const valid_permissions = new Set(['c', 'r', 'u', 'd'])
        const valid_approach = ['general', 'section']

        let hasError = false

        const err = (err) => {
            console.log('   [createNewAppActorRole] validation failed')
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
                        console.log('   [createNewAppActorRole] Creating Permission Error')
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
//@adminMethods:create. create team
adminMethods.createTeam = {
}
//@adminMethods:create. create custom role
adminMethods.createCustomRole = {
}
/*****************************************************
 * Read methods for admin
 */
//@adminMethods:read. init admin dashboard << -done
adminMethods.initActorsDashboard = {
    get prop() {
        return {
            allowedtitle: null,
            funcIsDestructive: false
        }
    },
    initActorsDashboard({ dep, username, token }) {
        // @dqsys: admin: initAdminDashboard()
        console.log('** init admin dashboard')
        return new Promise((resolve, reject) => {
            if (adminData && username === adminData.value.username && token === adminData.value.token) {
                resolve({
                    status: true,
                    data: {
                        msg: null,
                        actions: [{
                            title: 'saveToLocalStorage',
                            content: {
                                token: adminData.value.token,
                                username: adminData.value.username
                            }
                        }, {
                            title: 'cardinalHandler',
                            content: {
                                title: adminData.value.title,
                                username: adminData.value.username,
                                adminName: adminData.value.adminName,
                                email: adminData.value.email,
                                resources: adminData.value.resource
                            }
                        }],
                    }
                })
            } else {
                reject({
                    status: false,
                    data: {
                        msg: 'Error while initializing admin',
                        actions: [{
                            title: 'prompt_err'
                        }]
                    }
                })
            }
        })
    }
}
//@adminMethods:read. list admins
adminMethods.listAdmins = {
}
//@adminMethods:read. viewAppAdmin <<-done
adminMethods.viewAppAdmin = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: ['owner'],
            funcIsDestructive: false
        }
    },
    viewAppAdmin({ dep, data }) {
        // @dqsys: admin: viewAppAdmin()
        const { db } = dep

        return new Promise(async (resolve, reject) => {
            const user = await db.collection('dq_admins').findOne(data)
            const allowedSearchKeys = ['username', 'adminName', 'title', 'email', 'ip']
            const inp = allowedSearchKeys.includes(Object.keys(data)[0])
            let err = false

            if (!inp) {
                err = true
                reject({
                    status: false,
                    data: {
                        msg: `Invalid key ${Object.keys(data)[0]}`,
                        actions: [{
                            title: 'prompt_err'
                        }]
                    }
                })
            }

            if (Object.keys(data).length != 1) {
                err = true
                reject({
                    status: false,
                    data: {
                        msg: `Invalid input, too many keys for a findOne operation`,
                        actions: [{
                            title: 'prompt_err'
                        }]
                    }
                })
            }

            if (user && err == false) {
                resolve({
                    status: true,
                    data: {
                        msg: null,
                        actions: [],
                        content: user
                    }
                })
            } else if (!user) {
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
//@adminMethods:read. list all teams
adminMethods.listAllTeams = {
}
//@adminMethods:read. view team
adminMethods.viewTeam = {
}
//@adminMethods:read. list all custom role
adminMethods.listAllCustomRole = {
}
//@adminMethods:read. get custom role
adminMethods.getCustomRole = {
}
/*****************************************************
 * Update methods
 */
//@adminMethods:update. assign app actor to team
adminMethods.assignAppActorToTeam = {
}
//@adminMethods:update. assign app actor to role
adminMethods.asssignAppActorToRole = {
}
//@adminMethods:update. assign color to team
adminMethods.assignAppActorToTeam = {
}
//@admunMethods:update. rename team
adminMethods.renameTeam = {
}
//@adminMethods:update. UpdateAdmin <<- done
adminMethods.updateAppAdmin = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: ['owner'],
            funcIsDestructive: false
        }
    },
    updateAppAdmin({ dep, data }) {
        // @dqsys: admin: updateAppAdmin()
        const { users_username, customData } = data
        const { db, dbAgent, validator, encrypt } = dep

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
                    console.log(e)
                    reject(err(`Error while locating user ${users_username}`))
                })

        })

    }
}
//@adminMethod:update. update app settings
adminMethods.updateAppSettings = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: ['owner'],
            funcIsDestructive: false
        }
    },
    updateAppSettings({ SettingName, SettingValue }) {

    }
}
//@adminMethods:update.
adminMethods.updateCustomRole = {
}
/*****************************************************
 * Delete methods
 */
//@adminMethods:delete. delete app admin
adminMethods.deleteAppAdmin = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: ['owner'],
            funcIsDestructive: true
        }
    },
    deleteAppAdmin({ dep, data }) {
        // @dqsys: admin: todo: deleteAppAdmin()
        const { db } = dep
        console.log('deleting appAdmnin')

        let err = undefined
        let key = undefined

        console.log(data)

        if(!data){
            err = 'Invalid input data is undefined'
        }else if (Object.keys(data).length != 1) {
            err = 'Invalid input cannot have more than one filter'
        } else {
            key = Object.keys(data)[0]
        }


        return new Promise(async (resolve, reject) => {
            if (err) {
                reject({
                    status: false,
                    data: {
                        msg: err,
                        actions: [{
                            title: 'prompt_err'
                        }]
                    }
                })
                return
            }

            db.collection('dq_admins').findOne(data)
                .then(user => {
                    if (user.title.toLowerCase() != 'owner') {
                        return true
                    } else {
                        throw new Error('Illegal operation Cannot delete owner')
                    }
                })
                .then(async () => {
                    const op = await db.collection('dq_admins').findOneAndDelete(data)
                    if (op.ok == 1) {
                        resolve({
                            status: true,
                            data: {
                                msg: `Successfully deleted ${data[key]}`,
                                actions: [{
                                    title: 'prompt_msg'
                                }]
                            }
                        })
                    }
                })
                .catch(err => {
                    reject({
                        status: false,
                        data: {
                            msg: err.message,
                            actions: [{
                                title: 'prompt_err'
                            }]
                        }
                    })
                })
        })
    }
}
//@adminMethods:delete. delete custom role
adminMethods.removeCustomRole = {
}
//@adminMethods:delete. reset app
adminMethods.resetApp = {
}
//@adminMethods:delete. purge app
adminMethods.purgeApp = {

}



module.exports = adminMethods