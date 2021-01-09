module.exports = `CREATE TABLE dq_collections (
    collection_id uuid DEFAULT uuid_generate_v4(),
    collection_name VARCHAR(255) NOT NULL,
    collection_content jsonb NOT NULL,
    created_on date NOT NULL,
    created_by uuid REFERENCES dq_users(user_id),
    PRIMARY KEY (collection_id)
)`