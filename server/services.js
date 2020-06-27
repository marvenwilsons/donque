const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch');
const rootDirForServices = path.join(__dirname,'../apps/services')

try {
    module.exports = (userServices) => {
        return new Promise((resolve,reject) => {
            let fns = []
            userServices.map(s => {
                const file = require(`${rootDirForServices}/${s}`)
                file.body
                .initialData(null,fetch) // <-- TODO: pass psql connection on first param
                .then(res => {
                    fns.push({
                        payload: res, 
                        content: file.body
                    })
        
                    resolve(fns)
                })
                
            })
        })
    }
} catch(err) {
    console.log('error in serivce.js', err.message)
}

