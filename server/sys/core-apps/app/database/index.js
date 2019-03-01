const MongoClient = require('mongodb').MongoClient
const fs = require('fs')
const path = require('path')
const security = require('../sys/cmd_lib/utils/utils').encrypt

/**
 * __dqinit
 */
const pages = path.join(__dirname, '../../../../../pages')
const __dqinit = fs.readdirSync(pages).includes('__dqinit.vue')

/**
 * ini
 */
const iniFile = fs.readdirSync(__dirname).includes('iniConf.json')


/**
 * Should get if connection is already established to start the application
 */
let con = false
let db_data_instance = undefined
let _appName = undefined
let _appState = undefined
let _currentAppState = undefined
let _isInit = undefined


/**
 * Return the database context
 */
const _db = (user, pwd) => {
    return new Promise((resolve, reject) => {
        /**
         * To perform initialization
         */
        if (!iniFile) {
            console.log('jump here')
            resolve({
                status: false,
            })
        }

        /**
         * After initialization
         */
        if (con == false && d == undefined) {
            /**
             * Local host connection
             */
            console.log('** Trying to established connection on fisrt load')
            console.log(`   [db] username: ${user}`)
            console.log(`   [db] username: ${pwd}`)
            console.log(`   [db] variable iniConf is ${iniFile ? 'present' : 'does not exist'}`)
            console.log(`   [db] assuming process is ${!iniFile ? 'app initialization' : 'api access'}`)
            const { appName, owner, } = require('./iniConf.json')

            /**
             * Credentials
             */
            const _user = user && pwd ? security.decrypt(user, owner) : null
            const _pass = user && pwd ? security.encrypt(pwd, _user) : null

            console.log(` [db] encrypting username ${_user}`)
            console.log(` [db] encrypting password ${_pwd}`)
            /**
             * Connection
             */
            MongoClient.connect(`mongodb://${_user}:${_pass}@localhost:27017/${appName}`, {
                useNewUrlParser: true
            })
                .then(data => {
                    console.log(`   [MongoDb] Success loging in Mongo Database`)
                    console.log(`   [MongoDb] user type is admin app, and admin database`)
                    //
                    con = true
                    d = data
                    _appName = appName
                    //
                    data.isOwner = _user === user ? true : false
                    data.firstLoad = true
                    //
                    resolve(data)
                })
                .catch(err => {
                    console.log('** Mongo Client Error')
                    if (!_user && iniFile) {
                        reject({
                            status: false,
                            data: {
                                msg: 'Application is already initialized'
                            }
                        })
                    } else if (_user && _pass) {
                        reject({
                            status: false,
                            data: {
                                msg: 'Authentication failed'
                            }
                        })
                    } else {
                        reject({
                            status: false,
                            data: {
                                msg: err.message
                            }
                        })
                    }
                })

        } else if (iniFile && con) {
            console.log('connecting as a application user')
            d.firstLoad = false
            d.appName = _appName
            resolve(d)
        }
    })

}

