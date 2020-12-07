const requireFromString = require('require-from-string')
const fs = require('fs')
const fs = require('fs')
const path = require('path')

const convertToNodeModuleString = (jsString) => {
  return nodeModuleString = jsString.replace('export default', 'module.exports =')
}

console.log('this?')
const utils = convertToNodeModuleString(
    fs.readFileSync(path.join(__dirname,'../utils.js'),'utf8')
  )

// module.exports = requireFromString(utils)