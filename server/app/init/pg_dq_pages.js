module.exports = `dq_pages (
    page_id NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_on date NOT NULL,
    created_by REFERENCES dq_users(user_id)
)`