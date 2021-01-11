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
const fs = require('fs')
const path = require('path')
const config = require('../../../server/config/config')

/**
 * SQL Table Creation Queries
 */
const envContent = require('./en-content')
const createPgUser = require('./pg-dq-users')
const createDqService = require('./pg-dq-service')
const createDqCollections = require('./pg-dq-collection')
const createDqPages = require('./pg-dq-pages')
const createTitles = require('./pg-dq-titles')

/**
 * ADMIN METHODS
 */
const addAdmin = require('../admin/addAdmin')
const encryptPassword = require('../admin/encypt-password');
const adminMethods = require('../admin/index');

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

function init (applicationName, databaseName, databaseUsername, tablePrefix, databasePassword, user) {
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
                        fs.writeFileSync(path.join(__dirname,'../../../.env'),envContent(databaseUsername,databasePassword,databaseName,tablePrefix,applicationName))
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
                    
                    // Create uuid-ossp extension to be used on table primary keys
                    console.log('Creating Extension uuid-ossp')
                    udb
                    .query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

                    // create table users
                    .then(async (ready) => {
                        if(ready) {
                            console.log('Creating Table dq_users')
                            return await udb.query(createPgUser)
                        }
                        
                    })
                    .catch(err => console.log(err))

                    // create table services
                    .then(async (ready) => {
                        if(ready) {
                            console.log('Creating Table dq_services')
                            return await udb.query(createDqService)
                        }
                        
                    })
                    .catch(err => console.log(err))

                    // create table collection
                    .then(async (ready) => {
                        if(ready) {
                            console.log('Creating Table Collections')
                            return await udb.query(createDqCollections)
                        }
                    })
                    .catch(err => console.log(err))

                    // create table pages
                    .then(async (ready) => {
                        if(ready) {
                            console.log('Creating Table Collections')
                            return await udb.query(createDqPages)
                        }
                    })
                    .catch(err => console.log(err))

                    // create table titles
                    .then(async (ready) => {
                        if(ready) {
                            console.log('Creating Table Titles')
                            return await udb.query(createTitles)
                        }
                    })
                    .catch(err => console.log(err))

                    // Add first user to user table, add owner to users table on registration
                    .then(async (ready) => {
                        if(ready) {
                            console.log('Adding User To Users Table')
                            const u = {
                                user_email: user.email,
                                user_password: await adminMethods.encryptPassword(user.password), /** enrypt */
                                username: user.username,
                                user_firstName: user.firstName,
                                user_lastName: user.lastName,
                                user_title: 'owner',
                                user_settings: '{"setting": ""}'
                            }

                            const result = await addAdmin(udb, u)

                            if(process.env.NODE_ENV == 'development') {
                                // confirming INSERT INTO dq_users
                                const confirm_insert = await udb.query('SELECT * FROM dq_users')
                                console.log(confirm_insert.rows)
                            }

                            return result
                        }
                    })
                    .catch(err => console.log(err))

                    // add services
                    .then(async (ready) => {
                        if(ready) {
                            console.log("Adding User Default Services")
                            const defaultServices = config.adminDefaults.defaultServices

                            /**
                             * Add default admin services to dq_services table
                             * default services is an array can be found in adminDefaults property
                             * in config/config.ks
                             */
                            const op = defaultServices.map(async serviceName => {
                                const service_config = {}
                                const service_body = {}
                                console.log('TODO! 876-oiud')
                                return new Promise(async (resolve,reject) => {
                                    const result = await adminMethods.addService(udb, {
                                        service_title: serviceName,

                                        /** TODO: Runtime configuration of the service */
                                        service_config: JSON.stringify(service_config),

                                        /** TODO: service body is the code that is stringyfied then hashed */
                                        service_body: JSON.stringify(service_body),

                                        /**
                                         * Data fetching method, there are only two options, collection or 3rd party
                                         * if 3rd party this is the domain example: example.com
                                        */
                                        initial_data_fetching_method: 'collection',

                                        /** 
                                         * this is the route path 
                                        */
                                        initial_data_fetching_path: 'collection/sample'
                                    })

                                    /** return the row count */
                                    resolve (await result.rowCount == 1 ? true : false)
                                })
                            })

                            return await Promise.all(op).then(async (values) => {

                                /** Development terminal logs */
                                if(process.env.NODE_ENV == 'development') {
                                    // confirming INSERT INTO dq_service
                                    const confirm_insert = await udb.query(`SELECT * FROM dq_service`)
                                    console.log('\n\nCONFIRMING INSERT INTO dq_service')
                                    console.log(confirm_insert.rows)
                                }

                                /** if every value in the array is true return it else throw an error */
                                const isAllTrue = values.every((v) => v == true)
                                
                                if(isAllTrue) {
                                    return isAllTrue
                                } else {
                                    throw 'Error while inserting default services'
                                }
                            }).catch(err => {
                                console.log(err)
                            })
                        }
                    })
                    .catch(err => console.log(err))

                    // end process
                    .then(async (ready) => {
                        if(ready) {
                            console.log('Dq Successfuly Initialized')
                            process.send({msg: 'done'})
                            resolve(true)
                        }
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