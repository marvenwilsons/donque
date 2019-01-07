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

        }
    }
}

module.exports = _json