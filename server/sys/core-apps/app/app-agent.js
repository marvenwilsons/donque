const path = require('path')
const appConfig = require(path.join(__dirname, '../../admin assets/app/config.json'))
const _appConfig = JSON.parse(JSON.stringify(appConfig))
const staticValidate = require('./static-validate')

class dqApp {
    constructor(appTitle, appDescription, admin) {
        this.appTitle = appTitle
        this.appDescription = appDescription
        this.admin = admin
        this.users = undefined
    }
    //getters
    get adminConfig() {
        return {
            isSet: typeof JSON.parse(JSON.stringify(appConfig)) == 'object' && Object.keys(_appConfig).length != 0,
            landing: _appConfig.adminLanding
        }
    }

    static staticMethods(name, data) {
        if (name == 'validate') {
            return {
                isString: value => typeof value == 'string',
                isNumber: value => typeof value == 'number',
                hasSpecialCharacter: value => {

                },
                hasCharacterSet: (charactersArray, value) => {

                },
                hasWhiteSpace: value => {

                },
                hasCapitalLetters: value => {

                },
                hasSmallLetters: value => {

                },
                hasSmallAndBigLetters: value => {

                }
            }
        }
        else if (name == 'mass-validate') {
            return new staticValidate(data)
        }
    }

    changeMainDb() {

    }

    installDbSupport() {

    }

}
module.exports = dqApp
