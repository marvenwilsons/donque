module.exports = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    async addCollection({dep,data}) {
        console.log('')
        console.log('[Collection]'.bold.green,'----> Start')
        console.log('[Collection]'.bold.green,'----> Executing addCollection function')
        const {collection_name,schema} = data
        const {db,moment,user} = dep
        
        let err = undefined

        // shema type validation
        console.log('[Collection]'.bold.green,'----> Validating Collection types')
        let types = ['Any','Long String','Short String','Number','Boolean','Date','Article','file_sys_ref']
        for (let [key, value] of Object.entries(schema)) {
            if(types.includes(value) == false){
                console.log('[Collection]'.bold.red,`----> Invalid type "${value}" detected`.red)
                console.log(`[Collection] ----> End`.red)

                return {
                    status: false,
                    data: {
                        actions: [
                            {
                                title: 'prompt_err',
                                msg:`Creating collection failed, Ivalid type "${value}"`
                            }
                        ]
                    }
                }
            }
        }

        // collection
        console.log('[Collection]'.bold.green,'----> Validating Collection name')
        if(collection_name) {
            console.log('[Collection]'.bold.green,'----> Valid collection name')
            err = false
        } else {
            console.log('[Collection]'.bold.red,'----> Validation failed collection undefined'.red)
            err = 'Creating collection failed, collection name is undefined'
        }

        // schema
        console.log('[Collection]'.bold.green,'----> Validating Collection schema')
        if(schema){
            if(Object.keys(schema).length) {
                err = false
            } else {
                err = 'Creating collection failed, empty schema'
            }
        } else {
            err = 'Creating collection failed, schema is undefined'
        }

        // existance check
        console.log('[Collection]'.bold.green,'----> Validating collection existance')
        const collectionName_exist = db.collection('dq_collections_schema').findOne({
            'collection_name' : {$eq: collection_name}
        }).then(data => {
            if (data !== null){
                return true
            }else {
                return false
            }
        })

        // creation
        return new Promise(async (resolve,reject) => {
            if(err === false) {
                if(await collectionName_exist) {
                    console.log('[Collection]'.bold.red,`----> Error: Collection named ${collection_name} already exist`.red)
                    console.log('[Collection]'.bold.red,`----> End`.red)
                    reject({
                        status: false,
                        data: {
                            actions: [
                                {
                                    title: 'prompt_err',
                                    msg: `Creating collection failed, collection ${collection_name} already exist`
                                }
                            ]
                        }
                    })

                    return;
                } else {
                    db.collection('dq_collections_schema').insertOne(
                        {
                            collection_name: collection_name,
                            schema,
                            info: {
                                "_$Collection Name": collection_name,
                                createdOn: moment().format("MMM Do YY"),
                                categories: [],
                                lastModified: moment().format("MMM Do YY"),
                                createdBy: user.adminName
                            }
                        }
                    ).then(res => {
                        console.log('[Collection]'.bold.green,`----> Sucessfuly created collection ${collection_name}`)
                        resolve({
                            status: true,
                            data: {
                                actions: [],
                                msg: null,
                                res
                            }
                        })
                        console.log(`[Collection]`.bold.green,'----> End')
                        })
                        .catch(_err => {
                            console.log(`[Collection] ----> Error creating ${collection_name} collection`)
                            console.log(`[Collection] ----> ${err}`)
    
                            reject({
                                status: false,
                                data: {
                                    actions: [{
                                        title: 'prompt_err',
                                        msg: _err
                                    }]
                                }
                            })
                        })
                }
            } else {
                console.log('[Collection]'.bold.red,`----> Error: ${err}`.red)

                reject({
                    status: false,
                    data: {
                        actions: [
                            {
                                title: 'prompt_err',
                                msg: err
                            }
                        ]
                    }
                })
            }
        })    
    }
}
