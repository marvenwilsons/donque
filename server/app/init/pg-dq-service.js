/**
 * INITIAL DATA FETCHING METHOD
 * 1. collection - means it will go fetch something from collections
 * 2. 3d party - means it will go fetch outside
 */
module.exports = `CREATE TABLE dq_service (
    service_id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_title VARCHAR (250) NOT NULL,
    service_config jsonb,
    service_body TEXT,
    initial_data_fetching_method VARCHAR(50) NOT NULL,
    initial_data_fetching_path TEXT NOT NULL
)`