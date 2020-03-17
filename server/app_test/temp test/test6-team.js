const cardinalTest = require('../cardinalTest')
const { execFile, exec, execSync, spawn } = require('child_process')
const dblocation = require('./db.location')

const startDatabaseServer = (callback) => {
    console.log('starting mongo server')
    const mongod = spawn('mongod', ['--dbpath', dblocation])
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

let hasErr = false

myTest = [
    // login as owner
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

        }
    },
    // test 1 creating new team width undefined value
    {
        desc: 'creating new team width undefined value',
        expected: false,
        expectedMsg: 'Team name is undefined',
        input: {
            username: 'jannyann',
            token: undefined,
            section: 'adminMethods',
            command: 'createTeam',
            data: {}
        },
        before: err => err(hasErr),
        after: err => err(hasErr),
        data(data) {
            myTest[2].input.token = data[0].data.actions[0].content.token
        }
    },
    // test 1 creating new team width undefined value
    {
        desc: 'creating new team width null value',
        expected: false,
        expectedMsg: 'Team name is undefined',
        input: {
            username: 'jannyann',
            token: undefined,
            section: 'adminMethods',
            command: 'createTeam',
            data: {
                teamName: null
            }
        },
        before: err => err(hasErr),
        after: err => err(hasErr),
        data(data) {
            myTest[3].input.token = data[0].data.actions[0].content.token
        }
    },
    // test 2 creating new team
    {
        desc: 'creating new team',
        expected: true,
        expectedMsg: 'developers team was successfully created',
        input: {
            username: 'jannyann',
            token: undefined,
            section: 'adminMethods',
            command: 'createTeam',
            data: {
                teamName: 'developers'
            }
        },
        before: err => err(hasErr),
        after: err => err(hasErr),
        data(data) {
            myTest[4].input.token = data[0].data.actions[0].content.token
        }
    },
    // test 2 creating new team, duplicate test
    {
        desc: 'creating new team duplicate should fail',
        expected: false,
        expectedMsg: 'developers team already exist',
        input: {
            username: 'jannyann',
            token: undefined,
            section: 'adminMethods',
            command: 'createTeam',
            data: {
                teamName: 'developers'
            }
        },
        before: err => err(hasErr),
        after: err => err(hasErr),
        data(data) {
            // myTest[5].input.token = data[0].data.actions[0].content.token
        }
    },
    // test 5 assigning an admin to a non existent team should fail
    {
        section: 'adminMethods',
        command: 'assignAppActorToTeam',
        data: {
            assignTo: 'developers',
            position: 'member',
            label: 'font-end dev',
            username: 'marvenwilsons'
        }
    }
    // test 2 deleting team
    // test attempt to assign an admin to a deleted team should fail
    // test 4 getting all team list
    // test 6 renaming a team
    // test 7 checking if the team name reflected to the admin after rename
    // test 8 illegal api cal
]

cardinalTest(myTest)