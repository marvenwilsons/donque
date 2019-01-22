
// this function calls to the database

const ValidateUserMain =  ({username,token}) => {
    console.log('Validating User Main')
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Validating User Main: ${username}`)
        }, 2000);
    })
}

module.exports = ValidateUserMain