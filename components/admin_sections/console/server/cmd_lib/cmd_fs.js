const dqfs = require('../../../../../server/app_lib/utils/dqfs.js')
const path = require('path')
const queryString = require('querystring')
const fileSystem_starting_path = path.join(__dirname, '../../../../../../public')

const fileSystem = {}

fileSystem.fs = {
    _clear() {

    },
    w: {
        mkdir(i) {
            try {
                dqfs.killpath()
                dqfs.mkdir(path.join(fileSystem_starting_path, `${i.extraPayload}/${i.data}`))
                return {
                    ui: 'normal',
                    data: `${i.data} directory created successfully`
                }
            } catch (e) {
                return {
                    ui: 'err',
                    data: e
                }
            }
        },
        touch(i) {
            try {
                dqfs.killpath()
                dqfs.touch(path.join(fileSystem_starting_path, `${i.extraPayload}/${i.data}`))
                return {
                    ui: 'normal',
                    data: `${i.data} file created successfully`
                }
            } catch (e) {
                return {
                    ui: 'err',
                    data: e
                }
            }
        },
        rm(i) {

            try {
                if (i.extraPayload == undefined) {
                    return {
                        ui: 'err',
                        data: 'Cardinal_Security_Protocol: removing system directory(s) is not allowed'
                    }
                } else {
                    dqfs.killpath()
                    dqfs.rm(path.join(fileSystem_starting_path, `${i.extraPayload}/${i.data}`))
                    return {
                        ui: 'normal',
                        data: `${i.data} file removed successfully`
                    }
                }
            } catch (e) {
                return {
                    ui: 'err',
                    data: e
                }
            }
        },
        cp(i) {
            let origin = undefined
            let dist = `${fileSystem_starting_path}/${i.dataArr[1]}`

            // if extra payload is undefined it means the user wants to copy the system folders
            if (i.extraPayload == undefined) {
                origin = `${fileSystem_starting_path}/${i.dataArr[0]}`
            }else{
                origin = path.join(fileSystem_starting_path, `${i.extraPayload}/${i.dataArr[0]}`)
            }

            try{
                dqfs.cp(origin,dist)
                return{
                    ui:'normal',
                    data:'done'
                }
            }catch(e){
                console.log(e.path.split('/')[e.path.split('/').length - 1])
                if(e.syscall == 'lstat'){
                    return {
                        ui: 'err',
                        data: `origin path ${e.path.split('/')[e.path.split('/').length - 1]} not found`
                    }
                }else{
                    if (e.path.split('/')[e.path.split('/').length - 1] == 'undefined'){
                        return {
                            ui: 'err',
                            data: `distination path or origin path cannot be undefined`
                        }
                    }else{
                        return {
                            ui: 'err',
                            data: `distination path ${e.path.split('/')[e.path.split('/').length - 1]} not found`
                        }
                    }
                }
            }
        },
        mv(i) {
        }
    },
    r: {
        ls(i) {
            try {
                if (i.data == undefined && i.extraPayload == null) {
                    dqfs.killpath()
                    return {
                        ui: 'arrayList',
                        data: dqfs.ls(fileSystem_starting_path)
                    }
                } else {
                    dqfs.killpath()
                    const res = dqfs.ls(path.join(fileSystem_starting_path, i.extraPayload))

                    if (res.length == 0) {
                        return {
                            ui: 'normal',
                            data: 'directory is empty'
                        }
                    } else {
                        return {
                            ui: 'arrayList',
                            data: res
                        }
                    }

                }
            } catch (e) {
                return {
                    ui: 'err',
                    data: e
                }
            }
        },
        cd(i) {
            if (i.data == 'null') {
                return {
                    ui: null,
                    data: dqfs.cd(fileSystem_starting_path)
                }
            }
            else if (i.data == '001EACRESET') {
                dqfs.killpath()
                return {
                    ui: null,
                    data: dqfs.cd(fileSystem_starting_path)
                }
            }
            else {
                const p = Object.keys(queryString.parse(path.join(fileSystem_starting_path, i.data), '/', null))
                const pathArr = i.data.split("/")
                pathArr.pop()
                const traversBackwards = pathArr.every(el => el == '..') && pathArr.length != 0

                if (traversBackwards) {
                    if (p[p.length - 1] != 'public') {
                        return {
                            ui: 'err',
                            data: 'going outside beyond the public folder is not pirmited'
                        }
                    }
                }
                try {
                    if (dqfs.cd(path.join(fileSystem_starting_path, i.data))) {
                        return {
                            ui: null,
                            data: path.join(fileSystem_starting_path, i.data).replace(fileSystem_starting_path, "")
                        }
                    }
                } catch (e) {
                    return {
                        ui: 'err',
                        data: e
                    }
                }
            }
        }
    }
}

module.exports = fileSystem