class dqUserAgent {
    constructor(name,username,password,description){
        this.fullname = name
        this.username = username
        this.password = password
        this.description = description

        this.addedBy = undefined // person who added
        this.position = undefined // position in the company
        this.uid = undefined // unique id
        this.logins = undefined // trace of login
        this.token = undefined 
        this.activities = undefined // trace of log activities
        this.lastActivity = undefined
        this.tokenExprTime = undefined
        this.token_is_expired = undefined
        this.access_level = undefined // r w rw
        this.ClassAccessList = []
        this.userSectionAccessList = [],
        this.sessionId = undefined
    }
    
    // Getter
    get userProfile() {
        return this.userProfile()
        // can be access outside after instance of this class by:
        // console.log(user.userProfile)
    }

    userProfile() {
        // returns name, username, password, desc
        return {
            name: this.name,
            username: this.username,
            password: this.password,
            description: this.description
        }
    }

    createUser() {
        this.addedBy = () => {
            return
        }
        this.uid = () => {

        }
        this.logins = () => {

        }
        this.activities = () => {

        }
        this.lastActivity = () => {

        }
    }


}

// usage
const user = new dqUserAgent(undefined,'username','password','desc')
user.createUser()


module.exports = dqUserAgent