const requireFromString = require('require-from-string')
const fs = require('fs')

const convertToNodeModuleString = (jsString) => {
  return nodeModuleString = jsString.replace('export default', 'module.exports =')
}


const template = convertToNodeModuleString(fs.readFileSync('../templates.js','utf8'))
const utils = convertToNodeModuleString(fs.readFileSync('../utils.js','utf8'))

const combinedUtilesAndTemp = 
  utils.replace('module.exports = utils', '') + 
  template.replace("import utils from './utils'", '')

const finalTemplate = requireFromString(combinedUtilesAndTemp)

module.exports = finalTemplate