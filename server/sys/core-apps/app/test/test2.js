const { execFile, exec, execSync, spawn } = require('child_process')
const cardinalTest = require('../cardinalTest')

const startDatabaseServer = (callback) => {
    console.log('starting mongo server')
    const mongod = spawn('mongod', ['--dbpath', '/home/marven/Desktop/database/Data'])
    mongod.stdout.on('data', stdout => {
        const myRe = /waiting for connections on port 27017/
        const re = myRe.exec(stdout.toString())
        console.log(`${stdout.toString()}`.green)
        if (re != null) {
            setTimeout(() => {
                callback(false)
            }, 100)
        }
    })
    mongod.stderr.on('data', stderr => {
        console.log(stderr.toString())
    })
    mongod.stdout.on('close', code => {
        console.log('DONE')
        console.log(code)
    })
}

const myTests = [
    // 0 test admin login
    {
        desc: 'owner admin login expected to succeed',
        expected: true,
        expectedMsg: 'Auth Ok',
        input:{
            username:'jannyann',
            password:'password123@',
            section:'adminMethods',
            command:'adminlogin'
        },
        before(err){
            startDatabaseServer((result) => {
                err(result)
            })
        },
        after: err => err(false),
        data(data){
            // set the value of username and token from the return value
            // of this test, this simulates getting the data from the client
            // saved in the localStorage
            myTests[2].input.token = data[0].data.actions[0].content.token
            myTests[2].input.username = data[0].data.actions[0].content.username
        }
    },
    // 1 test get app state
    {
        desc: 'get current app state',
        expected: true,
        expectedMsg: null,
        input: {},
        before(err){
            err(false)
        },
        after: err => err(false),
    },
    // 2 test initiate dashboard
    {
        desc: 'initialize admin dashboard with correct set of data should succeed',
        expected: true,
        expectedMsg: null,
        input: {
            username: undefined,
            token: undefined,
            section: 'adminMethods',
            command:'initAdminDashboard'
        },
        before: err => err(false),
        after: err => err(false),
        data(data){
            console.log(data[2].data.actions)
        }
    },
    // 3 test logout
    {
        desc: 'logout to application',
        expected: true,
        expectedMsg: null,
        input: {
            username: 'jannyann',
            section: 'adminMethods',
            command: 'adminLogout'
        },
        before: err => err(false),
        after: err => err(false),
    },
    // 4 test get app state
    {
        desc: 'get current app state',
        expected: true,
        expectedMsg: null,
        input: {},
        before(err){
            err(false)
        },
        after: err => err(false),
    },
    // 5 attempt to initialize dashboard without logging in should fail
    {
        desc: 'attempt to initialize dashboard without logging in should fail',
        expected: false,
        expectedMsg: 'Illegal api call detected request is not permitted',
        input: {
            username: 'jannyann',
            token: undefined,
            section: 'adminMethods',
            command:'initAdminDashboard'
        },
        before: err => err(false),
        after: err => err(false),
    },
    // 6 test get app state
    {
        desc: 'get current app state',
        expected: true,
        expectedMsg: null,
        input: {},
        before(err){
            err(false)
        },
        after: err => err(false),
    },
    // 7 test admin login
    {
        desc: 'owner admin login expected to succeed',
        expected: true,
        expectedMsg: 'Auth Ok',
        input:{
            username:'jannyann',
            password:'password123@',
            section:'adminMethods',
            command:'adminlogin'
        },
        before: err => err(false),
        after: err => err(false),
        data(data){
            // set the value of username and token from the return value
            // of this test, this simulates getting the data from the client
            // saved in the localStorage
            myTests[8].input.token = data[0].data.actions[0].content.token
            myTests[8].input.username = data[0].data.actions[0].content.username
        }
    },
    // 8 test create new admin
    {
        desc: 'create new admin',
        expected: true,
        expectedMsg: 'Marven was successfully saved to database',
        input: {
            username: undefined,
            token: undefined,
            section:'adminMethods',
            command:'createAppAdmin',
            data: {
                username: 'sampleusername',
                password: 'samplepassword123@',
                adminName:'Marven',
                roleTitle:'owner',
                email:'samplemail@smail.com'

            },
        },
        before: err => err(false),
        after: err => err(false)
    }
    // 9 logout
    // 10 login as the new admin
    // 11 try to create new admin shoud fail on this admin because it doesnt have the title owner
]

cardinalTest(myTests)