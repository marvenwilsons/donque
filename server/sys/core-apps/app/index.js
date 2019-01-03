// express
const express = require('express')
const router = express.Router()

//
const app = require('./app-agent')

router.get('/admin', function  incoming(req, res) {
    res.status(200).json({ response: 'hello world' })
})

router.get('/init',function incoming({res}) {
    if(app.isSet()){
        res.status(200).json(true)
    }else{
        res.status(200).json(false)
    }
})


module.exports = {
    path: '/dqapp',
    handler: router
}