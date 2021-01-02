const express = require('express')
const router = express.Router()
const systemServices = require('./services')
const db = require('../db/index')
const appInit = require('../app/init/init')


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
router.post('/v1/initialize', async (req,res) => {
    const {firstName, lastName, applicationName, username, password, email, databaseName, databaseUsername, tablePrefix, databasePassword} = req.body
    appInit(applicationName,databaseName, databaseUsername, tablePrefix, databasePassword)
    .then(resp => {
        console.log('responding!')
        res.status(200).json({
            status: resp
        })
    })
})

router.get('/apt', (_, res) => {
    res.status(200).json({status: true})
})

module.exports = {
    path: '/$dqappservices',
    handler: router
}