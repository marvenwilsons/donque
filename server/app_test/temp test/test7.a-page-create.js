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
        console.log('Db Server is running')
    })
}

let hasErr = false

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
            myTest[1].input.token = data[0].data.actions[0].content.token
        }
    },
    // create page level 1
    {
        desc: 'create page level 1',
        expected: true,
        expectedMsg: 'services page successfully created',
        input: {
            username: 'jannyann',
            token: undefined,
            section: 'pageMethods',
            command: 'createPage',
            data: {
                name: 'services',
                parent: undefined
            }
        },
        before: err => err(false),
        after: err => err(false),
        data(data) {
            myTest[2].input.token = data[0].data.actions[0].content.token
        }
    },
    {
        desc: 'get css',
        expected: true,
        expectedMsg: null,
        input: {
            username: 'jannyann',
            token: undefined,
            section: 'pageMethods',
            command: 'getCss'
        },
        before: err => err(false),
        after: err => err(false)
    }
    // create page level 2
    // {
    //     desc: 'create page level 2',
    //     expected: true,
    //     expectedMsg: 'service-1 page successfully created',
    //     input: {
    //         username: 'jannyann',
    //         token: undefined,
    //         section: 'pageMethods',
    //         command: 'createPage',
    //         data: {
    //             name: 'service-1',
    //             parent: 'services'
    //         }
    //     },
    //     before: err => err(false),
    //     after: err => err(false),
    //     data(data) {
    //         myTest[3].input.token = data[0].data.actions[0].content.token
    //     }
    // },
    // // create page level 2.a
    // {
    //     desc: 'create page level 2.a',
    //     expected: true,
    //     expectedMsg: 'service-2 page successfully created',
    //     input: {
    //         username: 'jannyann',
    //         token: undefined,
    //         section: 'pageMethods',
    //         command: 'createPage',
    //         data: {
    //             name: 'service-2',
    //             parent: 'services'
    //         }
    //     },
    //     before: err => err(false),
    //     after: err => err(false),
    //     data(data) {
    //         myTest[4].input.token = data[0].data.actions[0].content.token
    //     }
    // },
    // // create page level 3
    // {
    //     desc: 'create page level 3',
    //     expected: true,
    //     expectedMsg: 'foot-massage page successfully created',
    //     input: {
    //         username: 'jannyann',
    //         token: undefined,
    //         section: 'pageMethods',
    //         command: 'createPage',
    //         data: {
    //             name: 'foot-massage',
    //             parent: 'services.service-2'
    //         }
    //     },
    //     before: err => err(false),
    //     after: err => err(false),
    //     data(data) {
    //         myTest[5].input.token = data[0].data.actions[0].content.token
    //     }
    // },
    // // create page level 4
    // {
    //     desc: 'create page level 4',
    //     expected: true,
    //     expectedMsg: 'RMT page successfully created',
    //     input: {
    //         username: 'jannyann',
    //         token: undefined,
    //         section: 'pageMethods',
    //         command: 'createPage',
    //         data: {
    //             name: 'RMT',
    //             parent: 'services.service-2.foot-massage'
    //         }
    //     },
    //     before: err => err(false),
    //     after: err => err(false),
    //     data(data) {
    //         myTest[6].input.token = data[0].data.actions[0].content.token
    //     }
    // },

    // /**
    //  * 
    //  */
    // {
    //     desc: 'get page',
    //     expected: true,
    //     expectedMsg: null,
    //     input: {
    //         username: 'jannyann',
    //         token: undefined,
    //         section: 'pageMethods',
    //         command: 'getPage',
    //         data: {
    //             path: 'home'
    //         }
    //     },
    //     before: err => err(false),
    //     after: err => err(false),
    //     data(data) {
    //         myTest[7].input.token = data[0].data.actions[0].content.token
    //     }
    // },
    // /**
    //  * 
    //  */
    // {
    //     desc: 'Add section, character test',
    //     expected: false,
    //     expectedMsg: 'Error: section role must not exceed 25 characters',
    //     input: {
    //         username: 'jannyann',
    //         token: undefined,
    //         section: 'pageMethods',
    //         command: 'updatePage',
    //         data: {
    //             mode: "addSection",
    //             path: 'home',
    //             customData: {
    //                 role: 'the quick brown fox jumps over the lazy dog.'
    //             }
    //         }
    //     },
    //     before: err => err(false),
    //     after: err => err(false),
    //     data(data) {
    //         myTest[8].input.token = data[0].data.actions[0].content.token
    //     }
    // }
]

cardinalTest(myTest)