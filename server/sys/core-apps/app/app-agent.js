const path = require('path')
const fs = require('fs')
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
    get appConfig() {
        return {
            isSet: typeof _appConfig == 'object' && Object.keys(_appConfig).length != 0,
            adminIsSet: fs.existsSync(path.join(__dirname, `../../admin assets/app/${_appConfig.adminPath}`)),
            landing: _appConfig.adminLanding
        }
    }

    static staticMethods(name, data) {
        if (name == 'validate') {
            return {
                isString: value => typeof value == 'string',
                isNumber: value => typeof value == 'number',
                hasSpecialCharacter: (value,condition) => {

                },
                hasCharacterSet: (charactersArray, value) => {

                },
                hasWhiteSpace: (value, condition)  => {

                },
                hasCapitalLetters: (value, condition)  => {

                },
                hasSmallLetters: (value, condition)  => {

                },
                hasSmallAndBigLetters: (value, condition)  => {

                }
            }
        }
        else if (name == 'mass-validate') {
            return new staticValidate(data)
        }
        else if(name == 'utils') {
            const alphabets_allcaps = 'ABCDEFGHIJKLMOPQRSTUVWXYZ'
            const alphabets_smallcaps = 'abcdefghijklmnopqrstuvwxyz'
            const alphabets_mix = 'aAbBCcdDeEfFgGHhiIjJkKLlmMNnOoPpqQrRsStTUvVwWXyYZz'
            const numbers = '0123456789987654321'
            const specialChars = '!@#$%^&*()_+{}|:"<>?;'

            return {
                generateRandomAlphabet: (length,mode) => {
                    var emptyString = "";
                    var chosen_mode = undefined

                    if(mode == 'allcaps'){
                        chosen_mode = alphabets_allcaps
                    }else if(mode == 'smallcaps'){
                        chosen_mode = alphabets_smallcaps
                    }else if(mode == 'mix'){
                        chosen_mode = alphabets_mix
                    }

                    while (emptyString.length < length) {
                        emptyString += chosen_mode[Math.floor(Math.random() * chosen_mode.length)];
                    }
                    return emptyString
                },
                generateRandomNumber: (length) => {

                },
                generateRandomSpecialCharacters: (length) => {

                }
            }
        }
    }

    changeMainDb() {

    }

    installDbSupport() {

    }

}
module.exports = dqApp
