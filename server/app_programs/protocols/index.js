const {validator,encrypt} = require('../../app_lib/utils/index')
const MongoClient = require('mongodb').MongoClient
const auth = require('../../app_auth/auth')
const protocols = {}
const fs = require('fs')
const path = require('path')
const moment = require('moment')

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
                Dashboard: {
                    // create
                    addItem: true,
                    // read
                    initActorsDashboard: true, // system only
                    listAllDashItems: true
                    // update
                    // delete
                },
                // adminMethods
                Administration: {
                    // access
                    adminLogout: true,
                    adminLogin: true,
                    // create
                    createNewAppActor: true,
                    createNewAppActorRule: true,
                    createTeam: true,
                    createCustomRole: true,
                    // read
                    initActorsDashboard: true,
                    listAdmins: true,
                    viewAppAdmin: true,
                    listAllTeams: true,
                    viewTeam: true,
                    getCustomRole: true,
                    listAllCustomRole: true,
                    getRoles: true,
                    // update
                    assignAppActorToTeam: true,
                    asssignAppActorToRole: true,
                    assignColorToTeam: true,
                    renameTeam: true,
                    updateAppAdmin: true,
                    updateCustomRole: true,
                    updateAppSettings: true,
                    // delete
                    deleteAppAdmin: true,
                    removeCustomRole: true,
                    resetApp: true,
                    nukeApp: true
                },
                // pageMethods
                Pages: {
                    // create
                    createNewPage: true,
                    // read
                    listAllPages: true,
                    getPage: true,
                    searchQueryPage: true,
                    // update
                    luckPage: true,
                    assignPageDev: true,
                    currentDevWorking: 'sys',
                    updateLastModifiedDate: 'sys',
                    commitPageChanges: true,
                    // delete
                    deletePage: true,

                    __$resource: []
                },
                // compMethods
                Components: {
                    createComponent: true,
                    listAllComp: true,
                    getComp: true,
                    updateComp: true,
                    deleteComp: true
                },
                // 1. the person who creates the collections and its category is the owner
                // 1.1 ex. of a collection: movie
                // 2. then the owner will assign an admin to manage the category 
                // 2.1 ex. of a category: horror, comedy
                Collections: {
                    createCollection: true,
                    createColCategory: true,
                    listAllCol: true,
                    getCol: true,
                    updateCol: true,
                    updateCategory: true,
                    updateLastModifiedDate: true,
                    assignAdminToCollection: true,
                    assignAdminToCategory: true,
                    removeAdminToCollection: true,
                    defineCategoryProperties: true,
                    defineCategoryMethods: true,
                    deleteCol: true,
                    deleteColCategory: true,
                    __$resource: []
                },
                Messages: {
                    composeNewMessage: true,
                    saveMsgAsDraft: true,
                    replyToMsg: true,
                    listAllMsg: true,
                    getMSg: true,
                    updateSentOnDate: true,
                    updateUnreadMsg: true,
                    deleteMsg: true
                },
                Task: {
                    createNewTask: true,
                    createNewTaskFor: true,
                    getTaskList: true,
                    getTask: true,
                    editTask: true,
                    assinTaskTo: true,
                    updateLastModifiedDate: true // system only
                },
                Todos: {
                    createNewTodo: true,
                    listAllTodos: true,
                    getTodo: true,
                    updateTodo: true,
                    markTodoAsDone: true,
                    deleteTodo: true
                },
                Work: {
                    getAssignedResource: true,// returns the categories and methods for managing, this is assigned by the parent admin
                    getOrganizationalChart: true

                },
                Profile: {
                    getProfile: true
                },
                Files: {},
                Plugins: [
                    // read
                    'read:getPluginList:dqPluginsSys',
                    // update
                    'update:deactivatePlugin:dqPluginsSys',
                    'update:activatePlugin:dqPluginsSys',
                    // delete
                    'delete:removePlugin:dqPluginsSys'
                ],
                Settings: {},
                // where you can install plugins and install component sets or themes 
                Marketplace: {},
                Database: {
                    killDbConnection: true
                },
                Console: []
            }
            const CollectionsAndData = [{
                colName: 'dq_app', data: {
                    siteTitle,
                    siteOwner: adminName,
                    created: moment().format("MMM Do YY"),
                    currentLiveAdmins: [],
                    teams: [],
                    adminPasswords: ''
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
                    task: {
                        pending: [],
                        done: []
                    },
                    teams: [],
                    isBlocked: false,
                    messages: [],
                    lastModefied: '',
                    lastActivity: '',
                    activities: [],
                    resource: {
                        Dashboard: app_resource.Dashboard,
                        Administration: app_resource.Administration,
                        Pages: app_resource.Pages,
                        Components: app_resource.Components,
                        Collections: app_resource.Collections,
                        Messages: app_resource.Messages,
                        Todos: app_resource.Todos,
                        Profile: app_resource.Profile,
                        Files: app_resource.Files,
                        Plugins: app_resource.Plugins,
                        Settings: app_resource.Settings,
                        Marketplace: app_resource.Marketplace,
                        Database: app_resource.Database,
                        Console: app_resource.Console
                    }
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
                    desc: 'This title grants full access in all of the applications resources, application secrets, all actions and the backend files',
                    resource: {
                        Dashboard: app_resource.Dashboard,
                        Administration: app_resource.Administration,
                        Pages: app_resource.Pages,
                        Components: app_resource.Components,
                        Collections: app_resource.Collections,
                        Messages: app_resource.Messages,
                        Todos: app_resource.Todos,
                        Profile: app_resource.Profile,
                        Files: app_resource.Files,
                        Plugins: app_resource.Plugins,
                        Settings: app_resource.Settings,
                        Marketplace: app_resource.Marketplace,
                        Database: app_resource.Database,
                        Console: app_resource.Console
                    }
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
                            desc: 'the dev title grants access to system files, public views, and full permission to perform crud operations related to applications bussiness developement',
                            resource: {
                                Dashboard: app_resource.Dashboard,
                                Pages: app_resource.Pages,
                                Components: app_resource.Components,
                                Messages: app_resource.Messages,
                                Task: app_resource.Task,
                                Todos: app_resource.Todos,
                                Profile: app_resource.Profile,
                                Plugins: app_resource.Plugins
                            }
                        })
                    // creating admin role
                    client
                        .db(dbName)
                        .collection('dq_actor_role')
                        .insertOne({
                            roleTitle: 'admin',
                            desc: 'the admin manages the app resources and executes actions that is assigned by the owner',
                            resource: {
                                Dashboard: app_resource.Dashboard,
                                Work: app_resource.Work,
                                Messages: app_resource.Messages,
                                Task: app_resource.Task,
                                Todos: app_resource.Todos,
                                Profile: app_resource.Profile,
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
                    const _path = path.join(__dirname, '../../app_manifest/iniConf.json')
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