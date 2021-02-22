module.exports = {
    async createCollection(db,{collection_name, collection_schema, created_by}) {
        /** 
         * at this moment createCollection function can be executed by anyone
         * createCollection function should be aware of where the data came from
         */

        return await db.query('INSERT INTO dq_collections (collection_name, collection_schema, created_by) values($1, $2, $3)',[
            collection_name,
            collection_schema,
            created_by
        ])
    },
    async getCollectionNames() {
        /** returns an array of collection names,
         *  useful for creating new collection to compare if the name already exists
         */
    },
    async pushNewCollection(db, {collection_name, body, created_by }) {
        /** 
         * 1. Insert into dq_collection_item 
         * 2. get the item id of the newly added collection item
         * 3. get the collection_id using the collection name: SELECT collection_id FROM dq_collections WHERE collection_name = $1
         * 4. 
         */

         const getCollectionId = await db.query('SELECT collection_id FROM dq_collections WHERE collection_name = $1', [collection_name])
         const colId = getCollectionId.rows[0].collection_id

         /** Insert into dq_collection_item */
         const addCollectionItem = await db.query('INSERT INTO dq_collection_item (item_of, item_body) VALUES ($1,$2) returning *', [
            colId,  /** collection_id from dq_collections */
            body    /** JSONB */
         ])

         /** Insert or push into dq_collections.collection_content array of uuid */
         const addItemToCollectionContentArray = await db.query('UPDATE dq_collections SET collection_content = array_append(collection_content,$1) WHERE collection_id = $2', [
            addCollectionItem.rows[0].item_id,   /** item_id from dq_collection_item */
            colId   /** collection_id from dq_collections */
         ])

         return addItemToCollectionContentArray
    },
    /**
     * ITEM: This is equavalent on moving an item to recycle bin
     */
    async markItemAsTrash(db) {

    },
    /**
     * ITEM: Completely removes and delete's item out of existance
     */
    async deleteItemFromTrash(db) {

    },
    /**
     * Removes label trash on an item
     * sets the is_trash to an item from is_trash: true --> is_trash: false
     */
    async unMarkItemAsTrash(db) {

    },
    /**
     * updates the configuration of a collection
     * collection username, password, loginOnAccess, allowedTitlesToAccess
     */
    async setCollectionConfig(db, {key, value}) {

    },
    /**
     * Update Collection Schema
     */
    async setCollectionSchema(db) {

    },
    /**
     * Remove 
     */
    async removeSchemaProperty(db) {

    },
    /**
     * Add new property to a schema
     */
    async appendSchemaProperty(db) {

    }
}