
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



    // command accessor
    if(section == 'AdminActions'){
        if(command == 'adminlogin' || command == 'adminlogout'){
            response.data = registry
            [section]
            [command]
            [command]
            ({dep:{dbAgent,app,config},admins, username, password, data })
        }else{
            // Crud operations on admin
            const {permissions, alloweTitle} = registry[section][command]
            console.log(permissions)
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