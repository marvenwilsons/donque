module.exports = ({ data, token, jwt, encrypt, decode, command }) => {
    console.log('** validating token')
    console.log(`   [token] ${token}`)
    const userId = data.user._id
    const encryptedPassword = data.user.password
    const userUsername = data.user.username
    if (command == 'adminlogin') {
        console.log('   [validateToken] Token not needed')
        return true
    } else {
        try {
            const decodedToken = jwt.verify(token, encrypt(decode(encryptedPassword, userUsername), userId))
            console.log(`   [validateToken] ${decodedToken._id.toString() === userId.toString() ? 'token accepted' : 'token is invalid'}`)
            return decodedToken._id.toString() === userId.toString()
        } catch (err) {
            console.log(err)
            return false
        }
    }
}