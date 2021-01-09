CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE dq_users (
    user_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email VARCHAR(500) NOT NULL,
    user_firstName VARCHAR(100) NOT NULL,
    user_lastName VARCHAR(100) NOT NULL,
    user_password VARCHAR(250) NOT NULL,
    username VARCHAR(250) NOT NULL,
    user_settings jsonb,
    user_collections uuid [ ],
    user_title VARCHAR(100) NOT NULL
);

CREATE TABLE dq_service (
    service_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_title VARCHAR (250) NOT NULL,
    service_config jsonb NOT NULL
)

CREATE TABLE dq_titles (
    title_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_name VARCHAR (250) NOT NULL,
    title_services uuid [ ]
)

-- installed_services: ust for documentation, the service jest is on the other server
-- Pupose of dq_app table
CREATE TABLE dq_app (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_name VARCHAR(250) NOT NULL,
    application_settings jsonb NOT NULL,
    history jsonb NOT NULL,
    installed_services jsonb NOT NULL
);
 
-- dq_collections are application bussiness data
CREATE TABLE dq_collections (
    collection_id NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    collection_name VARCHAR(255) NOT NULL,
    collection_content jsonb NOT NULL,
    created_on date NOT NULL
    created_by REFERENCES dq_users(user_id)
)

CREATE TABLE dq_pages (
    page_id NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_on date NOT NULL,
    created_by REFERENCES dq_users(user_id)
)

CREATE TABLE dq_history (
    history_id NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_on date NOT NULL,
    created_by REFERENCES dq_users(user_id)
)

CREATE TABLE dq_installed_services (
    service_id NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
)