const command_accessor = (parsed_command) => {

    // access database
    const user_group = 'owner'

    const get_init_data = (token) => {
        console.log(token)
        return null
    }

    if (parsed_command.command == "_clear") {
        parsed_command.class = 'fs'
        parsed_command.switched = false
        parsed_command.body = get_init_data(parsed_command.token)
        final = parsed_command
    }

    if (parsed_command.command == "use") {
        parsed_command.class = parsed_command.arguments_string
        parsed_command.switched = true
        parsed_command.body = null
        final = parsed_command
    } else {
        // get permission from database, access command library  and perform command
    }

    return parsed_command
}

module.exports = command_accessor