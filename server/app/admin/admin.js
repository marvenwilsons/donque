const addAdmin = require("./addAdmin");

module.exports = {
    async addAdmin(db, {user_email, user_password, username, user_title, user_collections, user_settings, user_firstName, user_lastName}) {
        try {
            const result = await db.query(
                "INSERT INTO dq_users (user_email, user_password, username, user_settings, user_collections, user_title, user_firstName, user_lastName) VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *", [
                user_email, 
                user_password, 
                username, 
                user_settings, 
                user_collections, /** array of uuid reference of a collection */
                user_title,
                user_firstName,
                user_lastName
            ])
            
            return result
       } catch(err) {
           console.log(err)
       }
    }
}