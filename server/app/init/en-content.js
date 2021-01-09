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
DQ_PORT=3000
APP_HOST=localhost
LOGIN_ROUTE_NAME=dqlogin
`
}

module.exports = envContent