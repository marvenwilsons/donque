const requireFromString = require('require-from-string')
const fs = require('fs')
const path = require('path')

const convertToNodeModuleString = (jsString) => {
  /** converting js modules to node modules */
  return nodeModuleString = jsString.replace('export default', 'module.exports =')
}

const utils = convertToNodeModuleString(
    fs.readFileSync(path.join(__dirname,'../../utils.js' /** refers to root dir */),'utf8')
  )

module.exports = Object.seal(requireFromString(utils))