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
let d = undefined
let _appName = undefined


/**
 * Return the database context
 */
const db = (user, pwd) => {
    return new Promise((resolve,reject) => {
        /**
         * To perform initialization
         */
        !iniFile && resolve(true)

        /**
         * After initialization
         */
        if (con == false && d == undefined) {
            /**
             * Local host connection
             */
            console.log('** Connecting on fisrt load')
            const { appName, owner, } = require('./iniConf.json')

            /**
             * Credentials
             */
            const _user = user && pwd ? security.decrypt(user, owner) : null
            const _pass = user && pwd ? security.encrypt(pwd, _user) : null

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
                    if(!_user && iniFile){
                        reject({
                            status:false,
                            data: {
                                msg: 'Application is already initialized'
                            }
                        })
                    }else if(_user && _pass){
                        reject({
                            status: false,
                            data: {
                                msg: 'Authentication failed'
                            }
                        })
                    }else{
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

module.exports = db