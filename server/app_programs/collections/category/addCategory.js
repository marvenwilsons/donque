module.exports = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    async addCategory({dep,data}) {
        console.log('hello world there!')
        const {db,moment,user} = dep
        const {category_name,is_root,from_collection} = data

        


        return new Promise((resolve,reject) => {
            if(is_root) {
                // it means the category is new and has no sub category
                // it will be saved in the database at format like this: ['foo']
                return db.collection('dq_collections_schema').findOneAndUpdate(
                    { 'collection_name': from_collection },
                    { $push: {
                        'categories': category_name
                    } },
                    { returnOriginal: false }
                ).then((res) => {
                    return resolve({
                        status: true,
                        data: {
                            payload: res.value,
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
            } else {
                // it means the category has a parent category, so its a
                // sub category, it will be saved in the database at format like
                // this: ['foo/bar']
                console.log('----')
                console.log(category_name)
                console.log(is_root)
                console.log(from_collection)

                return db.collection('dq_collections_schema').findOneAndUpdate(
                    { 'collection_name': from_collection },
                    { $push: {
                        'categories': category_name
                    } },
                    { returnOriginal: false }
                ).then((res) => {
                    return resolve({
                        status: true,
                        data: {
                            payload: res.value,
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
        })

    }
}
