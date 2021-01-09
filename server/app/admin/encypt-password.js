const bcrypt = require('bcrypt')
const { async } = require('crypto-random-string')
const b = require('bcrypt')
module.exports = async function(password) {
    const saltRound = 10
        const salt = await b.genSalt(saltRound)
        const bcryptPassword = await b.hash(password, salt)

        return bcryptPassword
}