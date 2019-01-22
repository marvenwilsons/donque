const AppMethods = require('./methods')
const Main = (username, password, token, section, cmdName, data) => {
    let CommandData = {username,password,token,section,cmdName,data}
    
    AppMethods.CurrentLiveAdmins.push(username)
    console.log(AppMethods)
}





module.exports = Main