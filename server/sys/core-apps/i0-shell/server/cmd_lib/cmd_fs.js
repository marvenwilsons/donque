const dqfs = require('../../../core-commands/dqfs')
const path = require('path')
const queryString = require('querystring')
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
            // console.log(path.join(fileSystem_starting_path, i.extraPayload))
            // console.log(i.extraPayload)
            // return {
            //     ui: 'arrayList',
            //     data: ['foo']
            // }

            try{
                if (i.data == 'undefined' && i.extraPayload == null) {
                    return {
                        ui: 'arrayList',
                        data: dqfs.ls(fileSystem_starting_path)
                    }
                } else {
                    dqfs.killpath()
                    const res = dqfs.ls(path.join(fileSystem_starting_path, i.extraPayload))

                    if(res.length == 0){
                        return{
                            ui: 'normal',
                            data: 'directory is empty'
                        }
                    }else{
                        return {
                            ui: 'arrayList',
                            data: res
                        }
                    }
                    
                }
            }catch(e){
                return {
                    ui: 'err',
                    data: e
                }
            }

        },
        cd(i) {
            if(i.data == 'null'){
                console.log(i.data)
                return {
                    ui: null,
                    data: dqfs.cd(fileSystem_starting_path)
                }
            }
            else if (i.data == '001EACRESET'){
                dqfs.killpath()
                return {
                    ui: null,
                    data: dqfs.cd(fileSystem_starting_path)
                }
            }
            else{
                const p = Object.keys(queryString.parse(path.join(fileSystem_starting_path, i.data), '/', null))
                const pathArr = i.data.split("/")
                pathArr.pop()
                const traversBackwards = pathArr.every(el => el == '..') && pathArr.length != 0

                if (traversBackwards) {
                    // get length
                    if (p[p.length - 1] != 'public') {
                        return {
                            ui: 'err',
                            data: 'going outside beyond the public folder is not pirmited'
                        }
                    }
                }
                try {
                    // console.log(dqfs.cd(path.join(fileSystem_starting_path, i.data)))   

                    if (dqfs.cd(path.join(fileSystem_starting_path, i.data))) {
                        // console.log(path.join(fileSystem_starting_path, i.data))
                        return {
                            ui: null,
                            data: path.join(fileSystem_starting_path, i.data).replace(fileSystem_starting_path, "")
                            // data: 'test'
                        }
                    }

                } catch (e) {
                    console.log(e)
                    return {
                        ui: 'err',
                        // data: e.replace(fileSystem_starting_path, '').replace('/', '').replace('undefined/', '')
                        data: e
                    }
                }
            }
        }
    }
}

module.exports = fileSystem