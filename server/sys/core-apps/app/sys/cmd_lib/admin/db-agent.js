const JSON_handler = require('./interfaces/JSON_interface')

let dbAgent = {}

// READ
dbAgent.readFrom = (dbType, dbName) => {
    return new Promise((resolve, reject) => {
        //
        dbAgent.dbHandler(dbType, dbName, 'read', null, null, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

// CREATE - add new entry to the database selected
dbAgent.addProp = (dbType, dbName, data) => {
    return new Promise((resolve, reject) => {
        dbAgent.dbHandler(dbType, dbName, 'create/entity', null, data, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

// CREATE - create a new database
// data can be a big object
dbAgent.createDb = (dbType, dbName, data) => {
    return new Promise((resolve, reject) => {
        dbAgent.dbHandler(dbType, dbName, 'create/database', null, data, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

// UPDATE - rename a db
dbAgent.renameDb = (dbType, oldName, newName) => {
    return new Promise((resolve, reject) => {
        dbAgent.dbHandler(dbType, dbName, 'update/database', null, { old: oldName, new: newName }, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

// UPDATE - update a record from the database selected
// dbAgent
//     .updateProp('JSON', 'config', {
//         location: null,
//         key: '__s',
//         value: 'marven wilson donque',
//         action: 'update value'
//     })
dbAgent.updateProp = (dbType, dbName, data) => {
    return new Promise((resolve, reject) => {
        dbAgent.dbHandler(dbType, dbName, 'update/entity', null, data, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}


// REMOVE - remove an entry from the database selecteed
// query: {keyName: 'valueName'}
dbAgent.removeProp = (dbType, dbName, query) => {
    return new Promise((resolve, reject) => {
        dbAgent.dbHandler(dbType, dbName, 'delete/entity', query, null, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

// REMOVE - delete database
dbAgent.deleteDb = (dbType, dbName) => {
    return new Promise((resolve, reject) => {
        dbAgent.dbHandler(dbType, dbName, 'delete/database', null, null, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

// can be any method
dbAgent.queryFrom = (dbType, dbName, query) => {
    return new Promise((resolve, reject) => {
        dbAgent.dbHandler(dbType, dbName, '*', query, null, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

//
dbAgent.dbHandler = (dbType, dbName, method, query, data, callback) => {
    const currentSupportedDbs = ['JSON', 'sql', 'mongoDB', 'firebase']

    if (currentSupportedDbs.indexOf(dbType) != -1) {
        switch (dbType) {
            case 'sql':
                const SQL = new sql_handler
                SQL.action(dbName, method, query, data, (err, res) => {
                    if (err) {
                        callback(err, null)
                    } else {
                        callback(false, res)
                    }
                })
                break
            case 'mongoDB':
                const MONGO = new mongoDB_handler
                MONGO.action(dbName, method, query, data, (err, res) => {
                    if (err) {
                        callback(err, null)
                    } else {
                        callback(false, res)
                    }
                })
                break
            case 'JSON':
                const _JSON = new JSON_handler
                _JSON.action(dbName, method, query, data, (err, res) => {
                    if (err) {
                        callback(err, null)
                    } else {
                        callback(false, res)
                    }
                })
                break
            case 'firebase':
                firebase_handler.action(dbName, method, query, data, (err, res) => {
                    if (err) {
                        callback(err, null)
                    } else {
                        callback(false, res)
                    }
                })
                break
        }
    } else {
        callback(
            `[dbHandler] ${dbType} is not supported as a database`,
            null
        )
    }
}

module.exports = dbAgent
