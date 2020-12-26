const express = require('express')
const router = express.Router()
const systemServices = require('./services')
const cryptoRandomString = require('crypto-random-string');
const fs = require('fs')
const path = require('path')
const db = require('../db/index')


// Middlewares
const auth = require('./middlewares/services/sevices.auth')
const getList = require('./middlewares/services/services.getlist')
const appCheck = require('./middlewares/global/app-check.js')

require('dotenv').config()

// Get admin services
router.get('/service', appCheck, auth, getList,(req,res) => {
    const {services} = res.locals
    systemServices(services).then(serviceContent => {
        let finalContent = []

        serviceContent.map(({payload,content}) => {
           content.data = payload
           finalContent.push(JSON.stringify(content))
    
        })
        res.status(200).json({response: finalContent}) /** TODO: encrypt finalContent */
    })
})


// Initialize app
const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
})

router.post('/v1/initialize', async (req,res) => {
    const {firstName, lastName, applicationName, username, password, email, databaseName, databaseUsername, tablePrefix, databasePassword} = req.body
    try {
        console.log('==> Initialize application!')
        // 1. Create database using the default postgres database credintials
        pool.connect()
        pool.query(`CREATE DATABASE ${databaseName}`)
        .then(r => {
            console.log(`==> Database ${databaseName} created`)
            return true
        })
        .then(() => {
            console.log(`==> Creating Environment Variables`)

            // 2. Create a .env file containing user defined database
            const envContent = `
# Postgres
PGUSER=${databaseUsername}
PGHOST=localhost
PGPASSWORD=${databasePassword}
PGDATABASE=${databaseName}
PGPORT=5432
# App
SALT=${cryptoRandomString({length: 20})}
APP_NAME=${applicationName}
                        `
            fs.writeFile(path.join(__dirname,'../../.env'),envContent, (err) => {
                if(err) {
                    console.log(err)
                }
            })

        })
        .then(async () => {
            // Create DB user
            console.log(`==> Creating DB User`)
            const createUserResult = await pool.query(`CREATE USER ${databaseUsername} WITH PASSWORD '${databasePassword}' CREATEDB`)
            console.log(createUserResult)
            if(createUserResult) {
                pool.end()
            }
        })
        .catch(err => {
            console.log(err)
            console.log(`==> Initializing DQ Failed`)
        })
    }catch(err) {
        console.log(err.message)
        if(err.code == '3D000') {
            // 1. Create Database
            
            // 2. Update .env file database name
            console.log('Creating Enviroment Variables')

            // res.status(200).json({
            //     detail: 'Request Failed',
            //     error: `Cannot find ${databaseName} in postgres database then refence the name in .env file`,
            //     solution: `Create a database in postgres database named ${databaseName}`
            // })
        }
    }
    
})

module.exports = {
    path: '/$dqappservices',
    handler: router
}