const fs = require('fs')
const dbLoc = require('../../admin assets/app/config')
const path = require('path')
const p = path.join(__dirname, '../../admin assets/app')
class _json {



    action(dbName, _method, query, data, callback) {
        const method = _method.split('/')[0]
        const methodOpt = _method.split('/')[1]

        switch (method) {
            case 'read':
                const requestDb = `${dbName}.json`

                if (fs.readdirSync(p).indexOf(requestDb) != -1){
                    const content = fs.readFileSync(`${p}/${requestDb}`, 'utf-8')
                    return callback(null, JSON.parse(content))
                }else{
                    callback(`[JSON handler] there is no such database : ${dbName}`)
                }
                break
            case 'create':
                if (methodOpt == 'entity') {

                }
                else if (methodOpt == 'database') {
                    const loc = JSON.parse(JSON.stringify(dbLoc)).jsonDir
                    const _loc = `${p}${loc}/${dbName}.json`
                    
                    fs.writeFile(_loc, JSON.stringify(data,null,'\t'),(err,res) => {
                        if(err){
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