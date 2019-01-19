const appAgent = require('./app-agent')

const data = 'az E2c#$'

const x =
    appAgent
        .staticMethods('mass-validate', data)
        .hasCapitalLetters()
        .hasSmallLetters()
        .hasWhiteSpace()
        .hasSpecialCharacters()
        .isTrue(true)
        .isFalse(false)
        .minChar(1)
        .maxChar(4)
        .required()
        .hasNumbers()
        .done()



// ***********************************************
const dbAgent = require('./db-agent')

// dbAgent
// .readFrom('JSON','config')
// .then(data => {
//     console.log('This is the data')
//     console.log(data)
// })
// .catch(err => {
//     console.log('This is error')
//     console.log(err)
// })

const sample = {
    name: 'marven'
}


// dbAgent
// .createDb('JSON','users',sample)
// .then(data => {
//     console.log('This is the data')
//     console.log(data)
// })
// .catch(err => {
//     console.log('This is error')
//     console.log(err)
// })

// dbAgent
// .updateProp('JSON','admin',{
//     location: "admins/019bdb077bc970c598c8330d5395ad88eb19e4e1aa82522dee591dff86098737", // the user name
//     key: 'token',
//     value: 'laksdfkjhasdkjhf3857983kehkjhskjdfg',
//     action:'update value'
// })

dbAgent
    .updateProp('JSON', 'config', {
        location: null, // the user name
        key: '__s',
        value: 'marven wilson donque',
        action: 'update value'
    })


// dbAgent.addProp('JSON','users',{
//     code: 'mrmevn',
//     form: 1,
//     form2:'test',
//     test: {
//         name:'marven'
//     },
//     admins:{
//         owner:{},
//         publisher:{},
//         dev1:{},
//         dev2:{}
//     }
// })
// .then(data => {
//     console.log('This is the data')
//     console.log(data)
// })
// .catch(err => {
//     console.log('This is error')
//     console.log(err)
// })

// const query = 'name' == 'marven'


// dbAgent
// .deleteDb('JSON','test',dbAgent.query({
//     key:'name',
//     value:,
// }))
// .then(data => {
//     console.log(data)
// })
// .catch(e => {
//     console.log(e)
// })


