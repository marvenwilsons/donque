// express
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

// for general public
router.get('/app', (req, res) => {
    res.status(200).json("OK!")
})

// for app admin login
const App = require('./Application/main/main')
router.post('/applogin', ({body:{username,password}}, res) => {
    console.log('/applogin')
    const InitailizeNewUser = App(username,password,null,null,'UserLogin',null)
    res.status(200).json('OK')
})

// for initializing app
router.post('/initapp', ({body:{siteTitle,username,password,email,adminName,repassword}}, res) => {
})

// for admin actions
router.post('/_dq', (req, res) => {
})


module.exports = {
    path: '/dqapp',
    handler: router
}