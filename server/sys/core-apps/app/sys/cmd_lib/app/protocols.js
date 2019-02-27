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
            siteTitleIsValid,
            usernameIsValid,
            passwordIsValid,
            emailIsValid
        ]

        const vs = ['siteTitle','username','password','email']

        const f = async () => {
            console.log('   [dqInitapp] validating inputs')

            let stat = []
            let err = undefined
            
            //
            const validationResuls = validationState.every(items => items === true) ? 
            stat.push(true) : 
            validationState.map((e,i) => e != true && (err = `Invalid ${vs[i]}`))
            console.log(`  [dqInitapp] ${err ? 'validation failed' : 'validation success'}`)

            //
            const isInit = err ? err : await initApplicationProtocol(data).then(() => true).catch(err => err)
            
            isInit === true ? stat.push(isInit) : (stat.push(isInit), err = isInit)
            
            const res1 = stat.every(i => i == true)
            const res = res1 ? {
                status: true,
                data: {
                    msg: 'success',
                }
            } : {
                status: false,
                data: {
                    msg: err
                }
            }

            return await res
        }
        
        return res = await f()
    }
}

const initApplicationProtocol = async ({ siteTitle, username, password, email, adminName }, callback) => {
    return new Promise((resolve,reject) => {
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
            const CollectionsAndData = [{
                colName: 'dq_app', data: {
                    siteTitle,
                    siteOwner: adminName,
                    created: new Date,
                    currentLiveAdmins: []
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
                    lastActivity: ''
                }
            }, {
                colName: 'dq_config', data: {
                    adminLanding: 'admin',
                    protectedRoutes: []
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
                    // create user 
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
                        maxDuplicateAdminLogins: 5,
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
                console.log(err)
                reject({
                    status: false,
                    data: {
                        msg: 'Error while executing universal protocol'
                    }
                })
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