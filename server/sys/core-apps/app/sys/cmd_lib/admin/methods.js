const adminMethods = {}

// Login
adminMethods.adminlogin = {
    get permissions() {
        return []
    },
    adminlogin({ dep, admins, username, password }) {
        // check user name validity
        if (admins[username]) {
            // check password validity
            if (admins[username].password === password) {
                // add new enntry to active users array
                if (dep.app.currentLiveAdmins.includes(username)) {
                    return {
                        status: false,
                        data: {
                            msg: 'this admin is already login and is currently live'
                        }
                    }
                } else {
                    const { dbAgent, config } = dep

                    // update admin object push username to
                    // current live admins list
                    const newArr = dep.app.currentLiveAdmins
                    newArr.push(username)

                    dbAgent
                        .updateProp(config.primaryDatabase, 'admin', {
                            location: null,
                            key: 'currentLiveAdmins',
                            value: newArr,
                            action: 'update value'
                        })
                        .then(data => {
                            console.log(data)
                        })
                        .catch(err => {
                            console.log(err)
                        })

                    // happy path
                    return {
                        status: true,
                        data: {
                            username: admins[username].username,
                            token: admins[username].token
                        }
                    }
                }

            } else {
                return {
                    status: false,
                    data: {
                        msg: 'incorrect username or password'
                    }
                }
            }
        } else {
            return {
                status: false,
                data: {
                    msg: 'incorrect username or password'
                }
            }
        }
    }
}

// logout
adminMethods.adminlogout = {
    get permissions() {
        return []
    },
    adminlogout({ dep, username, token }) {
        return new Promise((resolve,reject) => {
            // send unsavedSesions from the front end localStroge
            // if there is an unsaved data, prompt the user
            const { config, dbAgent, app } = dep
            if (dep.app.currentLiveAdmins.includes(username)){
                const newArr = app.currentLiveAdmins.filter(items => {
                    return items != username
                })
                
                return dbAgent.updateProp(config.primaryDatabase,'admin',{
                    location:null,
                    key: 'currentLiveAdmins',
                    value:newArr,
                    action:'update value'
                }).then(() => {
                    console.log('** logout success with no problems')
                    resolve({
                        status: true,
                        data: {
                            action: 'destroySession'
                        }
                    })
                }).catch(err => {
                    console.log('** logout success with un expected error')
                    resolve({
                        status: false,
                        data: {
                            action: 'destroySession',
                            msg: 'Unexpected Error while logging out'
                        }
                    })
                    
                })
            }else {
                console.log('** logout success but with an error')
                resolve({
                    status: true,
                    data:{
                        msg:'There is an error logging you out, you are not in the current live admins',
                        action:'destroySession'
                    }
                })
            }
        })
    }
}

adminMethods.initapp = {
    get permissions(){
        return 'create'
    },
    initapp({dep,}){
        return new Promise((resolve,reject) => {
            resolve({
                status:true,
                data:{
                    msg:'app created successfully'
                }
            })
        })
    }
}

adminMethods.App = {
    get NoValidationRequiredCommands() {
        return ['initapp']
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