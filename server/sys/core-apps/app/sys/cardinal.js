
const Cardinal = async ({ username, password, token, data, command, section }) => {
    const { app, admins, config } = await require('../database/index')
    const dbAgent = require('../database/db-agent')
    const registry = require('./cmd_lib/registry')

    // command response container
    const response = {
        state: {},
        set data(r) {
            if (config.isInit && Object.keys(admins).length != 0) {
                this.state = r
            } else {
                this.state = {
                    status: false,
                    data: {
                        action: 'initapp'
                    }
                }
            }
        },
        get data() {
            return this.state
        }
    }

    if (registry[section][command] === undefined) {
        throw {
            status: false,
            data: {
                msg: `cannot find ${command} command in ${section}`
            }
        }
    }

    const { permissions, allowedTitle, funcIsDestructive } = registry[section][command]
    const r = registry
    [section]
    [command]
    [command]


    // Choosen command
    const ExecuteAdminCommand = async () => {
        const adArgs = { dep: { dbAgent, app, config }, admins, username, password, data }
        if (funcIsDestructive == false) {
            console.log('*** function is not destructive executing function')
            return await r(adArgs)
        } else {
            console.log('** destructive function asking for password')

            if (password) {
                console.log('** password detected')
                if (admins[username].password === password) {
                    console.log(`** executing ${command}`)
                    return await r(adArgs)
                }
            } else {
                console.log('** prompting for password')
                response.data = {
                    status: false,
                    data: {
                        action: 'promptpassword'
                    }
                }
            }
        }
    }

    // Crud operations on admin.. case sensitive
    // admin data
    const { AdminPermissions, AdminTitle } = {
        AdminPermissions: admins[username]['sectionPermissions']['admin'],
        AdminTitle: admins[username]['title']
    }

    // req isvalid?
    // const ReqIsValid = 

    const ReqIsValid = (a => {
        if (typeof a === 'boolean' && a) {
            return true
        } else {
            console.log('test')
            console.log(AdminPermissions)
            if (permissions.length == 0){
                return true
            }else{
                return [
                    AdminPermissions.includes(permissions),
                    allowedTitle.includes(AdminTitle)
                ].every(ItemsInArray => ItemsInArray === true)
            }            
        }
    })(registry.AdminActions.App.NoValidationRequiredCommands.includes(command))

    // command accessor
    if (section == 'AdminActions') {
        if (command == 'adminlogin' || command == 'adminlogout') {
            response.data = await ExecuteAdminCommand()
        } else {
            // check permission
            ReqIsValid
                ? response.data = await ExecuteAdminCommand()
                : response.data = {
                    status: false,
                    data: {
                        msg: 'Permission Denied'
                    }
                }
        }
    } else {
    }

    // return
    return new Promise((resolve, reject) => {
        if (response.data.status) {
            resolve(response.data)
        } else {
            reject(response.data)
        }
    })
}

module.exports = Cardinal