const express = require('express')
const router = express.Router()
const path = require('path')
const cli_engine = require('./cli_engine')

router.post('/dqcli',(req,res) => {
    const user_input = req.body.data.split(" ")
    cli_engine.set(user_input,(output) => {
        res.status(200).json({ response: output })
    })
})

module.exports = {
    path: '/dq',
    handler: router
}