// express
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const p = path.join(__dirname, '../../admin assets/app/')
const appConfig = require(path.join(__dirname, '../../admin assets/app/config.json'))
const dbAgent = require('./db-agent')
const moment = require('moment')
const { SHA256 } = require('crypto-js')
const jwt = require('jsonwebtoken')

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
                isProtected: true,
                query: query
            })
        }
    } else {
        res.status(200).json({
            status: false,
            action: null,
            data: null,
            isProtected: false,
            query: query
        })
    }
})

// for app admin login
router.post('/applogin', (req, res) => {

    dbAgent.readFrom(dbAgent.mainDb(), 'admin')
        .then(data => {
            // conditions
            console.log()
            const _user = data.admins[SHA256(JSON.stringify(req.body.username)).toString()]
            const condition1 = data.admins[_user.username].password == SHA256(JSON.stringify(req.body.password) + data.admins[_user.username].___s).toString()
            const condition2 = _user.username === SHA256(JSON.stringify(req.body.username)).toString()
            const tokenRecipe = {
                ingredient1: data.admins[_user.username].password,
                ingredient2: data.admins[_user.username].username
            }

            // token
            const token = jwt.sign(tokenRecipe, _user.uId)

            // update __s

            // validation
            if (condition1 === condition2) {

                // update token
                dbAgent
                    .updateProp(dbAgent.mainDb(), 'admin', {
                        location: `admins/${data.admins[_user.username].username}`,
                        key: 'token',
                        value: token,
                        action: 'update value'
                    })
                    .then(data => {
                        console.log(data)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(200).json({
                            status: false,
                            message: err
                        })
                    })

                // return
                res.status(200).json({
                    status: true,
                    token: token,
                    username: data.admins[_user.username].username,
                    password: data.admins[_user.username].password,
                    adminHref: app.appConfig.landing
                })

            } else {
                res.status(200).json({
                    status: false
                })
            }
        })
        .catch(err => {
            // emet attempt login
            // emet username used and emet password used
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

    const adminName =
        appAgent
            .staticMethods('mass-validate', req.body.username)
            .hasSpecialCharacters(false)
            .required()
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
        adminName,
        username,
        password,
        password == req.body.repassword,
        email
    ]

    if (v.every(items => items != true)) {
        res.status(500).json(false)
    } else if (app.appConfig.adminIsSet != app.appConfig.isSet) {
        // c
        const ___s = appAgent.staticMethods('utils').generateRandomAlphabet(300, 'mix')

        dbAgent
            .addProp('JSON', 'config', {
                __s: appAgent.staticMethods('utils').generateRandomAlphabet(200, 'mix')
            })
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })

        const nObj = {
            siteTitle: req.body.siteTitle,
            siteOwner: req.body.username,
            createdOn: moment(),
            admins: {
                [SHA256(JSON.stringify(req.body.username) + app.appConfig.__s).toString()]: {
                    title: 'owner',
                    adminName: req.body.adminName,
                    username: SHA256(JSON.stringify(req.body.username)).toString(),
                    password: SHA256(JSON.stringify(req.body.password) + ___s).toString(),
                    token: '',
                    uId: req.body.uId = appAgent.staticMethods('utils').generateRandomAlphabet(20, 'mix'),
                    ___s,
                    sections: ''
                }
            }
        }

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
    console.log(req.body.username)
    if (config.isSet && req.body.username) {
        dbAgent
            .readFrom(dbAgent.mainDb(), 'admin')
            .then(data => {
                if (data.admins[req.body.username].username == req.body.username && data.admins[req.body.username].token == req.body.token) {
                    res.status(200).json({
                        status: true,
                        title: data.admins[req.body.username].title,
                        username: data.admins[req.body.username].username,
                        siteTitle: data.siteTitle,
                        adminName: data.admins[req.body.username].adminName
                    })
                } else {
                    res.status(200).json({
                        status: false
                    })
                }
            })
            .catch(err => {
                res.status(200).json({
                    status: false
                })
            })
    }

    // ************
})


module.exports = {
    path: '/dqapp',
    handler: router
}