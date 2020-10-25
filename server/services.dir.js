const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch');
const rootDirForServices = path.join(__dirname,'../apps/services')


try {
    module.exports = function (dirName) {
        return function (userServices) {
            console.log('handling directory')

            const serviceFiles = fs.readdirSync(rootDirForServices)
            const p = serviceFiles.map(dir => {
                const serviceData = require(`${rootDirForServices}/${dirName}/data.js`)
                return serviceData(null, fetch) 
            })

            Promise.all(p)
            .then(res => {
                const servicePkg =  userServices.map((e,i) => {
                    const file = require(`${rootDirForServices}/${e}`)
                    return {
                        payload: res[i], 
                        content: file.body
                    }
                })
                resolve(servicePkg)
            })
        }
    }
} catch(err) {
    console.log('error in serivce.js', err.message)
}
