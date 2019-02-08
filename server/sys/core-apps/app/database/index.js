const MongoClient = require('mongodb').MongoClient

const DatabaseContent = (async () => {
    console.log('initializing database')
    
    // const config = await dbAgent.readFrom('JSON','config')
    // const admins = await dbAgent.readFrom('JSON','admin')
    // const dataModels = {}

    // const Obj = {
    //     admins: {},
    //     app: {},
    //     dataModels,
    //     config: {}
    // }

    return {
        status: false,
        data:{
            msg: 'db is not initialized'
        }
    }
})()

module.exports = DatabaseContent