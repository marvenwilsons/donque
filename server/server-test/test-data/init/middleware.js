const { Pool } = require('pg');

module.exports = ({data : {applicationName, databaseName, databaseUsername, tablePrefix, databasePassword, user},method}) => {


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

                if(dropRole) {
                    console.log('Executing')
                    setTimeout(arg, 1500);
                }
            }
        } catch(err) {}
    }
    
    
    resetTestData()
    setTimeout(() => {
        resetTestData(method(applicationName, databaseName, databaseUsername, tablePrefix, databasePassword, user))
    }, 1000);
}