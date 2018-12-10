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
            return{
                ui:'arrayList',
                data:['ben','wazza','foo','bar']
            }
        },
        cd(i) {

        }
    }
}

module.exports = fileSystem