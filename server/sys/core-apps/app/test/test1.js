//@test1
const { execFile, exec, execSync, spawn } = require('child_process')
const cardinalTest = require('../cardinalTest')
const testRunner = require('./testrunner')


const username = 'jannyann'
const password = 'password123@'
let dbServer = false

execFile('mongod', ['--dbpath', '/home/marven/Desktop/database/Data', '--shutdown'], (error, stdout, stderr) => {
});

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

/**
 * For this series of test to work
 * a. database should be empty 
 * b. iniConf.json should not exist
 * 
 * this is to simulate a fresh download from the user
 */

const routine_a = [
    // test 1
    //@test1 index 0 attempt to initialized app while mongo db server is not running and invalid inputs
    {
        desc: 'attempt to initialized app while mongo db server is not running and invalid inputs',
        expected: false,
        expectedMsg: 'Cannot reach Mongo Db server at link localhost:27017, make sure MongoDb is installed properly and is running',
        before: err => err(false),
        after: function (callback) {
            /**
             * Start mongodb server
             */
            startDatabaseServer((s) => {
                callback(s)
            })
        },
        input: {
            token: null,
            data: {
                siteTitle: 'youtube',
                username: 'u',
                password,
                repassword: password,
                email: 'marvenwilsons@gmail.com',
                adminName: 'Janny Ann A Bustamante'
            },
            command: 'dqinitapp',
            section: 'dqapp'
        }
    },
    //@test1 index 1 get current app state
    {
        desc: 'Get the current app state',
        expected: true,
        expectedMsg:'init required',
        input: {},
        before: err => err(false),
        after: err => err(false)
    },
    //@test1 index 2 attempt to initialized app with db server running but with invalid username
    {
        desc: 'attempt to initialized app with db server running but with invalid username',
        expected: false,
        expectedMsg: 'Invalid username',
        input: {
            data: {
                siteTitle: 'youtube',
                username: 'M',
                password,
                repassword: password,
                email: 'marvenwilsons@gmail.com',
                adminName: 'Janny Ann A Bustamante'
            },
            command: 'dqinitapp',
            section: 'dqapp'
        },
        before: err => err(false),
        after: err => err(false)
    },
    //@test1 index 3 attempt to initialized app with db server running but with invalid password
    {
        desc: 'attempt to initialized app with db server running but with invalid password',
        expected: false,
        expectedMsg: 'Invalid password',
        input: {
            data: {
                siteTitle: 'youtube',
                username: 'jannyann',
                password: 'asdf',
                repassword: password,
                email: 'marvenwilsons@gmail.com',
                adminName: 'Janny Ann A Bustamante'
            },
            command: 'dqinitapp',
            section: 'dqapp'
        },
        before: err => err(false),
        after: err => err(false)
    },
    //@test1 index 4 attempt to login without initializing the application
    {
        desc: 'attempt to login without initializing the application',
        expected: false,
        expectedMsg: 'Cant perform "adminlogin" command because application is not yet initialize',
        input: {
            username,
            password,
            command: 'adminlogin',
            section: 'adminMethods'
        },
        before: err => err(false),
        after: err => err(false)
    },
    //@test1 index 5 attempt to reach cardinal system without casting a command or specifying a section is expected to fail
    {
        desc: 'attempt to reach cardinal system without casting a command or specifying a section is expected to fail',
        expected: false,
        expectedMsg: 'Error reaching cardinal system because command and section is undefined, please specify the section and command upon calling the cardinal function',
        input: {
            data: {
                siteTitle: 'youtube',
                username,
                password,
                repassword: password,
                email: 'marvenwilsons@gmail.com',
                adminName: 'Janny Ann A Bustamante'
            },
        },
        before: err => err(false),
        after: err => err(false)
    },
    //@test1 index 6 attempt to reach cardinal system without specifying a section is expected to fail
    {
        desc: 'attempt to reach cardinal system without specifying a section is expected to fail',
        expected: false,
        expectedMsg: 'Error reaching cardinal system because section is undefined, please specify the section upon calling the cardinal function',
        input: {
            command: 'test'
        },
        before: err => err(false),
        after: err => err(false)
    },
    //test1 index 7 attempt to reach cardinal system without specifying a command is expected to fail
    {
        desc: 'attempt to reach cardinal system without specifying a command is expected to fail',
        expected: false,
        expectedMsg: 'Error reaching cardinal system because command is undefined, please specify the command upon calling the cardinal function',
        input: {
            section: 'foo'
        },
        before: err => err(false),
        after: err => err(false)
    },
    //@test1 index 8 attempt to reach a section that didnt exist in the registry is expected to fail
    {
        desc: 'attempt to reach a section that didnt exist in the registry is expected to fail',
        expected: false,
        expectedMsg: 'The section named foo does not exist in the registry',
        input: {
            section: 'foo',
            command: 'foo'
        },
        before: err => err(false),
        after: err => err(false)
    },
    //@test1 index 9 attempt to reach a command that didnt exist in the registy is expected to fail
    {
        desc: 'attempt to reach a command that didnt exist in the registy is expected to fail',
        expected: false,
        expectedMsg: 'The command named foo does not exist in the registry',
        input: {
            section: 'dqapp',
            command: 'foo'
        },
        before: err => err(false),
        after: err => err(false)
    },
    //@test1 index 10 initialize the app with correct set of data, with server is running, all is green is expected to succeed
    {
        desc: 'initialize the app with correct set of data, with server is running, all is green is expected to succeed',
        expected: true,
        expectedMsg: 'Successfully created youtube',
        input: {
            data: {
                siteTitle: 'youtube',
                username,
                password,
                repassword: password,
                email: 'marvenwilsons@gmail.com',
                adminName: 'Janny Ann A Bustamante'
            },
            section: 'dqapp',
            command: 'dqinitapp'
        },
        before: err => err(false),
        after: err => err(false)
    },
    //@test1 index 11 get current app state should be owner login required
    {
        desc: 'get the current app state, output msg should be - owner login required',
        expected: true,
        expectedMsg:'owner login required',
        input: {},
        before: err => err(false),
        after: err => err(false)
    },
    //@test1 index 12 initialized dashboard without instantiating the connection to database credentials
    {
        desc: 'initializing dashboard or calling a core api without instantiating a connection first from app to database is expected to fail',
        expected: false,
        expectedMsg:'Cannot perform command because admin credentials is missing, Please instantiate a connection first from app to db by logging in as the application owner',
        input: {
            username: 'foo',
            token: 'not a valid token',
            command:'initActorsDashboard',
            section:'adminMethods'
        },
        before: err => err(false),
        after: err => err(false)
    },
    //@test1 index 13 login as the owner
    {
        desc: 'admin login with incorrect credentials is expected to fail',
        expected: false,
        expectedMsg:'Incorrect password or username',
        input: {
            username:'foo',
            password: 'bar',
            command:'adminlogin',
            section:'adminMethods'
        },
        before: err => err(false),
        after: err => {            
            err(false)
           
            setTimeout(() => {
                execFile('mongod', ['--dbpath', '/home/marven/Desktop/database/Data', '--shutdown'], (error, stdout, stderr) => {
                });
                setTimeout(() => {
                    testRunner('test2.js')

                },1000)
            }, 2000)
        }
    }
]

cardinalTest(routine_a)

// module.exports = routine_a