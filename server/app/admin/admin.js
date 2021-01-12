const addAdmin = require("./addAdmin");

module.exports = {
    async addAdmin(db, {admin_email, admin_password, username, admin_title, admin_collections, admin_settings, admin_firstName, admin_lastName}) {
        try {
            const result = await db.query(
                "INSERT INTO dq_admin (admin_email, admin_password, username, admin_settings, admin_collections, admin_title, admin_firstName, admin_lastName) VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *", [
                admin_email, 
                admin_password, 
                username, 
                admin_settings, 
                admin_collections, /** array of uuid reference of a collection */
                admin_title,
                admin_firstName,
                admin_lastName
            ])
            
            return result
       } catch(err) {
           console.log(err)
       }
    },
    async getAdminIdByUsername(db, { username } ) {
        const result = await db.query('SELECT admin_id FROM dq_admin WHERE username = $1', [username])
        return result.rows[0]
    },
    async getAdminIdByFirstNameLastName(db, { firstName,lastName }) {
        const result = await db.query('SELECT admin_id FROM dq_admin WHERE admin_firstname = $1 AND admin_lastname = $2', [firstName, lastName])
        return result.rows[0]
    },
    async getAdminIdsWithLastNameOf(db,{ lastName }) {
        const result = await db.query('SELECT admin_id FROM dq_admin WHERE admin_lastname = $2', [lastName])
        return result.rows
    }
}