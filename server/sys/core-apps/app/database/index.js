const DatabaseContent = (async () => {
    
    const dbAgent = require('./db-agent')
    
    let config = await dbAgent.readFrom('JSON','config')
    let admins = await dbAgent.readFrom('JSON','admin')

    const Obj = {
        admins: admins.admins,
        app: admins,
        config
    }

    return Obj
})()

module.exports = DatabaseContent