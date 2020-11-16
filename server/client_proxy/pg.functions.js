// should only direct call to database
// bussiness logic should not be written here

// users
function getUsers() {

}
function getUser() {
    
}
function addUser() {

}
function deleteUser() {

}
function updateUser() {

}

// collection entities
function getEntities() {

}
function updateEntitie() {

}
function deleteEntitie() {
    
}
function addEntitie() {
    
}

// collection instances
function getInstances(entityName) {

}
function addInstance(entityName, payload) {

}
function deleteInstance() {

}
function updateInstance() {

}

module.exports = {
    getUsers,
    getUser,
    addUser,
    deleteUser,
    updateUser,
    getEntities,
    updateEntitie,
    deleteEntitie,
    addEntitie,
    getInstances,
    addInstance,
    deleteInstance,
    updateInstance
}