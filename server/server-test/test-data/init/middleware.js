const { Pool } = require('pg');

module.exports = async ({data : {applicationName, databaseName, databaseUsername, tablePrefix, databasePassword, user},method}) => {


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
                    console.log('Executing')
                    // const methodResponse =  await arg()
                    // console.log(methodResponse)
                    arg(applicationName, databaseName, databaseUsername, tablePrefix, databasePassword, user).then(() => {
                        console.log('test')
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