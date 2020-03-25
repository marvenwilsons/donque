const cardinalTest = require('./cardinalTest')
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
    /**
     * Create Collection
     */
    {
        desc: 'Create Collection',
        expected: true,
        input: {
            section: 'collectionMethods',
            command: 'addCollection',
            data: {
                collection_name: 'Book',
                schema: {
                    "First Name" : 'Short String',
                    "Last Name" : 'Short String',
                    "Age" : 'Number'
                }
            }
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
            myTest[2].input.token = data[0].data.actions[0].content.token
            myTest[2].input.username = data[0].data.actions[0].content.username
        }        
    },
    // Create a collection that already exist
    {
        desc: 'Create Collection that already exist, should fail',
        expected: false,
        input: {
            section: 'collectionMethods',
            command: 'addCollection',
            expectedMsg: 'Creating collection failed, collection Book already exist',
            data: {
                collection_name: 'Book',
                schema: {
                    "First Name" : 'Short String',
                    "Last Name" : 'Short String',
                    "Age" : 'Number'
                }
            }
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
            myTest[3].input.token = data[0].data.actions[0].content.token
            myTest[3].input.username = data[0].data.actions[0].content.username
        }        
    },
    // Create a collection with invalid schema: Duplicated keys
    {
        desc: 'Create a collection with invalid schema: Invalid type, should fail',
        expected: false,
        input: {
            section: 'collectionMethods',
            command: 'addCollection',
            expectedMsg: 'Creating collection failed, Invalid type Stringss',
            data: {
                collection_name: 'Test',
                schema: {
                    "First Name" : 'Short String',
                    "Last Name" : 'Stringss',
                    "Age" : 'Number'
                }
            }
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
            myTest[4].input.token = data[0].data.actions[0].content.token
            myTest[4].input.username = data[0].data.actions[0].content.username
        }        
    },
    // logout application
    {
        desc: 'logout to application',
        expected: true,
        expectedMsg: null,
        input: {
            section: 'adminMethods',
            command: 'adminLogout'
        },
        before: err => err(false),
        after: err => {
            setTimeout(() => {
                err(false)
            }, 500)
        },       
    },
    // Create collection while not login
    {
        desc: 'Attempt to create a collection while logout, should fail',
        expected: false,
        expectedMsg: 'Illegal api call detected request is not permitted',
        input: {
            section: 'collectionMethods',
            command: 'addCollection',
            data: {
                collection_name: 'Book',
                schema: {
                    "First Name" : 'String',
                    "Last Name" : 'String',
                    "Age" : 'Number'
                }
            }
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
        }        
    },

    /**
     * Fetch collection
     */
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
            err(false)
        },
        after: err => {
            setTimeout(() => {
                err(false)
            }, 400)
        },
        data(data) {
            myTest[7].input.token = data[0].data.actions[0].content.token
            myTest[7].input.username = data[0].data.actions[0].content.username
        }
    },
    // fetch collection
    {
        desc: 'Fetch Collection',
        expected: true,
        expectedMsg: null,
        input: {
            section: 'collectionMethods',
            command: 'fetchCollections',
            data: {}
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
            myTest[8].input.token = data[0].data.actions[0].content.token
            myTest[8].input.username = data[0].data.actions[0].content.username
        } 
    },

    /**
     * Delete
     */
    {
        desc: 'Delete Collection without password passed, should fail, and prompt for password',
        expected: false,
        expectedMsg: 'Password required',
        input: {
            section: 'collectionMethods',
            command: 'deleteCollection',
            password: '',
            data: {}
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
            myTest[9].input.token = data[0].data.actions[0].content.token
            myTest[9].input.username = data[0].data.actions[0].content.username
        } 
    },
    // Delete a collection with wrong password passed
    {
        desc: 'Delete Collection while passing wrong password, should fail',
        expected: false,
        expectedMsg: 'Authentication failed',
        input: {
            section: 'collectionMethods',
            command: 'deleteCollection',
            password: 'asdfasdf',
            data: {}
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
            myTest[10].input.token = data[0].data.actions[0].content.token
            myTest[10].input.username = data[0].data.actions[0].content.username
        } 
    },
    // Delete a collection with correct credentials
    {
        desc: 'Delete Collection with correct credentials',
        expected: true,
        expectedMsg: null,
        input: {
            section: 'collectionMethods',
            command: 'deleteCollection',
            password: 'password123@',
            data: {
                'Collection Name' : 'Book'
            }
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
            myTest[10].input.token = data[0].data.actions[0].content.token
            myTest[10].input.username = data[0].data.actions[0].content.username
        } 
    },
    // Create a collection back
    // logout application
    // done
]

cardinalTest(myTest)