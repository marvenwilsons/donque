const fs = require('fs')
const { spawn, fork } = require('child_process')
const open = require('open')
const fkill = require('fkill')
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const path = require('path')
require('dotenv').config()


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function nuxtStart () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

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
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

async function start (isNotInit) {
  consola.info({
    message: 'Launching DONQUE',
    badge: true
  })

  // if env file is not initialized prompt for initialization
  if(isNotInit) {
    consola.info({message: 'Initialization Required'})
    consola.info({message: 'Spawning init server'})

    // launch child process for initialization
    if(process.env.MODE != 'init') {
      new Nuxt(config)


      //kill any server that is maybe running in this port infavor to run this initialization
      try {
        await fkill(':3000')
      } catch {}
      
      // spawing child process using fork
      consola.log('donque ==> Setting ENV')
      const initializationProcess  = fork('server/index.js', {
        env: {
          MODE: 'init',
          NODE_ENV: 'production',
          ...process.env
        },
        silent: true
      })

      // listinig to the child process data event
      initializationProcess.stdout.on('data', (data) => {

        // removing new lines on logs and logging back to terminal
        const childLogs = data.toString().replace('\n', '')
        console.log('donque ==>',childLogs)

        // when the server is ready launch default browser to redirect
        // to the initialization page
        if(childLogs.split('READY').length != 1) {
          open('http://localhost:3000/dqinit')
        }
      })

      // listening to child on message
      initializationProcess.on('message', ({msg}) => {
        console.log('donque ==> Closing child process')
        if(msg == 'done') {
          initializationProcess.kill()

          const appBuilding = spawn('npm run build', {
            shell: true,
          })

          appBuilding.stdout.on('data' , (data) => {
            const appBuildingLog = data.toString().replace('\n', '')
            console.log('donque ==>', appBuildingLog)
          })

          appBuilding.stdout.on('close', () => {
            const envContent = fs.readFileSync(path.join(__dirname,'../.env'), 'utf-8')

            consola.log(envContent)
            start(false)
          })
        }
      })

      // listining to child on close
      initializationProcess.on('close', () => {
        console.log('donque ==> Closing child process')
      })
    } else {
      // if env variables are set
      // consola.log(process.env)
      nuxtStart()
    }
  } else {
    consola.log('donque ==> Serving first load')
    // consola.log(fs.readFileSync(path.join(__dirname,'../.env'), 'utf-8'))
  }
}

// get env file content
const envContent = fs.readFileSync(path.join(__dirname,'../.env'), 'utf-8')
const PGUSERisNull = envContent.split('\n').indexOf('PGUSER=null') != -1
const PGDBisNull = envContent.split('\n').indexOf('PGDATABASE=null') != -1

// launch
start(PGUSERisNull && PGDBisNull)



