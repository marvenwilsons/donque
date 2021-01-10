const admin = require('./admin')
const collection = require('./collection')
const services = require('./services')
const encryptPassword = require('./encypt-password')

module.exports = {
    ...admin,
    ...services,
    ...collection,
    encryptPassword
}