const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch');
const { dirname } = require('path');
const rootDirForServices = path.join(__dirname,'../apps/services')


try {
    module.exports = function (rootDirForServices, fileName) {
        return function (userServices) {
            return new Promise((resolve,reject) => {
                // console.log('handling directory ', rootDirForServices, fileName)

                const serviceFiles = fs.readdirSync(rootDirForServices)
                
                const userServicesDataPkg = serviceFiles.map(dir => {
                    const serviceData = require(`${rootDirForServices}/${dir}/data.js`)
                    return serviceData(null, fetch) 
                })
    
                Promise.all(userServicesDataPkg)
                .then(res => {
                    const servicePkg =  serviceFiles.map((e,i) => {
                        const file = require(`${rootDirForServices}/${e}/data.js`)
                        const content = {
                            name: e.split('|').length == 2 ? e.split('|')[0] : e,
                            initialData: require(`${rootDirForServices}/${e}/data.js`),
                            views: (() => {
                                const arrayConfig = require(`${rootDirForServices}/${e}/views/array/config.js`)
                                // console.log('arrayConfig ',arrayConfig)
                                const regex = /\urn {([^}]+)\}/g;
                                let m
                                while ((m = regex.exec(arrayConfig)) !== null) {
                                    // This is necessary to avoid infinite loops with zero-width matches
                                    if (m.index === regex.lastIndex) {
                                        regex.lastIndex++;
                                    }
                                    
                                    // The result can be accessed through the `m`-variable.
                                    m.forEach((match, groupIndex) => {
                                        console.log(`Found match, group ${groupIndex}: ${match}`);
                                    });
                                }

                            })()
                        }

                        console.log('content ==> ',content)

                        // return {
                        //     payload: res[i], 
                        //     content: file.body
                        // }
                    })
                    resolve(servicePkg)
                })
            })
        }
    }
} catch(err) {
    console.log('error in serivce.js', err.message)
}
