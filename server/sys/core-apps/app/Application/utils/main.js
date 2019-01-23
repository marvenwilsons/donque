const StaticValidate = require('./static-validate')
const Synchronous = require('./synchronous')
const compose = require('./q')

module.exports = {
    StaticValidate,
    Synchronous,
    ...compose
}