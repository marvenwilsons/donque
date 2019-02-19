const adminMethods = require('./admin/methods')
const PageMethods = require('./page/methods')
const dqapp = require('./app/protocols')
const logger = require('./logger/methods')

const registry = (() => {
    return {
        adminMethods,
        PageMethods,
        dqapp,
        logger
    }
})()

module.exports = registry