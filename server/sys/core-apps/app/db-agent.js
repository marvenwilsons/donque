dbAgent = {}

// 
dbAgent.readFrom = (dbType, dbName, callback) => {
    return new Promise((resolve, reject) => {
        //
        dbAgent.dbHandler(dbType, dbName, 'read', (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

//
dbAgent.dbHandler = (dbType, dbName, method, callback) => {
    const currentSupportedDbs = ['JSON', 'sql', 'mongoDB']

    if (currentSupportedDbs.indexOf(dbType) != -1) {
        switch (dbType) {
            case 'sql':
                break
            case 'mongoDB':
                break
            case 'JSON':
                break
        }
    } else {
        callback(
            `[dbHandler] ${dbType} is not supported as a database`,
            null
        )
    }
}

//
dbAgent.queryFrom = (dbType, dbName, callback) => {

}















//************************* */
dbAgent.readFrom('sql', 'users', (err, res) => {
    if (err) throw err

    console.log(res)
})
