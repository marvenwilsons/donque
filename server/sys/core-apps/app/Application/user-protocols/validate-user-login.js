// this function calls to the database

const ValidateUserOnLogin = ({username,password}) => {
    console.log('Validating User')
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(`validating User: ${username}`)
        }, 3000);
    })
}

module.exports = ValidateUserOnLogin