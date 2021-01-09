const { async } = require("crypto-random-string")

module.exports = async function (db, {user_email, user_password, username, user_title, user_collections, user_settings, firstName, lastName}) {
    const query = 
    `INSERT INTO dq_users (user_email, user_password, username, user_settings, user_collections, user_title, user_firstName, user_lastName) 
    VALUES($1,$2,$3,$4,$5,$6)
    `
    return await db.query(query, [
        user_email, 
        user_password, 
        username, 
        user_settings, 
        user_collections, /** array of uuid reference of a collection */
        user_title,
        firstName,
        lastName
    ])
}