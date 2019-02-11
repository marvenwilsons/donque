const crypto = require('crypto')

const e = {}
e.encrypt = (StringA,StringB) => {
    let cipher = crypto.createCipher('aes-128-cbc',StringA)
    let encrypted = cipher.update(StringB,'utf8','hex')
    encrypted += cipher.final('hex')
    return encrypted
}

e.decrypt = (StringA,StringB) => {
    let cipher = crypto.createDecipher('aes-128-cbc',StringA)
    let decrypted = cipher.update(StringB,'hex','utf8')
    decrypted += cipher.final('hex')
    return decrypted 
}

module.exports = e