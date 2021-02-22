const { Pool } = require('pg');

module.exports = async ({data : {applicationName, databaseName, databaseUsername, tablePrefix, databasePassword, user},method}, cb) => {


    const resetTestData = async (arg) =>  {
        console.log('RESETING TEST ENVIRONMENT')
        const pool = new Pool({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'postgres',
            database: 'postgres'
        })

        const deleteTestDb = await pool.query(`DROP DATABASE IF EXISTS asdfasdf`)
        
        try{
            if(deleteTestDb) {
                const dropRole = await pool.query(`DROP ROLE IF EXISTS marven`)

                if(dropRole && arg) {
                    /** The init function */
                    const init = await arg(applicationName, databaseName, databaseUsername, tablePrefix, databasePassword, user)
                    init.on('progress', (data) => {
                        console.log(data)
                    })
                    init.on('error', (err) => {
                        if(err != 'process.send is not a function') {
                            console.log('middleware: ',err)
                        }
                    })
                    init.on('done', (val) => {
                        console.log('test dome!', val)
                        cb(val)
                    })
                }
            }
        } catch(err) {}
    }
    
    
    resetTestData()
    setTimeout(() => {
        resetTestData(method)
    }, 1000);
}