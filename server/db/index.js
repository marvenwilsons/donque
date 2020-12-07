const { Pool } = require("pg")

const pool = new Pool(/** ENV VARIABLE DATA, or ADD OBJECT HERE */)

module.exports = {
    query : (text, params) => pool.query(text,params),
}