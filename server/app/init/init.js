const { Pool } = require('pg');
const { async } = require('crypto-random-string');
const fs = require('fs')
const path = require('path')

// queries
const envContent = require('./env_content')
const createPgUser = require('./pg_dq_users')
const createDqService = require('./pg_dq_service')
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
})

// v1 app init
function init (applicationName, databaseName, databaseUsername, tablePrefix, databasePassword) {
    return new Promise(async (resolve,reject) => {
        try {
            console.log('==> Initialize application!')
            // 1. Create database using the default postgres database credintials
            const cl = await pool.connect()
            pool.query(`CREATE DATABASE ${databaseName}`)
            .then(r => {
                console.log(`==> Database ${databaseName} created`)
                return true
            })
            .then(async (p) => {
                return new Promise((resolve,reject) => {
                    if(p == true) {
                        console.log(`==> Creating Environment Variables`)
        
                        // 2. Create a .env file containing user defined database
                        fs.writeFileSync(path.join(__dirname,'../../.env'),envContent(databaseUsername,databasePassword,databaseName,tablePrefix,applicationName))
                        resolve(true)
                    } else {
                        throw '==> Fail in creating database'
                    }
                })
            })
            .then(async (p) => {
                // Create DB user
                if(p) {
                    console.log(`==> Creating DB User`)
                    return await pool.query(`CREATE USER ${databaseUsername}`)
                } else {
                    console.log(process.env.PGUSER)
                    throw 'Failed Creating Database'
                }
            })
            .then(async (p) => {
                if(p) {
                    console.log(`==> Altering Database User and user Setting Password`)
                    return await pool.query(`ALTER USER ${databaseUsername} PASSWORD '${databasePassword}'`)
                } else {
                    throw 'Failed setting database password'
                }
            })
            .then(async (p) => {
                // Grant user privileges
                if(p) {
                    console.log(`==> Assign user to "${databaseName}" database`)
    
                    const assignUserToDb = await pool.query(`GRANT ALL PRIVILEGES ON DATABASE ${databaseName} TO ${databaseUsername}`)
                    return assignUserToDb
                } else {
                    throw 'Failed granting privileges to user'
                }
            }) 
            .then(async (p) => {
                // Create app tables
                if(p.command == 'GRANT') {
                    cl.release()
                    return pool.end().then(() => {
                        console.log("==> Default Postgres Pool Ended")
                        return true
                    })
                } else {
                    throw 'Failed closing connection'
                }
            })
            .then(async (p) => {
                if(p) {
                    const udb = new Pool({
                        host: 'localhost',
                        port: 5432,
                        user: databaseUsername,
                        password: databasePassword,
                        database: databaseName
                    })
    
                    console.log('==> Creating Extension uuid-ossp')
                    udb
                    .query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
                    .then(r => {
                        console.log('==> Creating Table dq_users')
                        if(r) {
                            return udb.query(createPgUser)
                        }
                    })
                    .then(r => {
                        console.log('==> Creating Table dq_services')
                        return udb.query(createDqService)
                    })
                    .then(r => {
                        console.log('==> Creating Table Collections')
                        return udb.query(createDqService)
                    })
                    .then(r => {
                        console.log('==> Dq Successfuly Initialized')
                        resolve(true)
                    })
                    
                }
            })
            .catch(err => {
                console.log(`==> Initializing DQ Failed`)
                cl.release()
                pool.end().then(() => {
                    console.log("==> Default Postgres Pool Ended")
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