const templates = require('./templates')
const {Client} = require('pg') 
const pg = require('pg')
const express = require('express')
const router = express.Router()

// create a postgresql client
// const client = new Client({
//     user: 'marvenwilsons',
//     password: 'sakura900',
//     host: 'Servers',
//     database: 'socratica'
// })


// client
// .connect()
// .then(res => {
//     console.log('connected successfully')
// })
// .catch(err => {
//     console.log('connection error: \n',err)
// })

// get services

module.exports = {
    path: '/dqapp',
    handler: router
}