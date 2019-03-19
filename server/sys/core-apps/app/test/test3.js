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

const myTest = [
    // 0 test admin login
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
        after: err => {
            setTimeout(() => {
                err(false)
            },100)
        },
        data(data){
            // set the value of username and token from the return value
            // of this test, this simulates getting the data from the client
            // saved in the localStorage
            myTest[1].input.token = data[0].data.actions[0].content.token
            myTest[1].input.username = data[0].data.actions[0].content.username
        }
    },
    // 1 create a role general approach
    {
        desc: 'create a new role general approach',
        expected: true,
        expectedMsg: 'Successfully created reader',
        input: {
            username: undefined,
            token: undefined,
            section: 'adminMethods',
            command: 'createAppAdminRule',
            data:{
                roleTitle:'reader',
                approach: 'general',
                permission: ['r']
            }
        },
        before: err => err(false),
        after: err => err(false),
        data(data){
            // set the value of username and token from the return value
            // of this test, this simulates getting the data from the client
            // saved in the localStorage
            myTest[2].input.token = data[0].data.actions[0].content.token
            myTest[2].input.username = data[0].data.actions[0].content.username
        }
    },
    // 2 create a role section approach
    {
        desc: 'create a new role section approach',
        expected: true,
        expectedMsg: 'Successfully created reader2',
        input: {
            username: undefined,
            token: undefined,
            section: 'adminMethods',
            command: 'createAppAdminRule',
            data:{
                roleTitle:'reader2',
                approach: 'section',
                permission: {
                    adminActions:['r','w'],
                    pageMethods:['r','w'],
                    components:['r','w'],
                    shell:['r','w']
                }
            }
        },
        before: err => err(false),
        after: err => err(false),
        data(data){
            console.log('what??')
            myTest[3].input.token = data[0].data.actions[0].content.token
            myTest[3].input.username = data[0].data.actions[0].content.username
        }
    },
    // 3 attempt to create reader2 should fail
    {
        desc: 'attempt to create reader2 should fail',
        expected: false,
        expectedMsg: 'the role title named "reader2" already exist',
        input: {
            username: undefined,
            token: undefined,
            section: 'adminMethods',
            command: 'createAppAdminRule',
            data:{
                roleTitle:'reader2',
                approach: 'section',
                permission: {
                    adminActions:['r','w'],
                    pageMethods:['r','w'],
                    components:['r','w'],
                    shell:['r']
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

    // 4 create new admin
    {
        desc: 'create new admin using newly created permission set',
        expected: true,
        expectedMsg: 'John P Doe was successfully saved to database',
        input: {
            username: undefined,
            token: undefined,
            section: 'adminMethods',
            command: 'createAppAdmin',
            data: {
                username: 'johndoe',
                password: 'passwordtesting123@',
                adminName: 'John P Doe',
                roleTitle: 'reader',
                email: 'samplemail@smail2.com'
            },
        },
        before: err => err(false),
        after: err => err(false),
    },
    
    // logout
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
    }
]

cardinalTest(myTest)

