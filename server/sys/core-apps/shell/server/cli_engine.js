const classes = require('./cli registry/classes')
const cmd = require('./cli registry/cmd')

var cli = {}
var db = {}

db.hasACommand = (cmd) => {
    return classes.indexOf(cmd) != -1
}
db.exec = (c, output) => {

    if (cmd[c.class][c.command] == undefined) {
        output(`${c.command}:  command not found`)
    } else {
        output(cmd[c.class][c.command](c.args))
    }

}

cli.set = (input, output) => {
    if (input[0] == 'use') {

        const objectify = () => {
            let x = undefined
            input.map(e => {
                x += `${e} `
            })
            return x.replace(`undefineduse ${input[1]}`, " ").replace(/^\s\s*/, '').replace(/\s\s*$/, '')
        }

        const iObject = {
            class: input[1],
            command: input[2],
            args: objectify()
        }

        if (db.hasACommand(input[1])) {

            db.exec(iObject, (o) => {
                if (typeof o == 'string') {
                    output({
                        class: input[1],
                        body: o
                    })
                } else {
                    output({
                        class: input[1],
                        body: o
                    })
                }
            })
        }
    } else {
        output(`${input}:    command not found`)
    }

}

module.exports = cli