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

//@test3
const myTest = [
    //@test3 index 0 test admin login
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
    //@test3 index 1 test admin get roles
    {
        desc: 'get roles list',
        expected: true,
        expectedMsg: null,
        input: {
            token: undefined,
            username: 'jannyann',
            section: 'adminMethods',
            command: 'getRoles'
        },
        before: err => err(false),
        after: err => err(false),
        data(data) {
            
            myTest[2].input.token = data[0].data.actions[0].content.token
            myTest[2].input.username = data[0].data.actions[0].content.username
        }
    },
    //@test3 index 2 logout
    {
        desc: 'logout to application',
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
    },
    //@test3 index 3 get roles list while logout, expected to fail 
    {
        desc: 'get roles list while logout, expected to fail',
        expected: false,
        expectedMsg: 'Illegal api call detected request is not permitted',
        input: {
            token: undefined,
            username: 'jannyann',
            section: 'adminMethods',
            command: 'getRoles'
        },
        before: err => err(false),
        after: err => err(false),
        data(data) {
            myTest[2].input.token = data[0].data.actions[0].content.token
            myTest[2].input.username = data[0].data.actions[0].content.username
        }
    },
    //@test3 index 4 login
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
            err(false)
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
            myTest[5].input.token = data[0].data.actions[0].content.token
            myTest[5].input.username = data[0].data.actions[0].content.username
        }
    },
    //@test3 index 5 create new user admin
    {
        desc: 'create new admin marven',
        expected: true,
        expectedMsg: 'Marven was successfully saved to database',
        input: {
            username: undefined,
            token: undefined,
            section: 'adminMethods',
            command: 'createNewAppActor',
            data: {
                username: 'marvenwilsons',
                password: 'password123@',
                adminName: 'Marven',
                roleTitle: 'dev',
                email: 'samplemail@smail.com'
            },
        },
        before: err => err(false),
        after: err => err(false),
        data(data) {
            myTest[6].input.token = data[0].data.actions[0].content.token
            myTest[6].input.username = data[0].data.actions[0].content.username
        }
    },
    //@test3 index 6 creating admin that is already exist
    {
        desc: 'attempt to create admin that already exist',
        expected: false,
        expectedMsg: 'Invalid username, the username "marvenwilsons" is already in used by another admin',
        input: {
            username: undefined,
            token: undefined,
            section: 'adminMethods',
            command: 'createNewAppActor',
            data: {
                username: 'marvenwilsons',
                password: 'password123@',
                adminName: 'Marven',
                roleTitle: 'dev',
                email: 'samplemail@smail.com'
            },
        },
        before: err => err(false),
        after: err => err(false),
        data(data) {
        }
    }
















    // get roles
    // 
    //@test3 index 1 create a role general approach
    // {
    //     desc: 'create a new role general approach',
    //     expected: true,
    //     expectedMsg: 'Successfully created reader',
    //     input: {
    //         username: undefined,
    //         token: undefined,
    //         section: 'adminMethods',
    //         command: 'createAppAdminRule',
    //         data:{
    //             roleTitle:'reader',
    //             approach: 'general',
    //             permission: ['r']
    //         }
    //     },
    //     before: err => err(false),
    //     after: err => err(false),
    //     data(data){
    //         // set the value of username and token from the return value
    //         // of this test, this simulates getting the data from the client
    //         // saved in the localStorage
    //         console.log('HELLO WORLD!')
    //         myTest[2].input.token = data[0].data.actions[0].content.token
    //         myTest[2].input.username = data[0].data.actions[0].content.username
    //         console.log(myTest[2])
    //     }
    // },
    // //@test3 index 2 create a role section approach
    // {
    //     desc: 'create a new role section approach',
    //     expected: true,
    //     expectedMsg: 'Successfully created reader2',
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
    //                 shell:['r','w']
    //             }
    //         }
    //     },
    //     before: err => err(false),
    //     after: err => err(false),
    //     data(data){
    //         console.log('what??')
    //         myTest[3].input.token = data[0].data.actions[0].content.token
    //         myTest[3].input.username = data[0].data.actions[0].content.username
    //     }
    // },
    // //@test3 index 3 attempt to create reader2 should fail
    // {
    //     desc: 'attempt to create reader2 should fail',
    //     expected: false,
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
    //     after: err => err(false),
    //     data(data) {
    //         myTest[4].input.token = data[0].data.actions[0].content.token
    //         myTest[4].input.username = data[0].data.actions[0].content.username
    //     }
    // }, 
    
]

cardinalTest(myTest)

