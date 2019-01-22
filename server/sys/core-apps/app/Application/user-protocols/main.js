const ValidateUserLogin = require('./validate-user-login')
const ValidateUserMain = require('./validate-user-main')
const ValidateUserPermission = require('./validate-user-permissions')
const UserIsLogged = require('./user-is-already-logged')

const ValidationMethods = {
    ValidateUserLogin,
    ValidateUserMain,
    ValidateUserPermission,
    UserIsLogged
}

module.exports = ValidationMethods