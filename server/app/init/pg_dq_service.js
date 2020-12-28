module.exports = `CREATE TABLE dq_service (
    service_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_title VARCHAR (250) NOT NULL,
    service_config jsonb NOT NULL,
    service_body jsonb NOT NULL
)`