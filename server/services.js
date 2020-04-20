const fs = require('fs')
const path = require('path')

const rootDirForServices = path.join(__dirname,'../apps/services')
const getServices = fs.readdirSync(rootDirForServices)

try {
    module.exports = (userServices) => {
        let fns = {}
        userServices.map(s => {
            const rawfile = fs.readFileSync(`${rootDirForServices}/${s}.js`,'utf8')
            const nRawFile = rawfile.replace('module.exports = ','')
            
            const file = require(`${rootDirForServices}/${s}`)
            fns = {
                payload: file.data(), // <-- pass sql api and fetch dependecy here
                content: nRawFile
            }
        })
        return fns
    }
} catch(err) {
    console.log('error in serivce.js', err.message)
}

