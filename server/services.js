const fs = require('fs')
const path = require('path')
const rootDirForServices = path.join(__dirname,'../apps/services')


const serviceFiles = fs.readdirSync(rootDirForServices)
serviceFiles.map(file => {
    if(fs.lstatSync(`${rootDirForServices}/${file}`).isDirectory()) {
        // module.exports = require('./services.dir.js')(rootDirForServices,file)
    } else {
        module.exports = require('./services.file.js')(rootDirForServices,file)
    }
})
