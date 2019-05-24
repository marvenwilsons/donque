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

//@test4
const myTest = [
    //@test4 index 0 login
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

    //@test4 index 1 update owner admin 1
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
        data(data){
            myTest[2].input.token = data[0].data.actions[0].content.token
            myTest[2].input.username = data[0].data.actions[0].content.username
        }
    },
    //@test 4 index 2 view admin
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
                username: 'marvenwilsons'
            }
        },
        before: err => err(false),
        after: err => err(false),
        data(data){            
            const d = data[2].data.content

            if (d.username != 'marvenwilsons'){
                hasErr = `test index 2 fail, expected marvenwilsons but got ${d.username}`
            }else if(typeof d != 'object'){
                hasErr = "expected return type of viewAppAdmin should be object"
            }

            myTest[3].input.token = data[0].data.actions[0].content.token
            myTest[3].input.username = data[0].data.actions[0].content.username
        }
    },
    //@test4 index 3 attempt to delete an admin without password
    {
        desc: 'attempt to delete an admin without password',
        expected: false,
        expectedMsg: 'Password required',
        input: {
            username: 'jannyann',
            token: undefined,
            section: 'adminMethods',
            command: 'deleteAppAdmin',
        },
        b4val: false,
        before: err => err(hasErr),
        after: err => err(hasErr),
        data(data) {
            myTest[4].input.token = data[0].data.actions[0].content.token
            myTest[4].input.username = data[0].data.actions[0].content.username
        }
    },
    //@test4 index 4 attempt to delete an admin with wrong password
    {
        desc: 'attempt to delete an admin with wrong password',
        expected: false,
        expectedMsg: 'Authentication failed',
        input: {
            username: 'jannyann',
            password: 'password123', // <<- wrong password
            token: undefined,
            section: 'adminMethods',
            command: 'deleteAppAdmin',
        },
        before: err => err(hasErr),
        after: err => err(hasErr),
        data(data) {
            myTest[5].input.token = data[0].data.actions[0].content.token
            myTest[5].input.username = data[0].data.actions[0].content.username
        }
    },
    //@test4 index 5 delete an admin correct credentials
    {
        desc: 'delete an admin correct credentials',
        expected: true,
        expectedMsg: 'Successfully deleted marvenwilsons',
        input: {
            username: 'jannyann',
            password: 'password123@', // <<- correct password
            token: undefined,
            section: 'adminMethods',
            command: 'deleteAppAdmin',
            data: {
                username: 'marvenwilsons',
            }
        },
        before: err => err(hasErr),
        after: err => err(hasErr),
        data(data) {
            myTest[6].input.token = data[0].data.actions[0].content.token
            myTest[6].input.username = data[0].data.actions[0].content.username
        }
    },
    //@test4 index 6 create admin back
    {
        desc: 'create new admin using newly created permission set',
        expected: true,
        expectedMsg: 'Marven Wilson Donque was successfully saved to database',
        input: {
            username: undefined,
            token: undefined,
            section: 'adminMethods',
            command: 'createNewAppActor',
            data: {
                username: 'marvenwilsons',
                password: 'password123@',
                adminName: 'Marven Wilson Donque',
                roleTitle: 'dev',
                email: 'samplemail@smail2.com'
            },
        },
        before: err => err(hasErr),
        after: err => err(hasErr),
        data(data) {
            myTest[7].input.token = data[0].data.actions[0].content.token
        }
    },
    //@test4 index 7 logout
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
        after: err => err(false)        
    },
    //@test4 index 9 make illegal api call
    {
        desc: 'illegal api call',
        expected: false,
        expectedMsg: 'Illegal api call detected request is not permitted',
        input: {
            token: undefined,
            username: 'marvenwilsons',
            password: 'password123@',
            section: 'adminMethods',
            command: 'deleteAppAdmin'
        },
        before: err => err(false),
        after: err => err(false)
    }
]

cardinalTest(myTest)