const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

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

function start () {
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

    console.log(process.argv)

    const child = spawn('npm run serve', {
      stdio: 'inherit',
      shell: true,
      cwd: path.join(__dirname,'../apps/init/init')
    })
  }

  // Determine if app initialized
  // if app is initialized go to login screen
  // if app is not initialized spwan a web server for initialization

  

  // nuxtStart()
}

start()