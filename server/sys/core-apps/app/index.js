// express
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const p = path.join(__dirname, '../../admin assets/app/')
const appConfig = require(path.join(__dirname, '../../admin assets/app/config.json'))
const dbAgent = require('./db-agent')
const appAgent = require('./app-agent')
const app = new appAgent
const userAgent = require('./user-agent')

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

    /** Checklist
     *      a. validate req.body
     *      b. confirm validation
     *      c. create db
     */


    // a. 
    const siteTitle =
        appAgent
            .staticMethods('mass-validate', req.body.siteTitle)
            .hasCapitalLetters()
            .isTrue(req.body.siteTitle.length > 2)
            .done()
    
    const username = 
        appAgent
            .staticMethods('mass-validate', req.body.username)

    // b.
    const v = [
        siteTitle
    ]

    if (v.every(items => items != true)) {
        res.status(500).json(false)
    } else {
        res.status(200).json(true)
    }

    // c.


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
        // assign access level as owner
        // add token property
        // add logins property
        // 
        const user = {}

        dbAgent
            .createDb('JSON', 'temp', req.body)
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

router.post('/init', function incoming(req, res) {

    //
    const config = app.adminConfig

    //
    if (config.isSet && req.body.componentName == config.landing) {
        // get app's current admin
        // return admin object
        console.log(config.isSet)

        console.log('yes')
    } else {
        console.log('no')
        res.status(200).json(false)
    }

    if (true) {
        res.status(200).json(req.body)
    } else {
        res.status(200).json(false)
    }
})


module.exports = {
    path: '/dqapp',
    handler: router
}