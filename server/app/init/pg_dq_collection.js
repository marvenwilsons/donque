module.exports = `CREATE TABLE dq_collections (
    collection_id NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    collection_name VARCHAR(255) NOT NULL,
    collection_content jsonb NOT NULL,
    created_on date NOT NULL,
    created_by REFERENCES dq_users(user_id)
)`