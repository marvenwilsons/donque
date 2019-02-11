const AdminActions = require('./admin/methods')
const PageMethods = require('./page/methods')
const dqapp = require('./app/protocols')

const registry = (() => {
    return {
        AdminActions,
        PageMethods,
        dqapp
    }
})()

module.exports = registry