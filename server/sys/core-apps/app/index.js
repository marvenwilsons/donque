// express
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

// for general public
router.get('/app', (req, res) => {
    const query = req.query.content
    res.status(200).json({message:'OK'})
})

// for app admin login
const App = require('./main/main')
router.post('/applogin', ({body:{username,password}}, res) => {
    console.log(username)
    console.log(password)
    res.status(200).json('OK')
    // const InitailizeNewUser = App(username,password,null,null,'UserLogin',null)j
})

// for initializing app
router.post('/initapp', ({body:{siteTitle,username,password,email,adminName,repassword}}, res) => {
})

// for admin actions
router.post('/_dq', (req, res) => {
    // ************
})


module.exports = {
    path: '/dqapp',
    handler: router
}