module.exports = `CREATE TABLE dq_users (
    user_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email VARCHAR(500) NOT NULL,
    user_firstName VARCHAR(100) NOT NULL,
    user_lastName VARCHAR(100) NOT NULL,
    user_password VARCHAR(250) NOT NULL,
    username VARCHAR(250) NOT NULL,
    user_settings jsonb,
    user_collections uuid [ ],
    user_title VARCHAR(100) NOT NULL
)`