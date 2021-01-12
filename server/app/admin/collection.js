module.exports = {
    async createCollection(db,{collection_name, collection_content, collection_schema, created_by}) {
        return await db.query('INSERT INTO dq_collections (collection_name, collection_content, collection_schema, created_by) values($1, $2, $3, $4)',[
            collection_name,
            collection_content,
            collection_schema,
            created_by
        ])
    },
    pushNewCollection(db, {collection_name, collection_content, config, created_by}) {
        
    }
}