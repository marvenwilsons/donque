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
router.post('/_dq', ({body:{username,password,token,data,command,section}}, res) => {
    
    // init new admin
    // const InitailizeNewUser = App(body)
    
    // return
    // InitailizeNewUser
    // .then(data => {
    //     res.status(200).json(data)        
    // })
    // .catch(err => {
    //     console.log(err)
    // })
})

module.exports = {
    path: '/dqapp',
    handler: router
}