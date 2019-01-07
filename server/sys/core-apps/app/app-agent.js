const dqApp = {}

dqApp.schem = {

    //
    appTitle: undefined,
    appDescription: undefined,

    //
    username: undefined,
    password: undefined,
    email: undefined
}

// returns true if app is initialized
// returns false if app is not yet initialized
dqApp.isSet = () => {
    return false
}

// returns true if user is set and returns false if not
dqApp.adminIsSet = () => {

}

// Admin section *****

    // returns an array of admin names
    dqApp.users = () => {

    }

    // creates new admin
    dqApp.createUser = (admin_schem) => {

    }

    // delete the admin
    dqApp.deleteUser = (user_code) => {

    }

    // returns an object that represents the brief outline of an admin
    // that will be view in the front end
    dqApp.userProfile = (user_code) => {

    }

    // assigns admin permission
    dqApp.assignUserPermission = (admin_unicode) => {

    }

    // updating admin permission
    dqApp.updateUserPermission = (admin_unicode,permission_type) => {

    }

    // returns an array of classes that a certain admin can access
    dqApp.userClassAccessList = (user_code) => {

    }

    // retunrs an array of sections in the dashboard that an adminc can access
    dqApp.userSectionAccessList = (user_code) => {

    }

    // returns a login trace of a certain admin
    dqApp.userLogins = (user_code) => {

    }

    //
    dqApp.generateUserAuthToken = (user_code) => {

    }

    // admin object
    dqApp.admin = (user_code)=> {

    }

// app pages *****

// create new page
dqApp.createPage = (page_name) =>{

}

// updates the page
dqApp.updatePage = (page_name,update,history_code) => {

}

// deletes the page
dqApp.deletePage = (page_name) => {

}

// app collections *****

// create new collection, takes an object or schema that represents the collection
dqApp.createCollection = (collection_schem) => {

}

// updates the collection
dqApp.updateCollection = (collection_name,update,history_code) => {

}

// deletes the collection
dqApp.deleteCollection = (collection_name) => {

}

module.exports = dqApp
