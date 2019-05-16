/**
 * This test simulates the owner editing the an admin's permission
 * and the admin trying to access am unpermitted method
 */

const { execFile, exec, execSync, spawn } = require('child_process')
const cardinalTest = require('../cardinalTest')
const testRunner = require('./testrunner')

execFile('mongod', ['--dbpath', '/home/marven/Desktop/database/Data', '--shutdown'], (error, stdout, stderr) => {
});

console.log('Starting test 4')

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
        console.log('Db Server is running')

    })
}


const myTest = [

//@test4 login as the owner
    {
        desc: 'owner admin login expected to succeed',
        expected: true,
        expectedMsg: 'Auth Ok',
        input: {
            username: 'jannyann',
            password: 'password123@',
            section: 'adminMethods',
            command: 'adminlogin'
        },
        before(err) {
            startDatabaseServer((result) => {
                err(result)
            })
        },
        after: err => {
            setTimeout(() => {
                err(false)
            }, 100)
        },
        data(data) {
            // set the value of username and token from the return value
            // of this test, this simulates getting the data from the client
            // saved in the localStorage
            myTest[1].input.token = data[0].data.actions[0].content.token
            myTest[1].input.username = data[0].data.actions[0].content.username
        }
    },
//@test4 list admins
//@test4 view admin
    {
        desc: 'View admin credentials',
        expected: true,
        expectedMsg: null,
        input: {
            username: undefined,
            token: undefined,
            section: 'adminMethods',
            command: 'viewAppAdmin',
            data: {
                username: 'marvenwilsons'
            }
        },
        before: err => err(false),
        after: err => err(false),
        data(data) {
            myTest[2].input.token = data[0].data.actions[0].content.token
            myTest[2].input.username = data[0].data.actions[0].content.username
        }
    },
//@test4 attempt to view admin the does not exist.
    {
        desc: 'attempt to view an admin that does not exist' ,
        expected: false,
        expectedMsg: 'There is no such admin foo',
        input: {
            username: undefined,
            token: undefined,
            section: 'adminMethods',
            command: 'viewAppAdmin',
            data: {
                username: 'foo'
            }
        },
        before: err => err(false),
        after: err => err(false),
        data(data) {
            myTest[3].input.token = data[0].data.actions[0].content.token
            myTest[3].input.username = data[0].data.actions[0].content.username
        }
    },
//@test4 update admin
    {
        desc: 'update owner admin username 1',
        expected: true,
        expectedMsg: 'Successfully updated username to jannyann',
        input: {
            username: undefined,
            token: undefined,
            section: 'adminMethods',
            command: 'updateAppAdmin',
            data: {
                users_username: 'jannyann',
                customData: {
                    username: 'jannyann',
                }
            }
        },
        before: err => err(false),
        after: err => err(false),
        data(data) {
            myTest[4].input.token = data[0].data.actions[0].content.token
            myTest[4].input.username = data[0].data.actions[0].content.username
        }
    },
//@test4 update dev admin resource using dot notation
    {
        desc: 'update dev admin resource using dot notation',
        expected: true,
        expectedMsg: 'Successfully updated resource.Pages.deletePage to false',
        input: {
            username: undefined,
            token: undefined,
            section: 'adminMethods',
            command: 'updateAppAdmin',
            data: {
                users_username: 'marvenwilsons',
                customData: {
                    'resource.Pages.deletePage': false,
                }
            }
        },
        before: err => err(false),
        after: err => err(false),
    },
//@test4 login as the dev admin
    {
        desc: 'login as a dev admin',
        expected: true,
        expectedMsg: 'Auth Ok',
        input: {
            username: 'marvenwilsons',
            password: 'password123@',
            section: 'adminMethods',
            command: 'adminlogin'
        },
        before: err => err(false),
        after: err => err(false),
        data(data) {
            myTest[6].input.token = data[4].data.actions[0].content.token
            myTest[6].input.username = data[4].data.actions[0].content.username
        }
    },
//@test4 try to make an unpermitted request
    {
        desc: 'unpermitted request attempt',
        expected: false,
        expectedMsg: 'Permission denied',
        input: {
            username: 'marvenwilsons',
            token: undefined,
            section: 'pageMethods',
            command: 'deletePage'
        },
        before: err => err(false),
        after: err => err(false),
        data(data) {
            myTest[6].input.token = data[0].data.actions[0].content.token
            myTest[6].input.username = data[0].data.actions[0].content.username
        }
    },
//@test4 login as the app owner
    {
        desc: 'owner admin login expected to succeed',
        expected: true,
        expectedMsg: 'Auth Ok',
        input: {
            username: 'jannyann',
            password: 'password123@',
            section: 'adminMethods',
            command: 'adminlogin'
        },
        before: err => err(false),
        after: err => err(false),
        data(data) {
            myTest[8].input.token = data[0].data.actions[0].content.token
            myTest[8].input.username = data[0].data.actions[0].content.username
        }
    },
//@test4 update dev admin resource using dot notation back
    {
        desc: 'update dev admin resource back',
        expected: true,
        expectedMsg: 'Successfully updated resource.Pages.deletePage to true',
        input: {
            username: undefined,
            token: undefined,
            section: 'adminMethods',
            command: 'updateAppAdmin',
            data: {
                users_username: 'marvenwilsons',
                customData: {
                    'resource.Pages.deletePage': true,
                }
            }
        },
        before: err => err(false),
        after: err => err(false),
        data(data) {
            myTest[9].input.token = data[4].data.actions[0].content.token
            myTest[9].input.username = data[4].data.actions[0].content.username
        }
    },
//@test4 now that the permission is updated, the dev admin should now make successfull request
    {
        desc: 'permitted request',
        expected: true,
        expectedMsg: null,
        input: {
            username: 'marvenwilsons',
            token: undefined,
            section: 'pageMethods',
            command: 'deletePage',
            data: {
                pageName: 'foo'
            }
        },
        before: err => err(false),
        after: err => {
            err(false)
        },
        data(data) {
            myTest[10].input.token = data[0].data.actions[0].content.token
            // myTest[11].input.token = data[4].data.actions[0].content.token
        }
    },
//@test4 logout    
    {
        desc: 'logout to application owner',
        expected: true,
        expectedMsg: null,
        input: {
            token: undefined,
            username: 'jannyann',
            section: 'adminMethods',
            command: 'adminLogout'
        },
        before: err => err(false),
        after: err => err(false),
        data(data) {
            myTest[11].input.token = data[4].data.actions[0].content.token
        }
    },
    {
        desc: 'logout to application admin',
        expected: true,
        expectedMsg: null,
        input: {
            token: undefined,
            username: 'marvenwilsons',
            section: 'adminMethods',
            command: 'adminLogout'
        },
        before: err => err(false),
        after: err => err(false),
    },
]


cardinalTest(myTest)
