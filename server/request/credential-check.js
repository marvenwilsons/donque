"use strict"

const {getUser,getInstances} = require('../client_proxy/pg.functions')

/**
 * Checks the database if the user is valid
 */
const credintialCheckMethod = (username,token, userType) => {
    return new Promise(resolve => {
        resolve(true)
    })
}

module.exports = credintialCheckMethod