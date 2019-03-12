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
    // test admin login
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
    // test get app state
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
    // test initiate dashboard
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
    // test logout
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
    // test get app state
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
    // attempt to initialize dashboard without logging in should fail
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
    // test get app state
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
]

cardinalTest(myTests)