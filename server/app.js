const requireFromString = require('require-from-string')
const fs = require('fs')
const utils = fs.readFileSync('../utils.js','utf8')

const convertToNodeModuleString = (jsString) => {
  return nodeModuleString = jsString.replace('export default', 'module.exports =')
}

const template = convertToNodeModuleString(fs.readFileSync('../templates.js','utf8'))

console.log(template)




// module.exports = {
//     path: '/dqapp',
//     handler: router
// }