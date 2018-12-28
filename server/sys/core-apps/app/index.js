// express
const express = require('express')
const router = express.Router()

// cli realated
router.post('/users', (req, res) => {
    res.status(200).json({ response: 'hello world' })
})

module.exports = {
    path: '/dqapp',
    handler: router
}