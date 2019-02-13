const adminMethods = {}

// Login
adminMethods.adminlogin = {
    get prop() {
        return {
            permissions: null,
            allowedtitle: null,
            funcIsDestructive: false
        }
    },
    adminlogin({username,password}) {
        // check user name validity
       console.log('logging in')
       return {
           status: true
       }
    }
}

// logout
adminMethods.adminlogout = {
    get permissions() {
        return []
    },
    
}

adminMethods.App = {
    get NoValidationRequiredCommands() {
        return ['initapp']
    },
    get Pages() {

    }
}

// Add new admin
adminMethods.CreateNewAdmin = {
    get permissions(){
        return 'create'
    },
    get allowedTitle(){
        return ['owner']
    },
    get funcIsDestructive() {
        return true
    },
    CreateNewAdmin({ username, password, adminName, title }){
        console.log('** Creating New Admin')
        // get schema
        // hash the username and password
        // add new admin entry to databasen

        return new Promise((resolve,reject) => {
            resolve({
                status: true,
                data: {
                    msg: 'Test'
                }
            })
        })
        
    }
}

// UpdateAdmin
adminMethods.UpdateAdmin = {
    get permissions() {
        return ['update']
    },
    get funcIsDestructive() {
        return true
    },
    allowedTitle(){
        return ['owner']
    },
    UpdateAdmin({dep, username, password, data}){

    }
}

// Delete Admin
adminMethods.DeleteAdmin = {
    get permissions() {
        return ['delete']
    },
    allowedTitle() {
        return ['Owner']
    },
    DeleteAdmin({dep, username}) {

    }
}

module.exports = adminMethods