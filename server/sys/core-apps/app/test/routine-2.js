/**
 * Tests after initialization
 */
const { execFile, exec, execSync, spawn } = require('child_process')

const username = 'jannyann'
const password = 'password123@'

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



const r2 = [
    // test 14 login as the owner
    {
        desc: 'owner login with correct credentials should succeed',
        expected: true,
        expectedMsg: 'Auth Ok',
        input: {
            username,
            password,
            command: 'adminlogin',
            section: 'adminMethods'
        },
        after: err => err(false),
        before: err => {
            startDatabaseServer((res) => {
                err(res)
            })
        }
    },
]

module.exports = r2