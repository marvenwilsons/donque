module.exports = ({ command, section, userData }) =>  {
    const sec_Alias = require('./section_alias.json')

    console.log('** permission handler')
    if (userData.resource[sec_Alias[section]] == undefined && command == 'adminlogin' || command == 'adminLogout') {
        // check if this admin is blocked
        if (userData.isBlocked) {
            console.log('   [permissionHandler] user has no permission to login')
            return false
        } else {
            console.log('   [permissionHandler] Auth Ok!')
            return true
        }
    } else if (!userData.resource[sec_Alias[section]][command]) {
        console.log(`   [permissionHandler] user has no permission to perform ${command}`)
        return false
    } else {
        console.log('   [permissionHandler] Auth Ok!')
        return true
    } 
}