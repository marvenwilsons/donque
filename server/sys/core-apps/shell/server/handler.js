// express
const express = require('express')
const router = express.Router()

// cli dependecies
const command_parser = require('./a.cmd_parser.')
const command_accessor = require('./b.cmd_accessor')
const response_formater = require('./c.response_formater') 

// cli handler
const cli_handler = (command,response) =>{
    
    // parse user input
    const parsed_user_input = command_parser(command)

    // command accessor
    const users_command = command_accessor(parsed_user_input)
    console.log(users_command)

    // response formater
    // const final_response = response_formater(users_command)

    // return response to user
    // response(final_response)
}

router.post('/dqcli',(req,res) => {
    // cli_handler(req,(cli_response) => res.status(200).json({response: cli_response}))
    cli_handler(req, undefined)
    res.status(200).json({ response: {class: 'fs', body:'test'} })
})


// const user_input = req.body.data.split(" ")
// command_parser.set(user_input,(output) => {
//     res.status(200).json({ response: output })
// })

module.exports = {
    path: '/dq',
    handler: router
}