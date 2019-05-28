console.log('** db ins')

const MongoClient = require('mongodb').MongoClient
const fs = require('fs')
const path = require('path')
const security = require('../app_lib/utils/index').encrypt
var colors = require('colors');

/**
 * __dqinit
 */
console.log('** db ins --> getting pages')
console.log(path.join(__dirname, '../../pages'))
const pages = path.join(__dirname, '../../pages')

console.log('** db ins --> checking dqinit.vue page')
const __dqinit = fs.readdirSync(pages).includes('__dqinit.vue')

/**
 * ini
 */
const manifest_dir = path.join(__dirname, '../app_manifest')
const iniFile = fs.readdirSync(manifest_dir).includes('iniConf.json')


/**
 * Should get if connection is already established to start the application
 */
let con = false
let db_data_instance = undefined
let _appName = undefined
let _appState = undefined

module.exports = async (user, pwd) => {
    console.log('** Database')
    console.log('')

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
    fs.readdirSync(manifest_dir).includes('iniConf.json') ? appState.push('app is init') : appState.push('app is not init')

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
        console.log(`   [db] Error: fail on connecting`.red.bold)
        console.log(`   [db] Error: database server is not running`.red.bold)
        console.log(`   [db] Error: database enterface cannot be reached`.red.bold)
        response = {
            status: false,
            data: {
                actions: [{
                    title: 'prompt_err'
                }],
                msg: 'Cannot reach Mongo Db server at link localhost:27017, make sure MongoDb is installed properly and is running'
            }
        }
    } else {
        console.log(`   [db] Database connection established`)
    }

    /**
     * server is running but the ini config file is missing,
     * will assume this is a fresh download and user wants to
     * initialize the app and the database,
     * and will assume its gonna be in the localhost environment
     */
    if (!appState.includes('db err') && appState.includes('app is not init') && iniFile === false) {
        console.log('   [db] Checking initialization conditions')
        console.log('   [db] App is not yet initialized')
        console.log('   [db] Requesting SystemInit')
        _currentAppState = 'init required'
        _isInit = false
        response = {
            status: true,
            data: {
                ini: false,
                actions: [{
                    title: 'redirect', // prompt_msg, prompt_err_msg, prompt_password, propmpt_credentials, redirect,
                    content: '__dqinit'
                }],
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
        console.log(`   [db] Error: Db owner or app owner connection is not initialized`.red.bold)
        /**
         * When main admin is not yet connected and tried to do api calls
         */
        const isIllegalCall = user && pwd ? false : true
        if (isIllegalCall) {
            console.log(`   [db] Error: Db owner credentials is invalid`.red.bold)
            console.log(`   [db] Error: Illegal method call, returning an error now`.red.bold)
            const msg1 = 'Cannot perform command because admin credentials is missing, Please instantiate a connection first from app to db by logging in as the application owner'

            response = {
                status: false,
                data: {
                    ini: true,
                    msg: msg1,
                    actions: [
                        {
                            title: 'prompt_err'
                        },
                        {
                            title: 'redirect',
                            content: 'dqlogin'
                        }
                    ]
                }
            }
        } else {
            console.log(`   [db] Logging in db owner`)
            const dbOwner = JSON.parse(fs.readFileSync(`${manifest_dir}/iniConf.json`, 'utf-8'))

            console.log('   [db] Checking owner credentials')
            if (security.decode(security.encrypt(user, dbOwner.owner), dbOwner.owner) === user) {
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
                    .catch(() => {
                        console.log('   [db] Authentication fail')
                        return {
                            status: false,
                            data: {
                                msg: 'Incorrect password or username',
                                actions: []
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
                        actions: [{
                            title: 'prompt_err'
                        }],
                        msg: 'Authentication fail please login as the application owner'
                    }
                }
            }
        }
    }

    return new Promise(async (resolve, reject) => {
        const res = await response

        if (res.status) {
            resolve(res)
        } else {
            reject(res)
        }
    })    
}