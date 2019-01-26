
const Cardinal = async ({username,password,token,data,command,section}) => {
    const {app,admins,config} = await require('../database/index')
    const dbAgent = require('../database/db-agent')
    const registry = require('./cmd_lib/registry')

    // command response container
    const response = {
        state:{},
        set data(r){
            if (config.isInit && Object.keys(admins).length != 0){
                this.state = r
            }else{
                this.state = {
                    status:false,
                    data:{
                        action:'init'
                    }
                }
            }
        },
        get data() {
            return this.state
        }
    }


    const { permissions, allowedTitle } = registry[section][command]
    const adminRes = () => {
        response.data = registry
        [section]
        [command]
        [command]
            ({ dep: { dbAgent, app, config }, admins, username, password, data })
    }

    // command accessor
    if(section == 'AdminActions'){
        if(command == 'adminlogin' || command == 'adminlogout'){
            adminRes()
        }else{
            
            // Crud operations on admin.. case sensitive
            // admin data
            const adminPermissions = admins[username]['sectionPermissions']['admin']
            
            const adminTitle = 
                admins[username]['title']
            
            // command data
            const funcReqData = { fpermission, ftitle } = {
                fpermission: registry[section][command].permissions,
                ftitle: registry[section][command].allowedTitle
            }

            // check permission
            if (adminPermissions.includes(fpermission)){
                // check title
                if (ftitle.includes(adminTitle)){
                    adminRes()
                } else {
                    response.data = {
                        status:false,
                        data:{
                            msg:'Illegal access on admin actions, permission denied'
                        }
                    }
                }
            } else{
                response.data = {
                    status:false,
                    data:{
                        msg: 'Permission Denied'
                    }
                }
            }
        }
    }else{

    }

    // return
    return new Promise((resolve,reject) => {
        if (response.data.status){
            resolve(response.data)
        }else{
            reject(response.data)
        }
    }) 
}

module.exports = Cardinal