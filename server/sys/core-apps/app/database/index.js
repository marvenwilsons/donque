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
 * Return the database context to the current user
 */
const db = (user, pwd) => {
    return new Promise((resolve,reject) => {


        if (iniFile && !con) {
            /**
             * Local host connection
             */
            console.log('Connecting of fisrt load')
            console.log(con)
            const { appName, owner, } = require('./iniConf.json')

            /**
             * Credentials
             */
            const _user = security.decrypt(user, owner)
            const _pass = security.encrypt(pwd, _user)

            /**
             * Connection
             */
            MongoClient.connect(`mongodb://${_user}:${_pass}@localhost:27017/${appName}`, {
                useNewUrlParser: true
            })
                .then(data => {
                    console.log('** [MongoDb] Success loging in Mongo Database')
                    console.log('** [MongoDb] user type is admin app, and admin database')
                    //
                    con = true
                    d = data
                    _appName = appName
                    //
                    data.applicationUserType = 'appAdminAndUserAdmin'
                    data.isOwner = _user === user ? true : false
                    //
                    resolve(data)
                })
                .catch(err => {
                    console.log('** Mongo Client Error')
                    if (err.message == 'Authentication failed.' && con == false){
                        reject({
                            status:false,
                            data:{
                                msg: 'Connection to database is not yet established, system cannot perform any validation, please login as a database admin'
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
            d.applicationUserType = 'appUser'
            d.appName = _appName
            resolve(d)
        }
    })

}

module.exports = db