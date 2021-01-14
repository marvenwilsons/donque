const watcher = require('./watcher');
const fs = require('fs')
const events = require('events').EventEmitter
let v = new events()

module.exports = (dir) => {
    const fileContents = fs.readdirSync(dir)

    fileContents.map(e => {
        const w = watcher(`${dir}/${e}`)
        w.on('fileChanged', () => {
            console.log('fl?')
            v.emit('fileChanged')
        })
    })

    return v
}