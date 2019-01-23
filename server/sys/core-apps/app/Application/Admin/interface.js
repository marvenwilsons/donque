const DbAgent = require('../database/db-agent')

const Admin = await DbAgent.readFrom('JSON','admins') // returns the admins