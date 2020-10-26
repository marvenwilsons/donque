const path = require('path')
const fetch = require('node-fetch');

try {
    module.exports = function(rootDirForServices,fd) {
        return function (userServices) {
            return new Promise((resolve,reject) => {
                const userServicesDataPkg = userServices.map(e=> {
                    if(`${e}.js` == fd) {
                        const file = require(`${rootDirForServices}/${e}`)
                        return file.body
                        .initialData(null,fetch) // <-- TODO: pass psql connection on first param
                    }
                    
                })
                Promise.all(userServicesDataPkg)
                .then(res => {
                    const servicePkg =  userServices.map((e,i) => {
                        if(`${e}.js` == fd) {
                            const file = require(`${rootDirForServices}/${e}`)
                            return {
                                payload: res[i], 
                                content: file.body
                            }
                        }
                    })

                    for(let i = 0; i < servicePkg.length; i++) {
                        if(servicePkg[i] === undefined) {
                            servicePkg.splice(i,1)
                        }
                    }

                    resolve(servicePkg)
                })

            })
        }
    }
} catch(err) {
    console.log('error in serivce.js', err.message)
}
