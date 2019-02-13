const adminMethods = require('./admin/methods')
const PageMethods = require('./page/methods')
const dqapp = require('./app/protocols')

const registry = (() => {
    return {
        adminMethods,
        PageMethods,
        dqapp
    }
})()

module.exports = registry