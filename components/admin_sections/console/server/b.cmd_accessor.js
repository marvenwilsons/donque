const registry = require('./cmd_registry/registry')
const classes = require('./cmd_registry/classes')

const command_accessor = (parsed_command,permission) => {
    // access database
    const user_group = 'owner'

    const get_init_data = (token) => {
        return ""
    }
    const cmd_notfound = () => {
        parsed_command.class = parsed_command.class
        parsed_command.switched = false
        parsed_command.body = `${parsed_command.command}: command not found`
        parsed_command.uitype = 'err'
        parsed_command.err = true
    }

    const permissionOp = (p) => {
        let f = undefined
        if (p == 'w') {
            f = 'r'
        }
        else if (p == 'r') {
            f = 'w'
        }
        else if (p == 'rw'){
            f = 'rw'
        }
        return f.trim()
    }

    if (parsed_command.command == "_clear") {
        parsed_command.class = 'fs'
        parsed_command.switched = false
        parsed_command.body = get_init_data(parsed_command.token)
        parsed_command.uitype = ''
        final = parsed_command
    } else if (classes.indexOf(parsed_command.class) == -1){
        parsed_command.class = parsed_command.class
        parsed_command.switched = false
        parsed_command.body = `you do not have permission to perform this action`
        parsed_command.uitype = 'err'
        parsed_command.err = true
    } else {
        if (parsed_command.command == "use") {
            parsed_command.class = parsed_command.arguments_string
            parsed_command.switched = true
            parsed_command.body = null
            parsed_command.uitype = ''
            final = parsed_command
        } else {
            // get permission from database, access command library  and perform command
            // cmd['class']['permission']['command'] // if undefined try to look into other permission
            // if found into other permission, return you do not have a permission to perform this action
            // if not found into other permission return command not found
            if(permission.allowed_action != 'rw'){
                const user_issued_command = registry
                [parsed_command.class][parsed_command.class]
                [permission.allowed_action][parsed_command.command]

                if (user_issued_command) {
                    const command_res = user_issued_command({
                        command: parsed_command.command,
                        data: parsed_command.arguments_string.trim() == '' ? undefined : parsed_command.arguments_string,
                        extraPayload: parsed_command.extraPayload,
                        dataArr: parsed_command.arguments_array
                    })
                    parsed_command.class = parsed_command.class
                    parsed_command.switched = false
                    parsed_command.body = command_res.data
                    parsed_command.uitype = command_res.ui
                    parsed_command.err = false
                } else {
                    // try other type of permission if found return you do not have permission
                    // if not found return command not found
                    // permission.allowed_action.replace()
                    // console.log(`allowed: ${permission.allowed_action} but got: ${permissionOp(permission.allowed_action)}`)
                    const other_p = registry
                    [parsed_command.class]
                    [parsed_command.class]
                    [permissionOp(permission.allowed_action)]
                    [parsed_command.command]

                    if (other_p) {
                        parsed_command.class = parsed_command.class
                        parsed_command.switched = false
                        parsed_command.body = `you do not have permission to perform this action`
                        parsed_command.uitype = 'err'
                        parsed_command.err = true
                    } else {
                        cmd_notfound()
                    }
                }
            }else{
                // console.log(registry[parsed_command.class][parsed_command.class] )
                if (registry[parsed_command.class][parsed_command.class] == undefined){
                    parsed_command.class = parsed_command.class
                    parsed_command.switched = false
                    parsed_command.body = `FATAL ERROR: this is not suppose to happen, the library is not properly registered`
                    parsed_command.uitype = 'err'
                    parsed_command.err = true
                }
                const get_command = (p) => {
                    return registry
                    [parsed_command.class][parsed_command.class]
                    [p][parsed_command.command]
                }
                
                let t = get_command('r')
                let timesExec = 0
                
                while(t == undefined){
                    t = get_command('w')
                    timesExec++
                    if(timesExec == 2){
                        t = true
                    }
                }

                if(typeof t == 'function'){
                    let exec = t({
                        command: parsed_command.command,
                        data: parsed_command.arguments_string.trim() == '' ? undefined : parsed_command.arguments_string,
                        extraPayload: parsed_command.extraPayload,
                        dataArr: parsed_command.arguments_array
                    })
                    parsed_command.class = parsed_command.class
                    parsed_command.switched = false
                    parsed_command.body = exec.data
                    parsed_command.uitype = exec.ui
                    parsed_command.err = exec.ui == 'err' ? true : false
                }

                if(typeof t == 'boolean'){
                    cmd_notfound()
                }         
            }
        }
    }

    return parsed_command
}

module.exports = command_accessor