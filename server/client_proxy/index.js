const express = require('express')
const router = express.Router()


router.post('/initialize-app', ({body: {firstName,lastName,username,password,appName}},res) => {
    //
    console.log(firstName)
})

module.exports = {
    path: '/app',
    handler: router
}