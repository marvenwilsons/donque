const fs = require('fs')
const path = require('path')

let donqueCoreCommands = {}

donqueCoreCommands.dq = {
    // terminalBgColor() {

    // },
    // terminalOnLoad() {

    // }
    _clear() {

    },
    w: {
        // user
        createNewUser(i) {
            console.log('hey')
        },
        deleteUser(i) {

        },
        updateUser(i) {

        },
        assignUserPermissions(i) {

        },
        // collection
        createNewCollection(i) {

        },
        deleteCollection(i) {

        },
        updateCollection(i) {

        },
        // page
        createNewPage() {

        },
        deletePage() {

        },
        updatePage() {

        }
    },
    r: {
        // user
        getUser(i) {

        },
        // collection
        getCollections(i) {

        },
        // page
        getPages(i) {

        },

        //
        listAllCommands(i) {
            return {
                ui: 'txtfile',
                data: fs.readFileSync(path.join(__dirname, '../assets/command-list.txt'), 'utf-8').toString()
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
                    if (i.data == 'install-vue') {
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