const express = require('express')
const router = express.Router()
const auth = require('./sevices.auth')
const getList = require('./services.getlist')
const systemServices = require('./services')


router.get('/service', auth, getList, (req,res) => {
    // console.log('service route')
    const {services} = res.locals
    if(services) {
        res.status(200).json(systemServices(services))
    }
})

module.exports = {
    path: '/$dqappservices',
    handler: router
}