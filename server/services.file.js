const path = require('path')
const fetch = require('node-fetch');

try {
    module.exports = function(rootDirForServices) {
        return function (userServices) {
            return new Promise((resolve,reject) => {
                const p = userServices.map(e=> {
                    const file = require(`${rootDirForServices}/${e}`)
                    return file.body
                    .initialData(null,fetch) // <-- TODO: pass psql connection on first param
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

            })
        }
    }
} catch(err) {
    console.log('error in serivce.js', err.message)
}
