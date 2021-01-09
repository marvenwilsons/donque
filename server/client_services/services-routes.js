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

/**
 * Responsilbe for getting all the services of the authenticated user
 */
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


/**
 * Responsible for initizling the app, this route is called in '/dqinit' page
 */
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

/**
 * Responsible for checking the database if user exist
 * this route is first called in '/dqlogin' page
 */
router.get('/v1/user/confirm', (req,res) => {
    console.log(req.query)
    const user = req.query.user
    res.status(200).json({
        isSuccess: true,
        msg: `Invalid: Cannot find "${user}" in the database`,
        contents: null
    })
})

/**
 * Responsible for signing in a user
 * if payload is authenticated successfully
 * this route will return a token
 * this route is first called in '/dqlogin' page
 */
router.post('/v1/user/signin', (req,res) => {
    console.log(req.body)
    // const user = req.query.user
    res.status(200).json({
        isSuccess: true,
        msg: null,
        content: {
            token: 'nvoYkjsdfkjndkjhf2983475932rksdnf'
        }
    })
})

router.get('/apt', (_, res) => {
    res.status(200).json({status: true})
})

module.exports = {
    path: '/$dqappservices',
    handler: router
}