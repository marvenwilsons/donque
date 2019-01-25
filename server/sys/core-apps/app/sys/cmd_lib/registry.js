const { adminlogin } = require('./admin/methods')

const registry = (() => {
    return {
        'admin':{
            adminlogin,
            read:{
                
            }
        }
    }
})()

module.exports = registry