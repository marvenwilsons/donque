const {getUser,getUsers,addUser,deleteUser,updateUser,getEntities,deleteEntitie,addEntitie,getInstances,addInstance,deleteInstance,updateInstance} = require('../client_proxy/pg.functions')
const credentialCheck = require('./credential-check')
const dataSanitizer = require('./data-sanitizer')
const handle = require('./routine-functions')

function getUser(data,username,token) {
    const sanitizedData = dataSanitizer(data)

    perform(getUser,sanitizedData)
    .inPath(`collections/user/${username}`)
    .byUser('marven')
    .check(credentialCheck)
    .then(res => {

    })
    .catch(err => {

    })
}
