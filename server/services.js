const fs = require('fs')
const path = require('path')

const rootDirForServices = path.join(__dirname,'../apps/services')
const getServices = fs.readdirSync(rootDirForServices)

try {
    const services = getServices.map(serviceFile =>  require(`${rootDirForServices}/${serviceFile}`))
    module.exports = services
} catch(err) {
    console.log('ERROR', err.message)
}