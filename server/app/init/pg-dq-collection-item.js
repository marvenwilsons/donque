module.exports = `CREATE TABLE dq_collection_item (
    item_id uuid DEFAULT uuid_generate_v4(),
    item_of uuid REFERENCES dq_collections(collection_id),
    item_body jsonb NOT NULL,
    PRIMARY KEY (item_id)
)`