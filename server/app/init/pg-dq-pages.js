module.exports = `CREATE TABLE dq_pages (
    page_id uuid DEFAULT uuid_generate_v4(),
    created_on date NOT NULL,
    created_by uuid REFERENCES dq_admin(admin_id),
    PRIMARY KEY (page_id)
)`