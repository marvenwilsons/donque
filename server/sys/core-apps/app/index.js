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
    const response =  await cardinal({
        username,
        password,
        token,
        data,
        command,
        section,
        method:'POST'
    })
    res(response)
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
    console.log(response)
    res(response)
})

module.exports = {
    path: '/dqapp',
    handler: router
}