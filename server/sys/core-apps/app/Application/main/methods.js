const Hash = require('../hash/main')
const Protocols = require('../user-protocols/main')
const Utils = require('../utils/main')
const Application = require('./application')
const DbAgent = require('../database/db-agent/db-agent')

const Obj = {
    ...Application,
    Hash,
    Protocols,
    Utils,
    DbAgent,
}

module.exports = Obj