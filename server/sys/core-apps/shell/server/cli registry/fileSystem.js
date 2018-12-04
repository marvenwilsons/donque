const cli = require('../cli_engine')

const fn = () => {
    console.log('fn')
}

cli.addClass('fileSystem',fn)

