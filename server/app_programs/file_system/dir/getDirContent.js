module.exports = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    async getDirContents({dep,data}) {

        const n_data = JSON.parse(data)
        // const n_data = data
        
        return new Promise((resolve,reject) => {
            try {
                //
                const path = require('path')
                const workingDir = path.join(__dirname,'../../../../static/media')

                let target_dir = undefined
                if(n_data.addrs == 'root') {
                    target_dir = `${workingDir}/${n_data.name.toLowerCase()}`
                } else {
                    target_dir = `${workingDir}/${n_data.name}`
                }

                //
                const dqfs_exts = require('../../../app_lib/utils/dqfs_exts')
                const myfs = new dqfs_exts
                const contents = myfs
                .ls(target_dir)

                //
                const dirContents = contents.response.map(content => {
                    const basePath = path.join(__dirname,'../../../../')

                    // mutations
                    content.publicPath = content.publicPath.split(basePath)[1]
                    content.parentDir = content.publicPath.split(basePath)[1]
                    
                    if(content.type == 'file/application') {
                        content.type = 'file'
                    } else {
                        content.type = 'dir'
                    }

                    delete content.children
                    delete content.parentDir

                    return content
                })

                resolve({
                    status:true,
                    data: {
                        actions: [],
                        msg:null,
                        dirContents
                    }
                })
            }catch(e) {
                reject({
                    status: false,
                    msg: e,
                    data: {
                        actions: [
                            {
                                title: 'prompt_err',
                                msg: e
                            }
                        ]
                    }
                })
            }
            

        })
    }
}