const DbAgent = require('./db-agent')

DbAgent.readFrom('JSON','admin')
.then(data => {
    console.log(data)
})
.catch(err => {
    console.log(err)
})