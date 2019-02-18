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
    cardinal({
        username,
        password,
        token,
        data,
        command,
        section,
        method:'POST'
    }).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        console.log('oopppsie')
        console.log(err)
        res.status(204).json(err)
    })
})

router.get('/_dq', async ({ query: { username, password, token, data, command, section} },res) => {
    const response = await cardinal({
        username,
        password,
        token,
        data,
        command,
        section,
        method:'GET'
    })
    console.log('get response')
    console.log(command)
    res.status(200).json(response)
})

module.exports = {
    path: '/dqapp',
    handler: router
}