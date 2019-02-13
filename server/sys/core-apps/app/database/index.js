const MongoClient = require('mongodb').MongoClient
const fs = require('fs')
const path = require('path')

/**
 * __dqinit
 */
const pages = path.join(__dirname, '../../../../../pages')
const __dqinit = fs.readdirSync(pages).includes('__dqinit.vue')

/**
 * ini
 */
const iniFile = fs.readdirSync(__dirname).includes('iniConf.json')

if(iniFile){
    // delete __dqinit.vue file
}

// MongoClient.connect(`mongodb://marven:marven@localhost:27017/shop`, { 
//     useNewUrlParser: true 
// })
// .then(data => {
//     console.log(data)
// })
// .catch(err => {
//     console.log('this is error')
//     console.log(err)
// })

const db = (user,pwd) => {
    /**
     * Connect
     */


    /**
     * Return database
     */
}

module.exports = db