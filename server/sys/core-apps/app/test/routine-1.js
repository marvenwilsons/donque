
const { execFile } = require('child_process')

const username = 'jannyann'
const password = 'password123@'
let dbServer = false

execFile('mongod', ['--dbpath', '/home/marven/Desktop/database/Data', '--shutdown'], (error, stdout, stderr) => {
});

const routine_a = [
    // test 1
    {
        description: 'attempt to initialized app while mongo db server is not running and invalid inputs',
        expected: false,
        expectedMsg: 'Cannot reach Mongo Db server at link localhost:27017, make sure MongoDb is installed properly and is running',
        before: function (callback) {
            if (dbServer) {
                execFile('mongod', ['--dbpath', '/home/marven/Desktop/database/Data', '--shutdown'], (error, stdout, stderr) => {
                    if (error) {
                        callback(error)
                    }else{
                        callback(false)
                    }

                    console.log('stoping and clearing mongo server')
                });
            }
        },
        after: function (callback) {
            dbServer = true
            execFile('mongod', ['--dbpath', '/home/marven/Desktop/database/Data'], (error, stdout, stderr) => {
                if (error) {
                    callback(error)
                }else{
                    callback(false)
                }

                console.log('starting mongo server')
            });
        },
        input: {
            token: null,
            data: {
                siteTitle: 'youtube',
                username:'u',
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

        },
        after(callback) {

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
        before(callback) {

        },
        after(callback) {

        }
    },
    // test 4
    {
        description: 'attempt to login without initializing the application',
        expected: false,
        expectedMsg: 'Cant perform "adminlogin" command because application is not yet initialize',
        input: {
            // data: {
            //     siteTitle: 'youtube',
            //     username,
            //     password,
            //     repassword: password,
            //     email: 'marvenwilsons@gmail.com',
            //     adminName: 'Janny Ann A Bustamante'
            // },
            username,
            password,
            command: 'adminlogin',
            section: 'adminMethods'
        },
        before(callback) {

        },
        after(callback) {

        }
    },
    // test 5
    {
        description: 'login with correct information',
        expected: true,
        input: {}
    },
    // test 5
    {
        description: 'calling api with no command',
        expected: false,
        input: {}
    },
    // test 6
    {
        description: 'calling api with no section',
        expected: false,
        input: {}
    },
    // test 7
    {
        description: 'calling api init dashboard',
        expected: true,
        input: {

        }
    },
    // test 8
    {
        description: 'logout',
        expected: true,
        input: {

        }
    },
    // test 9
    {
        description: 'calling api with incorrect token',
        expected: false,
        input: {

        }
    },
    // test 10
    {
        description: 'calling api without token at all',
        expected: false,
        input: {

        }
    },
    // test 11
    {
        description: 'login with incorrect information',
        expected: false,
        input: {}
    },
    // test 12
    {
        description: 'login with correct information',
        expected: true,
        input: {}
    },
    // test 13
    {
        description: 'Reset App',
        expected: true,
        input: {}
    },
    // test 14
    {
        description: 'login with incorrect information',
        expected: false,
        input: {}
    },
    // test 15
    {
        description: 'login with correct information',
        expected: true,
        input: {}
    },
    // test 16
    {
        description: 'purge app',
        expected: true,
        input: {}
    }
]

module.exports = routine_a