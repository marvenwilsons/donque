const cryptoRandomString = require('crypto-random-string');

const envContent = (databaseUsername,databasePassword,databaseName,tablePrefix,applicationName) => {
return `
# Postgres
PGUSER=${databaseUsername}
PGHOST=localhost
PGPASSWORD=${databasePassword}
PGDATABASE=${databaseName}
PGPORT=5432
# App
SALT=${cryptoRandomString({length: 20})}
TABLE_PREFIX=${tablePrefix}
APP_NAME=${applicationName}
`
}

module.exports = envContent