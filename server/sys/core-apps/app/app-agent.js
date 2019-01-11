const path = require('path')
const appConfig = require(path.join(__dirname, '../../admin assets/app/config.json'))
const _appConfig = JSON.parse(JSON.stringify(appConfig))

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

    get checklist() {
        // return {
        //     "initializing app" : undefined,
        //     "admin logging in" : undefined,
        //     "user logging in":undefined
        // }
    }

    static staticMethods(name){
        if(name == 'validate'){
            return {
                isString: () => {

                }
            }
        }
    }

    changeMainDb(){

    }

    installDbSupport(){

    }

}
module.exports = dqApp
