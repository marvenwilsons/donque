const fs = require('fs');
const md5 = require('md5');
const events = require('events').EventEmitter
// require('log-timestamp');

// console.log(`Watching for file changes on ${fl}`);

module.exports = (fl) => {
    let md5Previous = null;
    let fsWait = false;

    let e = new events()

    fs.watch(fl, (event, filename) => {
        if (filename) {
            if (fsWait) return;
            fsWait = setTimeout(() => {
            fsWait = false;
            }, 100);
            const md5Current = md5(fs.readFileSync(fl));
            if (md5Current === md5Previous) {
                return;
            }
            md5Previous = md5Current;
            e.emit('fileChanged')
        }
    });

    return e
}