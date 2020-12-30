const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const fs = require('fs')
const path = require('path')
const { spawn, fork } = require('child_process')
const open = require('open')
const fkill = require('fkill')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
const { async } = require('crypto-random-string')
const { on } = require('process')
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

async function start () {
  consola.info({
    message: 'Launching DONQUE',
    badge: true
  })

  // get env file content
  const envContent = fs.readFileSync(path.join(__dirname,'../.env'), 'utf-8')
  const PGUSERisNull = envContent.split('\n').indexOf('PGUSER=null') != -1
  const PGDBisNull = envContent.split('\n').indexOf('PGDATABASE=null') != -1

  // if env file is not initialized prompt for initialization
  if(PGUSERisNull && PGDBisNull) {
    consola.info({message: 'Initialization Required'})
    consola.info({message: 'Spawning init server'})

    // launch child process for initialization
    if(process.env.MODE != 'init') {

      //kill any server that is maybe running in this port infavor to run this initialization
      try {
        await fkill(':3000')
      } catch {}
      
      // spawing child process using fork
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
    } else {
      // if env variables are set
      nuxtStart()
    }
  }
}

start()

