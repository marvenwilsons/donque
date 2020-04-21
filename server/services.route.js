const express = require('express')
const router = express.Router()
const auth = require('./sevices.auth')
const getList = require('./services.getlist')
const systemServices = require('./services')


router.get('/service', auth, getList, (req,res) => {
    const {services} = res.locals
    let finalContent = []
    const serviceContent = systemServices(services)
    serviceContent.map(({payload,content}) => {
        // const deserializeContent = new Function('return ' + content.toString())()
       content.data = payload
       finalContent.push(JSON.stringify(content))

    })
    if(services) {
        res.status(200).json({response: finalContent} /** TODO: encrypt finalContent */)
    }
})

module.exports = {
    path: '/$dqappservices',
    handler: router
}