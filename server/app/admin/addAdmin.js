const { async } = require("crypto-random-string")

module.exports = async function (db, {user_email, user_password, username, user_title, user_collections, user_services, user_settings}) {
    const query = 
    `INSERT INTO dq_users (user_email, user_password, username, user_settings, user_collections, user_services, user_title) 
    VALUES($1,$2,$3,$4,$5,$6,$7)
    `
    return await db.query(query, [user_email, user_password, username, user_settings, user_collections, user_services, user_title])
}