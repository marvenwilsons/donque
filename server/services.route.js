const express = require('express')
const router = express.Router()
const auth = require('./sevices.auth')
const getList = require('./services.getlist')
const systemServices = require('./services')


router.get('/service', auth, getList,(req,res) => {
    const {services} = res.locals

    systemServices(services).then(serviceContent => {
        let finalContent = []

        serviceContent.map(({payload,content}) => {
           content.data = payload
           finalContent.push(JSON.stringify(content))
    
        })
        res.status(200).json({response: finalContent}) /** TODO: encrypt finalContent */
    })
})

module.exports = {
    path: '/$dqappservices',
    handler: router
}