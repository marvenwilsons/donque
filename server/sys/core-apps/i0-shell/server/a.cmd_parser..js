const command_parser = (command) => {
    const token = command.body.token
    const extraPayload = command.body.extraPayload
    // split user input
    command = command.body.data.split(" ")

    // delete use
    command.splice(0,1)

    // response container
    let parsed = {}

    // command.body.extraPayload == undefined ? parsed.extraPayload = null : parsed.extraPayload = command.body.extraPayload
    
    parsed.class = command[0]
    parsed.command = command[1]
    parsed.arguments_array = command.slice(2)
    parsed.arguments_string = command.slice(2).join(" ")
    parsed.switched = false
    parsed.err = undefined 
    parsed.extraPayload = extraPayload
    parsed.token = token 

    command = Object.keys(parsed).length == 0 ? undefined : parsed

    return command
}

module.exports = command_parser