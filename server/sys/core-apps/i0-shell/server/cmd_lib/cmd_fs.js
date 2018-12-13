const dqfs = require('../../../core-commands/dq-for-fs')

const fileSystem = {}

fileSystem.fs = {
    _clear() {

    },
    w: {
        mkdir(i) {
            return {
                data: ['hello'],
                ui: 'arrayList'
            }
        },
        touch(i) {

        },
        rm(i) {

        },
        cp(i) {

        },
        mv(i) {

        }
    },
    r: {
        ls(i) {
            console.log('listing...')
            console.log(dqfs.ls(__dirname))
            return{
                ui:'arrayList',
                data: dqfs.ls(__dirname)
            }
        },
        cd(i) {

        }
    }
}

module.exports = fileSystem