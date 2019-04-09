const validator = require('../utils/utils').validator
const encrypt = require('../utils/utils').encrypt
const MongoClient = require('mongodb').MongoClient
const auth = require('./auth')
const protocols = {}
const fs = require('fs')
const path = require('path')

/**
 * Deletes all the contents in the database execpt the dbOwner and the
 * initialization data
 */
protocols.dqResetApp = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: ['dbOwner'],
            funcIsDestructive: true,
            destructiveLevel: 3
        }
    },
    dqResetapp({ username, password, token, ownerName }) {

    }
}
/**
 * Deletes the database, deletes iniConf.json
 * Start from the beginning
 */
protocols.dqPurgeApp = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: ['dbOwner'],
            funcIsDestructive: true,
            destructiveLevel: 3
        }
    },
    dqPurgeApp({ username, password, token, ownerName }) {

    }
}

protocols.dqinitapp = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: null,
            funcIsDestructive: false,
        }
    },
    async dqinitapp(data = { siteTitle, username, password, email, repassword, adminName }) {
        console.log('** dqInitapp, validations and creations')
        let response = {}

        /**
         * Validate data
         */
        const _siteTitle = new validator(data.siteTitle)
        const _username = new validator(data.username)
        const _password = new validator(data.password)
        const _email = new validator(data.email)

        const siteTitleIsValid = _siteTitle
            .hasSpecialCharacters(false)
            .hasWhiteSpace(false)
            .required()
            .isTrue(data.siteTitle.length > 2)
            .done()

        const usernameIsValid = _username
            .hasSpecialCharacters(false)
            .hasWhiteSpace(false)
            .required()
            .isTrue(data.username.length > 6)
            .done()

        const passwordIsValid = _password
            .hasSpecialCharacters()
            .isTrue(data.password.length > 6)
            .isTrue(data.password === data.repassword)
            .required()
            .done()

        const emailIsValid = _email
            .required()
            .done()


        const validationState = [
            siteTitleIsValid.hasError == false,
            usernameIsValid.hasError == false,
            passwordIsValid.hasError == false,
            emailIsValid.hasError == false
        ]

        const vs = ['siteTitle', 'username', 'password', 'email']

        const f = async () => {
            console.log('   [dqInitapp] validating inputs')

            let stat = []
            let err = undefined

            //
            const validationResuls = validationState.every(items => items === true) ?
                stat.push(true) :
                validationState.map((e, i) => e != true && (err = `Invalid ${vs[i]}`))
            console.log(`  [dqInitapp] ${err ? 'validation failed' : 'validation success'}`)

            //
            const isInit = err ? err : await initApplicationProtocol(data).then(() => true).catch(err => err)

            isInit === true ? stat.push(isInit) : (stat.push(isInit), err = isInit)

            const res1 = stat.every(i => i == true)
            const res = res1 ? {
                status: true,
                data: {
                    msg: `Successfully created ${data.siteTitle}`,
                    actions: [{
                        title: 'redirect',
                        content: 'dqlogin'
                    }]
                }
            } : {
                    status: false,
                    data: {
                        actions: [{
                            title: 'prompt_err'
                        }],
                        msg: err
                    }
                }

            return await res
        }

        return res = await f()
    }
}

