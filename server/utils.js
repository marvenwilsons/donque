const requireFromString = require('require-from-string')
const fs = require('fs')

const convertToNodeModuleString = (jsString) => {
  return nodeModuleString = jsString.replace('export default', 'module.exports =')
}

const utils = convertToNodeModuleString(fs.readFileSync('../utils.js','utf8'))

module.exports = requireFromString(utils)