const dbMethods = {}

// create new database admin
adminMethods.createDbAdmin = {
    // @dqsys: admin: todo: createDbAdmin()
}
// kill database connection
dbMethods.killDbConnection = {
    get prop() {
        return {
            allowedtitle: ['owner'],
            funcIsDestructive: true
        }
    },
    killDbConnection() {
        // @dqsys: admin: todo: killDbConnection()

    }
}

module.exports = dbMethods