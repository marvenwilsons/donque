module.exports = ({ dep, isDestructive, userData, pwd, username }) => {
    // @dqsys: auth: todo: functionHandler(),
    const { decode } = dep

    console.log('** function handler')
    if (!isDestructive) {
        console.log('   [functionHandler] function is not destructive')
        return true
    } else {
        console.log('   [functionHandler] function is destructive, password is required')
        if (pwd) {
            // compare password
            console.log('   [functionHandler] password field found, authenticating ...')
            return decode(userData.password, username).toString() === pwd ? true : {
                msg: 'Authentication failed',
                actions: [{
                    title: 'prompt_err'
                }]
            }
        } else {
            console.log('   [functionHandler] password field not found, prompting user for password')
            return {
                msg: 'Password required',
                actions: [{
                    title: 'prompt_password'
                }]
            }
        }
    }
}