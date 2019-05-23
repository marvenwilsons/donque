// express
const express = require('express')
const router = express.Router()
const cardinal = require('./cardinal')

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
        method: 'POST'
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

router.get('/_dq', async (req, res) => {
    let _req = req.query.content
    _r = req === 'init' ? {} : req.query

    cardinal(_r).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(200).json(err)
    })
})

module.exports = {
    path: '/dqapp',
    handler: router
}