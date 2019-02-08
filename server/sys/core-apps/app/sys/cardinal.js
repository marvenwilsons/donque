
const Cardinal = async ({ username, password, token, data, command, section }) => {
    
    // dependecies
    const db = await require('../database/index')
    // const dbAgent = require('../database/db-agent')
    const registry = require('./cmd_lib/registry')

    const { permissions, allowedTitle, funcIsDestructive } = registry[section][command]
    const r = registry[section][command][command]

    // command response container
    const response = {
        state: {},
        set data(r) {
            this.state = r

            // if (config.isInit && Object.keys(admins).length != 0) {
            //     this.state = r
            // } else {
            //     this.state = {
            //         status: false,
            //         data: {
            //             action: 'initapp'
            //         }
            //     }
            // }
        },
        get data() {
            return this.state
        }
    }

    // check db
    if(!db.status){
        response.data = db
    }

    /**
     * ENGINE
     */


    /**
     * END Engine
     */

    if (registry[section][command] === undefined) {
        throw {
            status: false,
            data: {
                msg: `cannot find ${command} command in ${section}`
            }
        }
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