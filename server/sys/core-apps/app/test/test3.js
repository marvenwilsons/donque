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
            },1000)
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
        data(){
            // myTest[3].input.token = data[0].data.actions[0].content.token
            // myTest[3].input.username = data[0].data.actions[0].content.username
        }
    },
    // 3 attempt to create reader2 should fail
    // {
    //     desc: 'attempt to create reader2 should fail',
    //     expected: true,
    //     expectedMsg: 'the role title named "reader2" already exist',
    //     input: {
    //         username: undefined,
    //         token: undefined,
    //         section: 'adminMethods',
    //         command: 'createAppAdminRule',
    //         data:{
    //             roleTitle:'reader2',
    //             approach: 'section',
    //             permission: {
    //                 adminActions:['r','w'],
    //                 pageMethods:['r','w'],
    //                 components:['r','w'],
    //                 shell:['r']
    //             }
    //         }
    //     },
    //     before: err => err(false),
    //     after: err => err(false)
    // }

    // delete an admin
    // update an admin
    // view admin

    // update a role
    // delete a role
    // read a role

    // logout
    // login as the new created admin
    // attempt to call some methods that the current admin has no permission

    // 11 try to create new admin shoud fail on this admin because it doesnt have the title owner
]

cardinalTest(myTest)

