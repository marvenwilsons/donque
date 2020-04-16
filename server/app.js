const Templates = require('./templates')

try {
    const AdminUser = Templates.AdminUser({
        username: 'marven2'
    })
}catch(err) {
console.log(err)

}



// module.exports = {
//     path: '/dqapp',
//     handler: router
// }