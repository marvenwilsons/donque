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

}

// returns true if user is set and returns false if not
dqApp.adminIsSet = () => {

}

// Admin section *****

// returns an array of admin names
dqApp.admins = () => {

}

// creates new admin
dqApp.createAdmin = () => {

}

// delete the admin
dqApp.deleteAdmin = () => {

}

// assigns admin permission
dqApp.assignAdminPermission = (admin_unicode) => {

}

// updating admin permission
dqApp.updateAdminPermission = (admin_unicode,permission_type) => {

}

// returns an array of classes that a certain admin can access
dqApp.adminClassAccessList = (admin_unicode) => {

}

// retunrs an array of sections in the dashboard that an adminc can access
dqApp.adminSectionAccessList = (admin_unicode) => {

}

// returns a login trace of a certain admin
dqApp.adminLogins = (admin_unicode) => {

}

// app pages *****

// create new page
dqApp.createPage = (page_name) =>{

}

// updates the page
dqApp.updatePage = (page_name,update) => {

}

// deletes the page
dqApp.deletePage = (page_name) => {

}

// app collections *****

// create new collection
dqApp.createCollection = (collection_name) => {

}

// updates the collection
dqApp.updateCollection = (collection_name,update) => {

}

// deletes the collection
dqApp.deleteCollection = (collection_name) => {
    
}

module.exports = dqApp
