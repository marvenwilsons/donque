module.exports = `CREATE TABLE dq_admin (
    admin_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_email VARCHAR(500) NOT NULL,
    admin_firstName VARCHAR(100) NOT NULL,
    admin_lastName VARCHAR(100) NOT NULL,
    admin_password VARCHAR(250) NOT NULL,
    username VARCHAR(250) NOT NULL,
    admin_settings jsonb,
    admin_collections uuid [ ],
    admin_title VARCHAR(100) NOT NULL
)`