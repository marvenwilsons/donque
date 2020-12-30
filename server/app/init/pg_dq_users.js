module.exports = `CREATE TABLE dq_users (
    user_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email VARCHAR(500) NOT NULL,
    user_password VARCHAR(250) NOT NULL,
    username VARCHAR(250) NOT NULL,
    user_settings jsonb NOT NULL,
    user_notes jsonb NOT NULL,
    user_services jsonb NOT NULL,
    user_title VARCHAR(100) NOT NULL
)`