const db = async (user, pwd) => {
    console.log('** Database')
    /**
     * Container
     */
    let response = undefined
    let appState = []

    /**
     * Check ini configuration file exist
     * if the file exist it means the application has already
     * been initialized
     */
    iniFile ? appState.push('app is init') : appState.push('app is not init')

    /**
     * Check if the main admin has logged in
     */
    db_data_instance == undefined ? appState.push('main admin not connected') : appState.push('main admin connected')

    /**
     * Check database server connection
     */
    const db = await MongoClient
        .connect(`mongodb://@localhost:27017`, { useNewUrlParser: true })
        .then((client) => {
            client.close()
            return 'db connected'
        })
        .catch(() => 'db err')
    appState.push(db)

    /**
     * Inform user if the user forgots to start the database server
     */
    console.log(`   [db] Checking database connection`)
    if (appState.includes('db err')) {
        console.log(`   [db] fail connection`)
        response = {
            status: false,
            data: {
                action: null,
                msg: 'Cannot reach Mongo Db server at link localhost:27017, make sure MongoDb is installed properly and is running'
            }
        }
    } else {
        console.log(`   [db] Datbase connection OK!`)
    }

    /**
     * server is running but the ini config file is missing,
     * will assume this is a fresh download and user wants to
     * initialize the app and the database,
     * and will assume its gonna be in the localhost environment
     */
    if (!appState.includes('db err') && appState.includes('app is not init')) {
        console.log('   [db] Checking initialization conditions')
        console.log('   [db] App is not yet initialized')
        console.log('   [db] Requesting SystemInit')
        _currentAppState = 'init required'
        _isInit = false
        response = {
            // test 5 fail
            // status: true,
            // data: {
            //     actions: 'SystemInit',
            //     msg: 'init required'
            // }
            status: true,
            data: {
                action:{
                    title:'redirect', // prompt_msg, prompt_err_msg, prompt_password, propmpt_credentials, redirect,
                    content:'__dqinit'
                },
                msg: 'init required'
            }
        }
    }

    /**
     * Server is running, ini config file exsit, admin is logged in,
     * this is for the other admins api calls
     */
    if (_appState && con && db_data_instance && _appName) {
        response = {
            status: true,
            data: {
                doc: db_data_instance
            }
        }
    }

    /**
     * Server is running and ini config file exist, it means app is already initialized
     * but the owner or the principal admin needs to instantiate the initial connection first,
     * to start performing valid api calls, it means the first login
     * should be made by the one who initialized this application.  
     * the connection will be the connection used for api calls later     
     */
    if (appState.includes('app is init') && appState.includes('db connected') && appState.includes('main admin not connected')) {
        _currentAppState = 'owner login'
        _isInit = true
        console.log(`   [db] Application is initialized`)
        console.log(`   [db] Mongo Server is initialized and running`)
        console.log(`   [db] Warning Db owner is not connected`)
        /**
         * When main admin is not yet connected and tried to do api calls
         */
        const isIllegalCall = user && pwd ? false : true
        if (isIllegalCall) {
            console.log(`   [db] Db owner credentials is invalid`)
            console.log(`   [db] Illegal method call, returning an error now`)
            const msg1 = 'Cannot perform command because admin credentials is missing, Please instantiate the database connection first by logging in as the application owner, Illegal api call error'

            response = {
                status: false,
                data: {
                    ini: true,
                    msg: msg1
                }
            }
        } else {
            console.log(`   [db] Logging in db owner`)
            const dbOwner = JSON.parse(fs.readFileSync(`${__dirname}/iniConf.json`, 'utf-8'))

            console.log('   [db] Checking owner credentials')
            if (security.decrypt(dbOwner.username, dbOwner.owner) === security.encrypt(user, dbOwner.owner)) {
                console.log('   [db] Reaching database')
                /**
                 * Check password from database
                 */
                const _user = user && pwd ? security.decrypt(user, dbOwner.owner) : null
                const _pass = user && pwd ? security.encrypt(pwd, _user) : null

                const u = await MongoClient.connect(`mongodb://${_user}:${_pass}@localhost:27017/${dbOwner.appName}`, {
                    useNewUrlParser: true
                })
                    .then(doc => {
                        console.log('   [db] Authentication OK!')
                        con = true
                        db_data_instance = doc
                        _appName = dbOwner.appName
                        _appState = true
                        _appSummary = dbOwner
                        appState = []

                        doc.db_data_instance = db_data_instance
                        doc.appName = _appName
                        return {
                            status: true,
                            data: {
                                doc
                            }
                        }
                    })
                    .catch(err => {
                        console.log('   [db] Authentication fail')
                        return {
                            status: false,
                            data: {
                                msg: err
                            }
                        }
                    })
                _currentAppState = 'admin login'
                response = u
            } else {
                console.log(`   [db] "${user}" username is invalid and not the owner's username`)
                console.log(`   [db] returning an error now`)
                response = {
                    status: false,
                    data: {
                        msg: 'Authentication fail please login as the application owner'
                    }
                }
            }
        }
    }

    return new Promise(async (resolve, reject) => {
        const res = await response
        // res.data.state = _currentAppState
        console.log(res)
        if (res.status) {
            resolve(res)
        } else {
            reject(res)
        }
    })
}

module.exports = db