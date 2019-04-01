const crypto = require('crypto')

const e = {}
e.encrypt = (ValueToHash,Salt) => {
    let cipher = crypto.createCipher('aes-128-cbc',`${ValueToHash,Salt}`)
    let encrypted = cipher.update(ValueToHash,'utf8','hex')
    encrypted += cipher.final('hex')
    return encrypted
}

e.decrypt = (ValueToReHash,Salt) => {
    const encrypted = e.encrypt(ValueToReHash,Salt)

    let decipher = crypto.createDecipher('aes-128-cbc', `${ValueToReHash, Salt}`)
    let decrypted = decipher.update(encrypted,'hex','utf8')
    decrypted += decipher.final('utf-8')
    return decrypted 
}

e.decode = (ValueToReHash, Salt) => {
    let decipher = crypto.createDecipher('aes-128-cbc', `${ValueToReHash, Salt}`)
    let decrypted = decipher.update(ValueToReHash, 'hex', 'utf8')
    decrypted += decipher.final('utf-8')
    return decrypted
}

module.exports = e