const fs = require('fs')
const path = require('path')

const rootDirForServices = path.join(__dirname,'../apps/services')
const getServices = fs.readdirSync(rootDirForServices)

try {
    module.exports = (userServices) => {
        let fns = []
        userServices.map(s => {
            const file = require(`${rootDirForServices}/${s}`)
            fns.push({
                payload: file.data(), // <-- TODO: pass sql api and fetch dependecy here
                content: file.body
            })
        })
        return fns
    }
} catch(err) {
    console.log('error in serivce.js', err.message)
}

