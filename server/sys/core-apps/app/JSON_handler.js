const fs = require('fs')
const dbLoc = require('../../admin assets/app/config')
const path = require('path')
const p = path.join(__dirname, '../../admin assets/')
class _json {



    action(dbName, _method, query, data, callback) {
        const method = _method.split('/')[0]
        const methodOpt = _method.split('/')[1]

        switch (method) {
            case 'read':
                const res = JSON.parse(JSON.stringify(dbName))
                if(typeof res != 'object'){
                    callback(`[JSON handler] please wrap in require statement : ${dbName}`)
                }else{
                    return callback(null, JSON.parse(JSON.stringify(dbName)))
                }
                break
            case 'create':
                if (methodOpt == 'entity') {

                }
                else if (methodOpt == 'database') {
                    const loc = JSON.parse(JSON.stringify(dbLoc)).jsonDir
                    const _loc = `${p}${loc}/${dbName}.json`
                    
                    fs.writeFile(_loc, JSON.stringify(data),(err,res) => {
                        if(err){
                            console.log('this?')
                            callback(true, null)
                        }else{
                            callback(false,{
                                status: true,
                                message: `successfully created ${dbName} database`
                            })
                        }
                    })

                }
                break

        }
    }
}

module.exports = _json