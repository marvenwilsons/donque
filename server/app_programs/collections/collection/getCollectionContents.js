module.exports = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    async getCollectionContents({dep,data}) {
        console.log('')
        console.log('[getCollectionContents]'.bold.green,'- Start')
        console.log('[getCollectionContents]'.bold.green,'- Executing getCollectionContents function')
        console.log('[getCollectionContents]'.bold.green,'- receiving request data -',data)
        
        const {db} = dep

        return new Promise(async (resolve,reject) => {
            db.collection('dq_collections').findOne({
                [data.collectionName] : {$exists: true}
            }).then(res => {
                resolve({
                    data: {
                        msg: null,
                        actions: [{
                            title: null,
                            contents: res
                        }]
                    }
                })
            }).catch(err => {
                console.log('err',err)
            })
        })
    }
}
