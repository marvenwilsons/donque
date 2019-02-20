const validator = require('../utils/utils').validator
const encrypt = require('../utils/utils').encrypt
const MongoClient = require('mongodb').MongoClient
const auth = require('./auth')
const protocols = {}
const fs = require('fs')
const path = require('path')

console.log()
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

const initApplicationProtocol = async ({ siteTitle, username, password, email, adminName }, callback) => {
    console.log('init')
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
        dbExistStat = dbList.map(({ name }) => name === dbName ? callback(`${dbName} already exist in mongo database`) : true),
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
                fields:[]
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
            client.db(dbName)
                .collection(items.colName)
                .insertOne(items.data)
                .catch(() => callback(`unable to create collection ${colName}`))

            /**
             * Create admin to the database
             */
            if (CollectionsAndData.length - 1 === index) {
                // create user 
                adminDb.addUser(username, encrypt.encrypt(username, password), { roles: ['readWrite'] })
                    .catch(() => callback(`unable to create admin "${username}" to ${dbName} database`))

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
                    err ? console.log(err) : console.log('** write done')
                })

                /**
                 * Close connection
                 */
                client.close().then(() => {
                    callback(null, {
                        status: true,
                        data: {
                            msg: `${siteTitle} successfully created`
                        }
                    })
                })
            }
        })
    }).catch(err => {
        throw new Error(err)
    })
}

protocols.universalprotocol = async ({ dep, selectedCommand, username, password, token, command, section, method }) => {
    const { db, data } = dep

    return new Promise((resolve, reject) => {
        /**
         * init app handler
         */
        if (section == 'dqapp' && command == 'dqinitapp') {
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


            const validationResults = [
                siteTitleIsValid,
                usernameIsValid,
                passwordIsValid,
                emailIsValid
            ]

            /**
             * Validation results
             */
            if (validationResults.every(items => items === true)) {
                /**
                 * Initialize app
                 */
                initApplicationProtocol(data, (err, db) => {
                    if (err) {
                        reject({
                            status: false,
                            data: {
                                msg: err
                            }
                        })
                    } else {
                        if (db.status) {
                            db.data.section = 'dqapp'
                            resolve(db)
                        }
                    }
                })
            } else {
                reject('Validation failed')
            }
        } else {
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
        }
    })
}

module.exports = protocols