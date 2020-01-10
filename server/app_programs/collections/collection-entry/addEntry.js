module.exports = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    async addEntry({dep,data}) {
        return new Promise(async (resolve,reject) => {
            console.log('adding Entry')
            
            const {collectionName, entry} = data
            const { db, moment } = dep  
            
           let doc = undefined

            // check if collectionName has already a document in the collection database
            const entryExists = await db.collection('dq_collections').findOne({
                [collectionName] : {$exists: true}
            }).then(data => {
                if (data !== null){
                    // check for duplicates here
                    doc = data
                    return true
                }else {
                    return false
                }
            })

            const objectData = {
                [collectionName]: [
                    {
                        ...entry,
                        createdOn: moment().format("MMM Do YY")
                    }
                ]
            }


             // if yes, push the the entry content to the collectionName array
            // if not, create an object with collectionName as the key and
            if(!entryExists) {
                db.collection('dq_collections').insertOne(
                    objectData
                ).then(data => {
                    resolve({
                        status:true,
                        data: {
                            actions: [],
                        }
                    })
                }).catch( e => {
                    reject({
                        status:false,
                        data: {
                            actions: [{
                                title: 'prompt_err',
                                msg: e
                            }]
                        }
                    })
                })
            } else {
                console.log(doc._id)
                db.collection('dq_collections')
                .findOneAndUpdate(
                    {_id: doc._id},
                    {
                        $push: {
                            [collectionName] : {
                                ...entry,
                                createdOn: moment().format("MMM Do YY")
                            }
                        }
                    },
                    { returnOriginal: false }
                ).then(data => {
                    resolve({
                        status:true,
                        data: {
                            actions: [],
                        }
                    })
                }).catch( e => {
                    reject({
                        status:false,
                        data: {
                            actions: [{
                                title: 'prompt_err',
                                msg: e
                            }]
                        }
                    })
                })
            }            
        })
    }
}