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

// const {services} = res.locals

    systemServices(['Collections']).then(serviceContent => {
        let finalContent = []

        serviceContent.map(({payload,content}) => {
            // console.log('payload ==> ', payload)
            console.log('content ==> ', content)
            // payload ==> the initial data, an array of object
            // content ==> the name, initialData function, views object
           content.data = payload
           finalContent.push(JSON.stringify(content))
    
        })
        // res.status(200).json({response: finalContent}) /** TODO: encrypt finalContent */
    })

module.exports = {
    path: '/$dqappservices',
    handler: router
}