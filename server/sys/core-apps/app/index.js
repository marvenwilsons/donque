// express
const express = require('express')
const router = express.Router()

//
const app = require('./app-agent')

router.get('/users', function  incoming(req, res) {
    res.status(200).json({ response: 'hello world' })
})

router.get('/init',function incoming(req,res) {
    
    // this is what an initialized app looks like
    // app.name != undefined
    // app.users != 0
    // app.owner != undefined
    // app.userIsSet == true
    // app.appIsSet == true
})


module.exports = {
    path: '/dqapp',
    handler: router
}