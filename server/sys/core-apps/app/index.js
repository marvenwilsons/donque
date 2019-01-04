// express
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

//
const app = require('./app-agent')

router.get('/admin', function incoming(req, res) {
    res.status(200).json({ response: 'hello world' })
})

router.post('/initapp', function incoming(req, res) {
    // validate then init app
    const p = path.join(__dirname, '../../admin assets/json/')

    const arr = [
        req.body.siteTitle.indexOf(" ") == -1,
        req.body.username.indexOf(" ") == -1,
        req.body.password.indexOf(" ") == -1,
        req.body.repassword.indexOf(" ") == -1,
        req.body.email.indexOf(" ") == -1

    ]

    if (arr.every(e => e == true)) {
        fs.writeFile(`${p}/temp.json`, JSON.stringify(req.body),
            (err) => {
                if (err) {
                    res.status(500).json(false)
                } else {
                    res.status(200).json(true)
                }
            })
    }else{
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