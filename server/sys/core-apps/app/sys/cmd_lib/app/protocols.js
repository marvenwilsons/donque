const validator = require('../utils/utils').validator
const MongoClient = require('mongodb').MongoClient
const protocols = {}

protocols.dqinitapp = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: null,
            funcIsDestructive: false
        }
    },
    dqinitapp() {

    }
}

const init = ({ siteTitle, username, password, email, adminName }, callback) => {
    const dbName = `dq_${siteTitle}`

    /**
     * Connect and create dq database
     */
    MongoClient.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            callback('unable to connect to MongoDb server', null)
        } else {
            const adminDb = client.db(dbName).admin()

            adminDb.listDatabases((err, dbs) => {

                /**
                 * Check if db already exist
                 */
                const dbDoesNotExist = dbs.databases.map(({ name }) => {
                    if (name === dbName) {
                        callback(`${dbName} database already exist in mongo database`)
                    } else {
                        return true
                    }
                })

                /**
                 * If database name does not yet exist 
                 */
                if (dbDoesNotExist.every(items => items == true)) {
                    const cols = [
                        // dq_app collection
                        {
                            colName: 'dq_app', data: {
                                siteTitle,
                                siteOwner: adminName,
                                created: new Date,
                                currentLiveAdmins: []
                            }
                        },
                        // dq_admins collection
                        {
                            colName: 'dq_admins', data: {
                                adminName,
                                username,
                                password,
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
                        },
                        // dq_config collection
                        {
                            colName: 'dq_config', data: {
                                adminLanding: 'admin',
                                protectedRoutes: []
                            }
                        }
                    ]

                    /**
                     *  save to database
                     */
                    cols.map((e, i) => {
                        client.db(dbName).collection(e.colName).insertOne(e.data, (err, result) => {
                            if (err) {
                                callback(`Unable to create collection ${e.colName}`, null)
                            }
                        })

                        if (cols.length - 1 == i) {
                            /**
                             * Create new database admin
                             * Note! dq admin and db admin are two different things
                             * so if an admin can do crud in certain parts of the applications it
                             * doesnt mean that admin can do crud or has access to mongoDb database
                             * app admin and db admin are not similar
                             */
                            adminDb.addUser(username,password, {
                                roles:['dbOwner']
                            },(err,result) => {
                                if(err){
                                    callback('Unable to create new admin',null)
                                }
                            })
                            

                            /**
                             * Close database connection
                             */
                            client
                                .close()
                                .then(data => {
                                    callback(null, {
                                        status: true,
                                        data: {
                                            msg: `${siteTitle} successfully created`
                                        }
                                    })
                                })
                                .catch(err => {
                                    callback(err, null)
                                })
                        }
                    })
                }
            })
        }
    })
}

const checkpermission = (permissions) => {

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
                init(data, (err, db) => {
                    if (err) {
                        reject(err)
                    } else {
                        if (db.status){
                            resolve(db)
                        }
                    }
                })
            } else {
                reject('Validation failed')
            }
        } else {

        }
    })
}

module.exports = protocols