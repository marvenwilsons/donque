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
    async getAdminIdByUsername(db,username) {
        const result = await db.query('SELECT ')
    },
    async getAdminIdByFirstNameLastName(firstName,lastName) {

    },
    async getAdminsWithLastNameOf(lastName) {

    }
}