//@protocols
const initApplicationProtocol = async ({ siteTitle, username, password, email, adminName }, callback) => {
    return new Promise((resolve, reject) => {
        const dbName = `dq_${siteTitle}`

        /**
         * Connect and create dq database
         */
        const db = () => MongoClient.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true })
        db().then(async (client) => {

            /**
             * Does dbName already a database?
             */
            const adminDb = client.db(dbName),
                AccessDbList = adminDb.admin().listDatabases(),
                dbList = await AccessDbList.then(list => list.databases).catch(() => { throw new Error('Listing database error') })
            dbExistStat = dbList.map(({ name }) => name === dbName ? reject(`${dbName} already exist in mongo database`) : true),
                dbDoesNotExist = dbExistStat.every(items => items === true)

            /**
             * Collections and its data
             */
            const app_resource = {
                dashboard: [
                    // create
                    'create:addItem:dashMethods',
                    // read
                    'read:listAllDashItems:dashMethods'
                    // update
                    // delete
                ],
                administration: [
                    // create
                    'create:createNewAppActor:adminMethods', // actor because it can be dev or admin
                    'create:createTeam:adminMethods',
                    'create:createCustomRole',
                    // read
                    'read:listAdmins:adminMethods',
                    'read:viewAppAdmin:adminMethods',
                    'read:searchQueryAppAdmin:adminMethods',
                    'read:listAllTeams:adminMethods',
                    'read:viewTeam:adminMethods',
                    'read:getCustomRole:adminMethods',
                    'read:listAllCustomRole:adminMethods',
                    // update
                    'update:assignAppActorToTeam:adminMethods',
                    'update:asssignAppActorToRole:adminMethods',
                    'update:assignColorToTeam:adminMethods',
                    'update:renameTeam:adminMethods',
                    'update:updateAppActor:adminMethods',
                    'update:logoutAppActor:adminMethods',
                    'update:updateCustomRole:adminMethods',
                    // delete
                    'delete:deleteAppActor:adminMethods',
                    'delete:removeCustomRole:adminMethods'
                ],
                page: [
                    // create
                    'create:createNewPage:pageMethods',
                    // read
                    'read:listAllPages:pageMethods',
                    'read:getPage:pageMethods',
                    'read:searchQueryPage:pageMethods',
                    // update
                    'update:luckPage:pageMethods',
                    'update:assignPageDev:pageMethods',
                    'update:currentDevWorking:pageMethods', // for system only
                    'update:updateLastModifiedDate:pageMethods', // for system only
                    'update:commitPageChanges:pageMethods',
                    // delete
                    'delete:deletePage:pageMethods'
                ],
                components: [
                    // create
                    'create:createComponent:compMethods',
                    // read
                    'read:listAllComp:compMethods',
                    'read:getComp:compMethods',
                    // update
                    'update:updateComp:compMethods',
                    // delete
                    'delete:deleteComp"compMethods'
                ],
                // 1. the person who creates the collections and its category is the owner
                // 1.1 ex. of a collection: movie
                // 2. then the owner will assign an admin to manage the category 
                // 2.1 ex. of a category: horror, comedy
                collections: [
                    // create
                    'create:createCollection:colMethods',
                    'create:createColCategory:colMethods',
                    // read
                    'read:listAllCol:colMethods',
                    'read:getCol:colMethods',
                    // update
                    'update:updateCol:colMethods',
                    'update:updateCategory:colMethods',
                    'update:updateLastModifiedDate:colMethods', // for system only
                    'update:assignAdminToCollection:colMethods',
                    'update:assignAdminToCategory:colMethods',
                    'update:removeAdminToCollection:colMethods',
                    'update:defineCategoryProperties:colMethods', // for ex. a prop name "start count" or "like count, or "img"
                    'update:defineCategoryMethods:colMethods',
                    // delete
                    'delete:deleteCol:colMethods',
                    'delete:deleteColCategory:colMethods'
                ],
                messages: [
                    // create
                    'create:composeNewMessage:msgMethods',
                    'create:saveMsgAsDraft:msgMethods',
                    'create:replyToMsg:msgMethods',
                    // read
                    'read:listAllMsg:msgMethods',
                    'read:getMSg:msgMethods',
                    // update
                    'update:updateSentOnDate:msgMethods', // for system only
                    'update:updateUnreadMsg:msgMethods', // for system only
                    // delete
                    'delete:deleteMsg:msgMethods'
                ],
                task: [
                    // create
                    'create:createNewTask:taskMethods',
                    'create:createNewTaskFor:taskMethods',
                    // read
                    'read:getTaskList:taskMethods',
                    'read:getTask:taskMethods',
                    // update
                    'update:editTask:taskMethods',
                    'update:assinTaskTo:taskMethods',
                    'update:updateLastModifiedDate:taskMethods', // for system only
                    // delete

                ],
                todos: [
                    // create
                    'create:createNewTodo:todoMethods',
                    // read
                    'read:listAllTodos:todoMethods',
                    'read:getTodo:todoMethods',
                    // update
                    'update:updateTodo:todoMethods',
                    'update:markTodoAsDone:todoMethods',
                    // delete
                    'delete:deleteTodo:todoMethods',
                ],
                work: [
                    // read
                    'read:getAssignedResource:workMethods', // returns the categories and methods for managing, this is assigned by the parent admin
                    'read:getOrganizationalChart:workMethods'
                ],
                profile: [
                    // read
                    'read:getProfile:profileMethods'
                ],
                plugins: [
                    // read
                    'read:getPluginList:pluginMethods',
                    // update
                    'update:deactivatePlugin:pluginMethods',
                    'update:activatePlugin:pluginMethods',
                    // delete
                    'delete:removePlugin:pluginMethods'
                ],
                settings: [],
                settings_appearance: [],
                settings_security: [],
                // where you can install plugins and install component sets or themes 
                marketplace: [],
                database: [],
                console: []
            }
            const CollectionsAndData = [{
                colName: 'dq_app', data: {
                    siteTitle,
                    siteOwner: adminName,
                    created: new Date,
                    currentLiveAdmins: [],
                    admin_passwords: ''
                },
            },
            {
                colName: 'dq_service_schemas', data: {
                    form: 'sample',
                    type: 'sample',
                    schema: {}
                }
            },
            {
                colName: 'dq_services', data: {
                    name: 'sample',
                    fields: []
                }
            },
            {
                colName: 'dq_admins', data: {
                    adminName,
                    username,
                    password: encrypt.encrypt(password, username),
                    token: '',
                    title: 'owner',
                    email,
                    ip: '',
                    sectionPermissions: {
                        adminActions: ['c', 'r', 'u', 'd'],
                        pageMethods: ['c', 'r', 'u', 'd'],
                        components: ['c', 'r', 'u', 'd'],
                        shell: ['c', 'r', 'u', 'd']
                    },
                    task: {
                        pending: [],
                        done: []
                    },
                    messages: [],
                    lastModefied: '',
                    lastActivity: '',
                    activities: [],
                    resource: app_resource
                }
            }, {
                colName: 'dq_config', data: {
                    adminLanding: 'admin',
                    protectedRoutes: [],
                    authentication: [{
                        tokenExpr: '7 days',
                        refreshTokenEveryTransaction: false,
                        secreteSalt: ''
                    }]
                }
            }, {
                colName: 'dq_resource_registry', data: app_resource
            }, {
                colName: 'dq_actor_role', data: {
                    roleTitle: 'owner',
                    resource: app_resource
                }
            }]

            /**
             * Creating and Saving to database
             */
            dbDoesNotExist && CollectionsAndData.map((items, index) => {

                /**
                 * Create collections and insert data to each collections
                 */
                client
                    .db(dbName)
                    .collection(items.colName)
                    .insertOne(items.data)
                    .catch((err) => reject(`unable to create collection ${colName}`))

                /**
                 * Create admin to the database
                 */
                if (CollectionsAndData.length - 1 === index) {
                    // creating dev role
                    client
                        .db(dbName)
                        .collection('dq_actor_role')
                        .insertOne({
                            roleTitle: 'dev',
                            resource: {
                                dashboard: app_resource.dashboard,
                                page: app_resource.page,
                                components: app_resource.components,
                                messages: app_resource.messages,
                                task: app_resource.task,
                                todos: app_resource.todos,
                                profile: app_resource.profile,
                                plugins: app_resource.plugins
                            }
                        })
                    // creating admin role
                    client
                        .db(dbName)
                        .collection('dq_actor_role')
                        .insertOne({
                            roleTitle: 'admin',
                            resource: {
                                dashboard: app_resource.dashboard,
                                work: app_resource.work,
                                messages: app_resource.messages,
                                task: app_resource.task,
                                todos: app_resource.todos,
                                profile: app_resource.profile,
                            }
                        })

                    // creating user 
                    console.log('creating admin')
                    adminDb
                        .addUser(username, encrypt.encrypt(password, username), { roles: ['readWrite'] })
                        .catch((err) => {
                            console.log(err)
                            reject(`unable to create admin "${username}" to ${dbName} database`)
                        })

                    // create app db config
                    const _path = path.join(__dirname, '../../../database/iniConf.json')
                    const _data = JSON.stringify({
                        title: siteTitle,
                        appName: dbName,
                        owner: adminName,
                        username: encrypt.encrypt(username, adminName),
                        allowDuplicateAdminLogins: true,
                        ini: true
                    }, null, '\t')
                    fs.writeFile(_path, _data, 'utf-8', (err) => {
                        err ? console.log(err) : console.log('** iniConf generated')
                    })

                    /**
                     * Close connection
                     */
                    client.close().then(() => {
                        resolve(null, {
                            status: true,
                            data: {
                                msg: `${siteTitle} successfully created`
                            }
                        })
                    })
                }
            })
        }).catch(err => {
            throw new Error(err.message)
        })
    })
}

protocols.universalprotocol = async ({ dep, selectedCommand, username, password, token, command, section, method }) => {
    const { db, data } = dep

    return new Promise((resolve, reject) => {
        console.log('** Executing protocols')
        auth({ dep, selectedCommand, username, password, token, command, data, section, method }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                console.log('   [universal protocol] Command is allowed')
                resolve({
                    status: true,
                    ...data
                })
            }
        })
    })
}

module.exports = protocols