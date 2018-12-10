

let donqueCoreCommands = {}

donqueCoreCommands.dq = {
    // terminalBgColor() {

    // },
    // terminalOnLoad() {

    // }
    _clear() {

    },
    w: {

    },
    r: {
        listAll(i) {
            return {
                ui: 'arrayList',
                data: ['ben', 'wazza', 'foo', 'bar']
            }
        },
        selectColor(i) {
            // using selection as ui
            let options = ['install-vue', 'install-database', 'grab image', 'ben', 'wer']
            if (!i.data) {
                // init front end
                return {
                    ui: 'selection',
                    data: options,
                    command: i.command
                }
            } else {
                // happy path
                // if the user tries to supply an argument isntead of the default behaviour

                if (options.indexOf(i.data) == -1) {
                    return {
                        ui: 'err',
                        data: `${i.data} command not found`
                    }
                } else {
                    // do something!
                    // write something to the database according to user choice
                    if (i.data == 'ben') {
                        return {
                            ui: 'arrayList',
                            data: ['hello', 'world']
                        }
                    }
                    if (i.data == 'foo') {
                        return {
                            ui: 'arrayList',
                            data: ['foo', 'bar']
                        }
                    }
                    if(i.data == 'install-vue'){
                        return {
                            ui: 'normal',
                            data: 'you selected install-vue'
                        }
                    }

                }

            }
        }
    }
}

module.exports = donqueCoreCommands