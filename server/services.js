const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch');
const rootDirForServices = path.join(__dirname,'../apps/services')

try {
    module.exports = (userServices) => {
        let fns = []
        userServices.map(s => {
            const file = require(`${rootDirForServices}/${s}`)
            fns.push({
                payload: file.body.initialData(null,fetch), // <-- TODO: pass psql connection on first param
                content: file.body
            })
        })
        return fns
    }
} catch(err) {
    console.log('error in serivce.js', err.message)
}

