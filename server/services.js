const fs = require('fs')
const path = require('path')

const rootDirForServices = path.join(__dirname,'../apps/services')
const getServices = fs.readdirSync(rootDirForServices)

try {
    module.exports = (userServices) => {
        let fns = []
        userServices.map(s => fns.push(require(`${rootDirForServices}/${s}`)))
        return fns
    }
} catch(err) {
    console.log('error in serivce.js', err.message)
}