module.exports = ({ command, section, userData }) =>  {
    const sec_Alias = require('./section_alias.json')

    console.log('** permission handler')

    if (!userData.resource[sec_Alias[section]]){
        // then check if command is adminlogin
        if(command === 'adminlogin'){
            return true
        }

        // or check if command is admin logout
        if(command === 'adminLogout'){
            return true
        }

        /**
         * admins except owner usually doesnt have an administration resource but the
         * essential commands like initActorsDashboard which usually found in the 
         * administration resource, is place in the Dashboard's resource, 
         * but originally it is from the administration resource
         */
        if (userData.resource['Dashboard'][command]){
            return true
        }
    } else if (userData.resource[sec_Alias[section]]) {
        if (userData.resource[sec_Alias[section]][command]){
            return true
        }
    } else {
        return false
    }
}