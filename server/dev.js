const fs = require('fs')
const { spawn, fork } = require('child_process')
const open = require('open')
const fkill = require('fkill')
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const path = require('path')
const socket = require('socket.io')
const dqSocket = require('./dq-socket')
require('dotenv').config()

const { Pool } = require('pg');

const resetTestData = async () =>  {
  const pool = new Pool({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'postgres'
  })

  const deleteTestDb = await pool.query(`DROP DATABASE IF EXISTS asdfasdf`)

  fs.writeFileSync(path.join(__dirname,'../.env'), `
# Postgres
PGUSER=null
PGHOST=localhost
PGPASSWORD=null
PGDATABASE=null
PGPORT=5432
# App
SALT=null
TABLE_PREFIX=null
APP_NAME=null
DQ_PORT=3000
APP_HOST=localhost
LOGIN_ROUTE_NAME=dqlogin
  `)
  
  if(deleteTestDb) {
    const dropRole = await pool.query(`DROP ROLE IF EXISTS marven`)
    console.log('dropRole ',dropRole.command)

  }
}

async function nuxtStart (options) {
  // Import and Set Nuxt.js options
  const config = require('../nuxt.config.js')
  config.dev = process.env.NODE_ENV !== 'production'
  
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  nuxt.options.server.port = process.env.DQ_PORT
  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    console.log('DEV')
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  const server = app.listen(port, host, () => {
    console.log("DEV READY!")
    if(options && options.openBrowser) {
      open(options.openBrowser)
    }
  })
  
  // io socket ready
  console.log('IO Socket Ready')
  const IO_Instance = socket(server)
  dqSocket(IO_Instance)

  console.log(`READY server listening on http://${host}:${port}`)
}

async function start (isNotInit) {
  resetTestData()

  consola.info({
    message: 'Launching DONQUE ON DEVELOPMENT MODE',
    badge: true
  })

  // if env file is not initialized prompt for initialization
  if(isNotInit) {
    consola.info({message: 'Initialization Required'})
    consola.info({message: 'Spawning init server'})

    // launch child process for initialization
    if(process.env.MODE != 'init') {


      //kill any server that is maybe running in this port infavor to run this initialization
      try {
        await fkill(`:${process.env.DQ_PORT}`)
      } catch {}
      
      /**
       * spawing child process using fork child_process
       * PREPARING FOR CHILD PROCESS RUN
       * 1. set env MODE to init -> this will cause for this block of code to run when start() function run
       * 2. set MODE_ENV env to production -> this will cause to run in production when start() function run
       */

      /**
       * Run the start() function with ENV set
       * this will run server, or the nuxtStart() function
       */
      const initializationProcess  = fork('server/index.js', {
        env: {
          MODE: 'init',
          NODE_ENV: 'development',
        },
        silent: true,
      })

      /**
       * listinig to the child process data event
       * when the steam of string logs has the word READY on it it will
       * 1. open a browser of the url dqinit
       */
      initializationProcess.stdout.on('data', (data) => {

        // removing new lines on logs and logging back to terminal
        const childLogs = data.toString().replace('\n', '')
        console.log('donque ==>',childLogs)

        /**
         * when the server is ready launch default browser to redirect to the initialization page
         * it is espected that this file will run only in localhost so I didn't bother making
         * the host part dynamic
         */
        if(childLogs.split('READY').length != 1) {
          open(`http://localhost:${process.env.DQ_PORT}/dqinit`)
        }
      })



      // listening to child on message
      initializationProcess.on('message', (p) => {
        /**
         * if app/init/init.js send's a msg that says done
         */
        if(p.msg === 'done') {
          console.log('Killing Process')

          /**
           * exit or kill the forked child process which then will trigger
           * the ininitializationProcessi.om('close') function below
           */
          initializationProcess.kill()
          
          /**
           * after performing the initilization steps, app/init/init.js
           * will send msg 'done', which then will trigger an application build just
           * to make sure the app will run on its latest files added.
           * 
           * the build process will be spawn as a child process
           */
          const appBuilding = spawn('npm run build', {shell: true})

          /**
           * Display building stream logs to terminal
           * trim the next line
           */
          appBuilding.stdout.on('data' , (data) => {
            const appBuildingLog = data.toString().replace('\n', '')
            console.log('donque ==>', appBuildingLog)
          })

          /**
           * after the build, the spawned command will exit which will
           * trigger a start
           * 
           * start(false) --> the false value is like telling the start function
           * that app is already initialized, which will execute's the second condition
           * of the if statement 'else'
           */
          appBuilding.stdout.on('close', () => start(false))
        }

      })

      // listining to initializationProcess on close
      initializationProcess.on('close', () => {
        console.log('donque ==> Done! Closing child process')
      })
    } else {
      // if env variables are set and process.env.MODE == 'init'
      if(process.env.MODE != 'init') {
        nuxtStart({
          openBrowser: `http://${process.env.APP_HOST}:${process.env.DQ_PORT}/${process.env.LOGIN_ROUTE_NAME}`
        })
      } else {
        nuxtStart()
      }
    }
  } else {
    consola.log('donque ==> Serving first load')
    nuxtStart({
      openBrowser: `http://${process.env.APP_HOST}:${process.env.DQ_PORT}/${process.env.LOGIN_ROUTE_NAME}`
    })
  }
}

// get env file content
const envContent = fs.readFileSync(path.join(__dirname,'../.env'), 'utf-8')
const PGUSERisNull = envContent.split('\n').indexOf('PGUSER=null') != -1
const PGDBisNull = envContent.split('\n').indexOf('PGDATABASE=null') != -1

// launch
start(PGUSERisNull && PGDBisNull)





