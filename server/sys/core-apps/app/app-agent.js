const path = require('path')
const appConfig = require(path.join(__dirname, '../../admin assets/app/config.json'))

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
            landing: this.adminLanding()
        }
    }

    adminLanding() {
        return JSON.parse(JSON.stringify(appConfig)).adminLanding
    }

    isSet() {
        // returns true if user is set and returns false if not
        return false
    }

    changeMainDb(){

    }

    installDbSupport(){

    }

}
module.exports = dqApp
