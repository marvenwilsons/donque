const fileSystem = {}

fileSystem.fs = {
    _clear() {

    },
    w: {
        mkdir(i) {
            return {
                data: 'hello',
                ui: 'suc'
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
            return {
                data: 'ls',
                ui: 'suc'
            }
        },
        cd(i) {

        }
    }
}

module.exports = fileSystem