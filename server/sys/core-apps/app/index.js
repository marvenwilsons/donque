// express
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const p = path.join(__dirname, '../../admin assets/app/')
const appConfig = require(path.join(__dirname, '../../admin assets/app/config.json'))
const dbAgent = require('./db-agent')
const moment = require('moment')

const _app = require('./app')

// app agent
const appAgent = require('./app-agent')
const app = new appAgent

// user agent
const userAgent = require('./user-agent')

// for general public
router.get('/app', (req, res) => {
    const query = req.query.content
    if (app.appConfig.adminIsSet == app.appConfig.isSet) {
        // get protected routes list
        if (app.protectedPublicRoutes.indexOf(query) == -1) {
            res.status(200).json({
                status: true,
                action: null,
                query: query,
                isProtected: false,
                data: 'hello'
            })
        } else {
            // general public page, but requires member auth
            res.status(200).json({
                status: false,
                action: 'promt-auth',
                isProtected:true,
                query:query
            })
        }
    } else {
        res.status(200).json({
            status: false,
            action: null,
            data: null,
            isProtected: false,
            query:query
        })
    }
})

// for app admin login
router.post('/applogin', (req, res) => {
    dbAgent.readFrom(dbAgent.mainDb(), 'admin')
        .then(data => {
            if (data.admins[req.body.username].username === req.body.username && data.admins[req.body.username].password === req.body.password) {
                res.status(200).json({
                    status: true,
                    token: data.admins[req.body.username].token,
                    username: data.admins[req.body.username].username,
                    password: data.admins[req.body.username].password,
                    adminHref: app.appConfig.landing
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

// for initializing app
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
            .hasSpecialCharacters(false)
            .hasWhiteSpace(false)
            .required()
            .isTrue(req.body.siteTitle.length > 2)
            .done()

    const username =
        appAgent
            .staticMethods('mass-validate', req.body.username)
            .hasSpecialCharacters(false)
            .hasWhiteSpace(false)
            .required()
            .isTrue(req.body.username.length > 6)
            .done()

    const password =
        appAgent
            .staticMethods('mass-validate', req.body.password)
            .hasSpecialCharacters()
            .isTrue(req.body.password.length > 6)
            .required()
            .done()

    const email =
        appAgent
            .staticMethods('mass-validate', req.body.email)
            .required()
            .done()

    // b.
    const v = [
        siteTitle,
        username,
        password,
        password == req.body.repassword,
        email
    ]

    if (v.every(items => items != true)) {
        res.status(500).json(false)
    } else if (app.appConfig.adminIsSet != app.appConfig.isSet) {
        // c.            
        const nObj = {
            siteTitle:req.body.siteTitle,
            siteOwner:req.body.username,
            createdOn: moment(),
            admins: {
                [req.body.username] : {
                    title: 'owner',
                    username: req.body.username,
                    password: req.body.password,
                    sessionId: req.body.sessionId = appAgent.staticMethods('utils').generateRandomAlphabet(15, 'mix'),
                    tokenlife: req.body.tokenExpyrDate = undefined,
                    token: req.body.autToken = appAgent.staticMethods('utils').generateRandomAlphabet(100, 'mix'),
                    uId: req.body.uId = appAgent.staticMethods('utils').generateRandomAlphabet(20, 'mix'),
                    sections: ''
                }
            }
        }
        // req.body.password = appAgent.staticMethods('utils').hash(req.body.password)


        dbAgent
            .createDb('JSON', 'admin', nObj)
            .then(data => {
                res.status(200).json(true)
            })
            .catch(err => {
                res.status(500).json(false)
            })
    }
})

// for admin actions
router.post('/_dq', (req, res) => {
    //
    const config = app.appConfig
    
    if(config.isSet){
        dbAgent
        .readFrom(dbAgent.mainDb(),'admin')
        .then(data => {
            if(data.admins[req.body.username].username == req.body.username && data.admins[req.body.username].token == req.body.token){
                res.status(200).json({
                    title: data.admins[req.body.username].title,
                    username: data.admins[req.body.username].username,
                    siteTitle: data.siteTitle
                })
            }else{
                console.log('no')
            }
        })

    }

    // ************
})


module.exports = {
    path: '/dqapp',
    handler: router
}