const fileSystem = {}

fileSystem.fs = {
    _clear() {

    },
    w: {
        mkdir(i) {
            console.log(i)
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
            console.log(i)
            return{
                ui:'arrayList',
                data:['ben','wazza','foo','bar']
            }
        },
        selectColor(i){
            let options = ['install vue', 'install database', 'grab image', 'ben', 'wer']
            if(!i.data){
                // init front end
                return {
                    ui: 'selection',
                    data: options,
                    command:i.command
                }
            }else{
                // happy path
                if (options.indexOf(i.data) == -1){
                    // if the user tries to supply an argument isntead of the default behaviour
                    return {
                        ui: 'err',
                        data: `${i.data} command not found`
                    }
                }else{
                    return {
                        ui:'arrayList',
                        data: ['foo','bar']
                    }
                }
                
            }
        },
        cd(i) {

        }
    }
}

module.exports = fileSystem