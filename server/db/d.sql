CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE dq_users (
    user_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email VARCHAR(500) NOT NULL,
    user_password VARCHAR(250) NOT NULL,
    username VARCHAR(250) NOT NULL,
    user_settings jsonb NOT NULL,
    user_notes jsonb NOT NULL,
    user_services jsonb NOT NULL, -- just the names
    user_title VARCHAR(100) NOT NULL
);

CREATE TABLE dq_service (
    service_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_title VARCHAR (250) NOT NULL,
    service_config jsonb NOT NULL
)

CREATE TABLE dq_app (
    id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_name VARCHAR(250) NOT NULL,
    application_settings jsonb NOT NULL,
    pages jsonb NOT NULL,
    history json NOT NULL,
    installed_services jsonb NOT NULL -- just for documentation, the service jest is on the other server
);