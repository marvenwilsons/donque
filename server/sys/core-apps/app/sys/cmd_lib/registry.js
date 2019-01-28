const AdminActions = require('./admin/methods')
const PageMethods = require('./page/methods')

const registry = (() => {
    return {
        AdminActions,
        PageMethods
    }
})()

module.exports = registry