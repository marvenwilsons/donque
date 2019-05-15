const adminMethods = require('./admin/methods')
const pageMethods = require('./page/methods')
const dqapp = require('./app/protocols')
const logger = require('./logger/methods')

const registry = (() => {
    return {
        adminMethods,
        pageMethods,
        dqapp,
        logger
    }
})()

module.exports = registry