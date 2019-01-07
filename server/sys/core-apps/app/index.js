// express
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const p = path.join(__dirname, '../../admin assets/app/')
const appConfig = require(path.join(__dirname, '../../admin assets/app/config.json'))
const dbAgent = require('./db-agent')
const app = require('./app-agent')

router.get('/app', ({ res }) => {
    const isInit = fs.existsSync(path.join(__dirname, '../../admin assets/app/temp.json'))
    res.status(200).json(isInit)
})

router.post('/applogin', (req, res) => {
    const tempJSON = require(path.join(__dirname, '../../admin assets/app/temp.json'))

    dbAgent.readFrom(dbAgent.mainDb(), tempJSON)
        .then(data => {
            if (data.username === req.body.username && data.password === req.body.password) {
                res.status(200).json({
                    status: true,
                    token: 'asjdhkfjhdsklfh82734'
                })
            } else {
                res.status(200).json({
                    status: false
                })
            }
        })
        .catch(err => {
            res.status(200).json({
                status: false,
                err: err
            })
        })
})

router.post('/initapp', function incoming(req, res) {
    // validate then init app
    const arr = [
        // should not have white spaces
        req.body.siteTitle.indexOf(" ") == -1,
        req.body.username.indexOf(" ") == -1,

        // should be more than 2 char
        req.body.siteTitle.length > 2,
        req.body.username.length >= 6,

        // special characters
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim.exec(req.body.username) == null,
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim.exec(req.body.siteTitle) == null,

        // email
        req.body.email.indexOf('@') != -1,
        req.body.email.indexOf('.') != -1,
        req.body.email.indexOf('.com') != -1

    ]

    if (arr.every(e => e == true)) {
        dbAgent
            .createDb('JSON', 'temp',req.body)
            .then(data => {
                res.status(200).json(true)
            })
            .catch(err => {
                res.status(500).json(false)
            })

    } else {
        res.status(500).json(false)
    }

})

router.get('/init', function incoming({ res }) {
    if (app.isSet()) {
        res.status(200).json(true)
    } else {
        res.status(200).json(false)
    }
})


module.exports = {
    path: '/dqapp',
    handler: router
}