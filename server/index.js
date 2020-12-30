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

  const envContent = fs.readFileSync(path.join(__dirname,'../.env'), 'utf-8')
  const PGUSERisNull = envContent.split('\n').indexOf('PGUSER=null') != -1
  const PGDBisNull = envContent.split('\n').indexOf('PGDATABASE=null') != -1
  if(PGUSERisNull && PGDBisNull) {
    consola.info({
      message: 'Initialization Required'
    })
    consola.info({
      message: 'Spawning init server'
    })

    if(process.env.MODE != 'init') {
      /**
       * launch child process for initialization
       */

      /**
       * kill any server that is running in this port infavor to run this
       * initialization
       */
      try {
        await fkill(':3000')
      } catch {}

      const initializationProcess  = fork('server/index.js', {
        env: {
          MODE: 'init',
          NODE_ENV: 'production',
          ...process.env
        },
        silent: true
      })


      initializationProcess.stdout.on('data', (data) => {
        const childLogs = data.toString().replace('\n', '')
        console.log('donque ==> ',data.toString().replace('\n', ''))

        if(childLogs.split('READY').length != 1) {
          open('http://localhost:3000/dqinit')
        }
      })
    } else {
      /**
       * Child process for init
       */
      nuxtStart()
      // process.stdout.on('data', (data) => {
      //   console.log('data ==> ', data)
      // })
      // process.send({msg: 'hello'})

    }
    
    

    
    /**
     * File is located in apps/init/init
     * its a minimal vue app
     * Install init dependecy
     */
    // const installInitDep = () => {
    //   return spawn('npm install', {
    //     stdio: 'inherit',
    //     shell: true,
    //     cwd: path.join(__dirname,'../apps/init/init')
    //   })
    // }

    /**
     * Run's the vue server, this app is for initializing dq only
     */
    // const runInitProg = async () => {
    //   setTimeout(() => {
    //     open('http://localhost:3000')
    //   }, 15000);
    //   return spawn(`vue-cli-service serve --port ${network.port}`, {
    //     stdio: 'inherit',
    //     shell: true,
    //     cwd: path.join(__dirname,'../apps/init/init')
    //   })
    // }


    /**
     * Chain run, install dependecies then run the vue server
     */
    // installInitDep()
    // .on('exit', runInitProg)
    // .on('data', () => {
    //   console.log('data')
    // })

  } else {

  }

  // Determine if app initialized
  // if app is initialized go to login screen
  // if app is not initialized spwan a web server for initialization

  

  // nuxtStart()
}

start()

