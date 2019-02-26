// express
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const cardinal = require('./sys/cardinal')

// for general public
router.get('/app', (req, res) => {
    res.status(200).json("OK!")
})

router.post('/_dq', async ({ body: { username, password, token, data, command, section } }, res) => {
    return cardinal({
        username,
        password,
        token,
        data,
        command,
        section,
        method:'POST'
    }).then((data) => {
        console.log('success')
        console.log(data)
        res.status(200).json(data)
    }).catch((err) => {
        console.log('oopppsie')
        console.log(err)
        res.status(200).json(err)
    })
})

router.get('/_dq', async (req,res) => {
    let _req = req.query.content
    _req.method = 'GET'
    
    if(_req === 'init'){
       const re_i = await cardinal({})
       res.status(200).json(re_i)
    }

    // const response = await cardinal({
    //     username,
    //     password,
    //     token,
    //     data,
    //     command,
    //     section,
    //     method:'GET'
    // })
    console.log('get response')
    // res.status(200).json(response)
})

module.exports = {
    path: '/dqapp',
    handler: router
}