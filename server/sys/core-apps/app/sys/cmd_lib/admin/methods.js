const adminMethods = {}

// Login
adminMethods.adminlogin = {
    get permission() {
        return []
    },
    adminlogin({ dep, admins, username, password }){
        if (admins[username]) {
            if (admins[username].password === password) {

                // log

                return {
                    status: true,
                    data: {
                        username: admins[username].username,
                        token: admins[username].token
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
            console.log('this error!')
            return {
                status: false,
                data: {
                    msg: 'incorrect username or password'
                }
            }
        }
    }
}

// Add new admin
adminMethods.CreateNewAdmin = (admins,{username,password,adminName,title}) => {

}

module.exports = adminMethods