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

let hasErr = false

const myTest = [
    // login
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
            }, 400)
        },
        data(data) {
            // set the value of username and token from the return value
            // of this test, this simulates getting the data from the client
            // saved in the localStorage
            // console.log(data)
            myTest[1].input.token = data[0].data.actions[0].content.token
            myTest[1].input.username = data[0].data.actions[0].content.username
        }
    },
    // get dir contents
    {
        desc: 'Get dir contents',
        expected: true,
        input: {
            section: 'fileSystem',
            command: 'getDirContents',
            data: {
                name: 'image',
                addrs: 'root'
            },
            method:'get'
        },
        before(err) {
            err(false)
        },
        after(err) {
            setTimeout(() => {
                err(hasErr)
            }, 100)
        },
        data(data) {
            // myTest[2].input.token = data[0].data.actions[0].content.token
            // myTest[2].input.username = data[0].data.actions[0].content.username
        }        
    }
]

cardinalTest(myTest)
