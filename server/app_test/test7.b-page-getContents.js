const cardinalTest = require('./cardinalTest')
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
        console.log('Db Server is running')
    })
}

hasErr = false

const myTest = [
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
            // myTest[1].input.token = data[0].data.actions[0].content.token
        }
    },
    {
        desc: 'get page contents public access',
        expected: true,
        expectedMsg: null,
        method: 'get',
        input: {
            username: null,
            password: null,
            section: 'pageMethods',
            command: 'getPageContents',
            data: {
                path: '/'
            }
        },
        before(err) {
            err(false)
        },
        after(err) {
            err(false)
        },
        data(data) {

        }
    }
]

cardinalTest(myTest)
