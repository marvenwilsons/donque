module.exports = `CREATE TABLE dq_titles (
    title_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_name VARCHAR (250) NOT NULL,
    title_services uuid REFERENCES dq_service(service_id)
)`