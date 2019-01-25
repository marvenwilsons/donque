const adminMethods = {}

// Login
adminMethods.adminlogin = {
    get permission() {
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
    adminlogout({ dep, username, token }) {

    }
}

// Add new admin
adminMethods.CreateNewAdmin = (admins, { username, password, adminName, title }) => {

}

module.exports = adminMethods