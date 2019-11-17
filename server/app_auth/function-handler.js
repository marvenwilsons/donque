module.exports = ({ dep, isDestructive, userData, pwd, username, cmd }) => {
    // @dqsys: auth: todo: functionHandler(),
    const { decode } = dep

    console.log('[function handler]'.green.bold)
    if (!isDestructive) {
        console.log('[functionHandler]'.green.bold ,'----> function is not destructive')
        return true
    } else {
        console.log('[functionHandler]'.green.bold, 'function is destructive, password is required')
        if (pwd) {
            // compare password
            console.log('[functionHandler]'.green.bold, 'password field found, authenticating ...')
            return decode(userData.password, username).toString() === pwd ? true : {
                msg: 'Authentication failed',
                actions: [{
                    title: 'prompt_err'
                }]
            }
        } else {
            console.log('[functionHandler]'.green.bold, 'password field not found, prompting user for password')
            console.log(cmd)
            return {
                msg: 'Password required',
                actions: [{
                    title: 'prompt_password',
                    cmd
                }]
            }
        }
    }
}