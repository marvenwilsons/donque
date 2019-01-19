const EventEmitter = require('events').EventEmitter

class Person extends EventEmitter{
    constructor(name,test){
        super(name,test)
    }
}

const user = new Person('Marven','donque')

let x = undefined



// System validate
user.on('speak', (said) => {
    console.log('validating')
})

// System database
user.on('speak', (said) => {
    console.log('reading to the database')
})

// System logger
user.on('speak', (sain) => {
    console.log('log what happen')
})

let list = {
    _list: [],
    set item(name) {
        // notify the observers
        user.emit('speak', 'Hello world')
        this._list.push(name)
    },
    get item () {
        return this._list
    }
}

// setTimeout(() => {
//     list.item = 'test'
// },3000)

setInterval(() => {
    list.item = 'test'
},1000)


// OTHER EXAMPLES OF EVENTS
// https://stackoverflow.com/questions/38881170/when-should-i-use-eventemitter

// mongoose.connection.on('connected', function () {
//     //connected successfully
// });

// mongoose.connection.on('error', function (err) {
//     //connection error
// });

// mongoose.connection.on('disconnected', function () {
//     //disconnected
// });