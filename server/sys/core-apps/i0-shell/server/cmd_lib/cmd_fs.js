const dqfs = require('../../../core-commands/dqfs')
const path = require('path')
const fileSystem_starting_path = path.join(__dirname, '../../../../../../public')

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
            // console.log(__dirname)
            // console.log(dqfs.ls(fileSystem_starting_path))
            return{
                ui:'arrayList',
                data: dqfs.ls(fileSystem_starting_path)
            }
        },
        cd(i) {
            
            try{
                if (dqfs.cd(path.join(fileSystem_starting_path, i.data))) {
                    console.log()
                    return {
                        ui: null,
                        data: path.join(fileSystem_starting_path, i.data).replace(fileSystem_starting_path, "")
                    }
                }
                
            }catch(e){
                return {
                    ui: 'err',
                    data: e
                }
            }
        }
    }
}

module.exports = fileSystem