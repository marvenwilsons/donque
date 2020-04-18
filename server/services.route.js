const express = require('express')
const router = express.Router()

router.use((req,res,next) => {
    console.log('serives middleware')
    // console.log(req.url.split())
    next()
})

router.get('username/api', (req,res) => {
    console.log('service route')
})

module.exports = {
    path: '/services',
    handler: router
}