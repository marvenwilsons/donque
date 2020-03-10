module.exports = {
    get prop() {
        return {
            funcIsDestructive: true
        }
    },
    async deleteCollection({dep,data}) {
        console.log('[deleteCollection] ==== Start ===='.green.bold)
        console.log('[deleteCollection]'.bold.green,'----> Executing deleteCollection function')

        const {db,moment,user} = dep

        console.log(data['Collection Name'])
        const collection_delete = await db.collection('dq_collections_schema').findOneAndDelete({collection_name: data['Collection Name']})
        
        

        return new Promise((resolve,reject) => {
            if(collection_delete) {
                resolve({
                    status: true,
                    data: {
                        payload: collection_delete,
                        actions: []
                    }
                })
            }            
        })
    }
}
