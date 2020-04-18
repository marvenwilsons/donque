const express = require('express')
const router = express.Router()

router.get(':cred', (req,res) => {
    console.log('service route')

    console.log('serives middleware')
    const u = req.url.split('/')
    u.shift()
    console.log(u)
    res.status(200).json("OK!")
})

module.exports = {
    path: '/$dqappservices',
    handler: router
}