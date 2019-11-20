module.exports = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    async updateCollectionSchema({dep,data}) {
        const {db,moment,user} = dep
        const {
            old_collection_name, 
            new_collection_name,
            current_collectionName, 
            new_schema,
        } = data

        return new Promise((resolve,reject) => {
            // updating collection
            if(new_collection_name) {
                console.log('updating collection name')
    
            return db.collection('dq_collections_schema').findOneAndUpdate(
                { 'collection_name': old_collection_name },
                { $set: {
                    'collection_name': new_collection_name
                } },
                { returnOriginal: false }
            ).then((res) => {
                return resolve({
                    status: true,
                    data: {
                        payload: res.value.collection_name,
                        actions: []
                    }
                })
            }).catch(error => {
                return reject({
                    status: false,
                    data: {
                        actions: {
                            title: 'prompt_err',
                            msg: error
                        }
                    }
                })
            })
            }
            
            // updating schema
            if (new_schema) {
                console.log('updating schema')
                console.log()

                return db.collection('dq_collections_schema').findOneAndUpdate(
                    { 'collection_name': current_collectionName },
                    { $set: {
                        'schema': new_schema
                    } },
                    { returnOriginal: false }
                )
                .then(() => {
                    return resolve({
                        status:true,
                        data: {
                            actions: [{}]
                        }
                    })
                })
                .catch((err) => {
                    return reject({
                        status: false,
                        data: {
                            actions: [{
                                title: 'prompt_err',
                                msg: err
                            }]
                        }
                    })
                })
            }
        })
    }
}
