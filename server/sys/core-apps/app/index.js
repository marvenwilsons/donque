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
const cardinal = require('./sys/cardinal')
router.post('/_dq', async ({ body: { username, password, token, data, command, section } }, res) => {
    const response =  await cardinal(body)
    res(response)
})

module.exports = {
    path: '/dqapp',
    handler: router
}