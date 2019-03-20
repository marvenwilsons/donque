const cardinalTest = require('../cardinalTest')
const { execFile, exec, execSync, spawn } = require('child_process')

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

const myTest = [
    //login
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

            myTest[2].input.token = data[0].data.actions[0].content.token
        }
    },

    // update owner admin 1
    {
        desc: 'update owner admin username 1',
        expected: true,
        expectedMsg: 'Successfully updated username to jannyannbustamante',
        input: {
            username: undefined,
            token: undefined,
            section: 'adminMethods',
            command: 'updateAppAdmin',
            data: {
                users_username: 'jannyann',
                customData: {
                    username: 'jannyannbustamante',
                }
            }
        },
        before: err => err(false),
        after: err => err(false)
    },
    // update owner admin back
    {
        desc: 'update owner admin username back',
        expected: true,
        expectedMsg: 'Successfully updated username to jannyann',
        input: {
            username: 'jannyannbustamante',
            token: undefined,
            section: 'adminMethods',
            command: 'updateAppAdmin',
            data: {
                users_username: 'jannyannbustamante',
                customData: {
                    username: 'jannyann',
                }
            }
        },
        before: err => {
            setTimeout(() => {
                err(false)
            },500)
        },
        after: err => err(false)
    },

    // view admin
    {
        desc: 'View admin credentials',
        expected: true,
        expectedMsg: null,
        input: {
            username: 'jannyann',
            token: undefined,
            section: 'adminMethods',
            command: 'viewAppAdmin',
            data: {
                username: 'johndoe'
            }
        },
        before: err => err(false),
        after: err => err(false)
    }
    // delete an admin
    // create admin back
    // logout
    // login as the new admin
    // make illegal api calls

    // update a role
    // delete a role
    // read a role

    // logout
    // login as the new created admin
    // attempt to call some methods that the current admin has no permission

    // 11 try to create new admin shoud fail on this admin because it doesnt have the title owner
]

cardinalTest(myTest)