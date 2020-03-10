module.exports = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    async fetchCollections({dep,data}) {
        console.log('')
        console.log('[Collection]'.bold.green,'----> Start')
        console.log('[Collection]'.bold.green,'----> Executing fetchCollections function')

        let cursor_collections = []
        let collections = []

        return new Promise( async (resolve,reject) => {
            const col_cursor = await dep.db.collection('dq_collections_schema').find()
            
            await col_cursor.forEach((doc,err) => {
                return cursor_collections.push(doc)
            }).then(() => {
                resolve({
                    status: true,
                    data: {
                        msg: null,
                        actions: [{
                            title: null,
                            contents: cursor_collections 
                        }]
                    }
                })
            }).catch(err => {
                reject({
                    status: false,
                    data: {
                        msg: err,
                        actions: [{
                            title: 'prompt_err'
                        }]
                    }
                })
            })
        })
    }
}
