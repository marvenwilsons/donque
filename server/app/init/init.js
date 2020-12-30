/** 
 * App Init. v.1.0.0
 * Documented and created by: Marven Wilson Donque
 * 
 * this file must only execute on a localhost environment
 * 
 * This file is run by a child process,
 * the environment variable file is created and being populate on run time,
 * for security reasons this system cannot access environment variables created
 * on run time therefore it has to be run in a child process to create the 
 * necessary files and initialization steps.
 * 
 * When initialization steps is completed the child process will exit
 * then the parent process will rebuild the application, in this point in time
 * the user defined environment variables is included in build process, after
 * the build process dq will run the application, prompting the user for login.
 */

 /** */
const { Pool } = require('pg');
const { async } = require('crypto-random-string');
const fs = require('fs')
const path = require('path')

/**
 * SQL Table Creation Queries
 */
const envContent = require('./env_content')
const createPgUser = require('./pg_dq_users')
const createDqService = require('./pg_dq_service')
const createDqCollections = require('./pg_dq_collection')

/**
 * Using the default postgres credentials and database to
 * create a pool
 */
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
})

function init (applicationName, databaseName, databaseUsername, tablePrefix, databasePassword) {
    return new Promise(async (resolve,reject) => {
        try {
            console.log('Initialize application!')
            /**
             * Creating a postgres pool using the default postgres credentials
             * which is user postgres and password postgres
             * 
             * then we login to the default postgres database to create the user defined
             * database
             * 
             * after creating the user defined database, we then proceed on creating the env file
             * and populating it with the user defined properties
             * 
             * then create a user to be assigned to the user defined database
             * 
             * we then create the essential tables on the user defined database
             */

             /**
              * Creating the user defined database
              */
            const cl = await pool.connect()
            pool.query(`CREATE DATABASE ${databaseName}`)
            .then(r => {
                console.log(`Database ${databaseName} created`)
                return true
            })

            /**
             * Creating the user defined enviroment variables
             */
            .then(async (p) => {
                return new Promise((resolve,reject) => {
                    if(p == true) {
                        console.log(`Creating Environment Variables`)
        
                        // 2. Create a .env file containing user defined database
                        fs.writeFileSync(path.join(__dirname,'../../.env'),envContent(databaseUsername,databasePassword,databaseName,tablePrefix,applicationName))
                        resolve(true)
                    } else {
                        throw '==> Fail in creating database'
                    }
                })
            })

            /**
             * Creating a postgres user, with username
             * this will create a postgres ROLE, the postgres ROLE is sthe
             * user defined database username
             */
            .then(async (p) => {
                // Create DB user
                if(p) {
                    console.log(`Creating DB User`)
                    return await pool.query(`CREATE USER ${databaseUsername}`)
                } else {
                    console.log(process.env.PGUSER)
                    throw 'Failed Creating Database'
                }
            })

            /**
             * Altering newly create user to set the user database password
             */
            .then(async (p) => {
                if(p) {
                    console.log(`Altering Database User and user Setting Password`)
                    return await pool.query(`ALTER USER ${databaseUsername} PASSWORD '${databasePassword}'`)
                } else {
                    throw 'Failed setting database password'
                }
            })

            /**
             * Assigning the newly created user to the user defined database
             * now the user can manage the user defined database
             */
            .then(async (p) => {
                // Grant user privileges
                if(p) {
                    console.log(`Assign user to "${databaseName}" database`)
    
                    const assignUserToDb = await pool.query(`GRANT ALL PRIVILEGES ON DATABASE ${databaseName} TO ${databaseUsername}`)
                    return assignUserToDb
                } else {
                    throw 'Failed granting privileges to user'
                }
            })

            /**
             * then we release and close the default postgres connection
             */
            .then(async (p) => {
                // Create app tables
                if(p.command == 'GRANT') {
                    cl.release()
                    return pool.end().then(() => {
                        console.log("Default Postgres Pool Ended")
                        return true
                    })
                } else {
                    throw 'Failed closing connection'
                }
            })

            /**
             * Creating a new pool using the user defined credentials to
             * create the essential tables 
             */
            .then(async (p) => {
                if(p) {
                    const udb = new Pool({
                        host: 'localhost',
                        port: 5432,
                        user: databaseUsername,
                        password: databasePassword,
                        database: databaseName
                    })
    
                    console.log('Creating Extension uuid-ossp')
                    udb
                    .query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
                    .then(r => {
                        console.log('Creating Table dq_users')
                        if(r) {
                            return udb.query(createPgUser)
                        }
                    })
                    .then(r => {
                        console.log('Creating Table dq_services')
                        return udb.query(createDqService)
                    })
                    .then(r => {
                        console.log('Creating Table Collections')
                        return udb.query(createDqCollections)
                    })
                    .then(r => {
                        console.log('==> Dq Successfuly Initialized')
                        resolve(true)
                    })
                    
                }
            })

            /**
             * Logging Errors in the terminal
             */
            .catch(err => {
                console.log(`Initializing DQ Failed`)
                cl.release()
                pool.end().then(() => {
                    console.log("Default Postgres Pool Ended")
                    return true
                })
                console.log(`ERROR: `,err)
            })
        }catch(err) {
            console.log(err.message)
        }
    })
}

module.exports = init