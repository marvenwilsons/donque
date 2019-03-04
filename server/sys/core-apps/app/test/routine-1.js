
const { execFile, exec, execSync, spawn } = require('child_process')

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
    {
        description: 'attempt to initialized app while mongo db server is not running and invalid inputs',
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
    // test 2
    {
        description: 'Get the current app state',
        expected: true,
        expectedMsg:'init required',
        input: {},
        before(callback){
            callback(false)
        },
        after(callback){
            callback(false)
        }
    },
    // test 3
    {
        description: 'attempt to initialized app with db server running but with invalid username',
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
        before(callback) {
            callback(false)
        },
        after(callback) {
            callback(false)
        },
    },
    // test 3
    {
        description: 'attempt to initialized app with db server running but with invalid password',
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
        before(callback) { },
        after(callback) {
            callback(false)
        }
    },
    // test 4
    {
        description: 'attempt to login without initializing the application',
        expected: false,
        expectedMsg: 'Cant perform "adminlogin" command because application is not yet initialize',
        input: {
            username,
            password,
            command: 'adminlogin',
            section: 'adminMethods'
        },
        before(callback) { },
        after(callback) {
            callback(false)
        }
    },
    // test 5
    {
        description: 'attempt to reach cardinal system without casting a command or specifying a section is expected to fail',
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
        before(callback) { },
        after(callback) {
            callback(false)
        }
    },
    // test 6
    {
        description: 'attempt to reach cardinal system without specifying a section is expected to fail',
        expected: false,
        expectedMsg: 'Error reaching cardinal system because section is undefined, please specify the section upon calling the cardinal function',
        input: {
            command: 'test'
        },
        before(callback) { },
        after(callback) {
            callback(false)
        }
    },
    // test 7
    {
        description: 'attempt to reach cardinal system without specifying a command is expected to fail',
        expected: false,
        expectedMsg: 'Error reaching cardinal system because command is undefined, please specify the command upon calling the cardinal function',
        input: {
            section: 'foo'
        },
        before(callback) { },
        after(callback) {
            callback(false)
        }
    },
    // test 8
    {
        description: 'attempt to reach a section that didnt exist in the registry is expected to fail',
        expected: false,
        expectedMsg: 'The section named foo does not exist in the registry',
        input: {
            section: 'foo',
            command: 'foo'
        },
        before(callback) { },
        after(callback) {
            callback(false)
        }
    },
    // test 9
    {
        description: 'attempt to reach a command that didnt exist in the registy is expected to fail',
        expected: false,
        expectedMsg: 'The command named foo does not exist in the registry',
        input: {
            section: 'dqapp',
            command: 'foo'
        },
        before(callback) { },
        after(callback) {
            callback(false)
        }
    },
    // test 10
    {
        description: 'initialize the app with correct set of data, with server is running, all is green is expected to succeed',
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
        after: err => err(false),
        before(err) {
            err(false)
        }
    },
    // test 11 get current app state should be owner login required
    {
        description: 'get the current app state, output msg should be - owner login required',
        expected: true,
        expectedMsg:'owner login required',
        input: {},
        after: err => err(false),
        before: err => err(false)
    }
    // test initialized dashboard
    // test logout
    // test attempt to cast admin command with incorrect token
    // test attempt to cast admin command with no token at all
    // test login with incorrect credentials
    // test login with correct credentials
    // test reset application
    // test purge app with owner credentials
]

module.exports = routine_a