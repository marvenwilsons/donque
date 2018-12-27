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
            // console.log(i.dataArr)
            // console.log(i)
            // if extra payload is undefined it means the user wants to copy the system folders
            return {
                ui: 'normal',
                data: `${i.data} file removed successfully`
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