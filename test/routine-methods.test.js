const { putData } = require('../server/request/routine-functions')


const data = 'hello'
const path = 'collections/test'
const user = {
    username: 'marven',
    userToken: 'UYGH45612jb',
    userType: 'Admin'
}
const pudData = (path,data) => {
    return new Promise(resolve => {
        resolve(`db res ==> ${path} - ${data}`)
    })
}

const credintialCheckMethod = (user,token, userType) => {
    return new Promise(resolve => {
        resolve(true)
    })
}

it('compose and perform a put routine' , () => {
    const x = putData(data)
    .inPath(path)
    .byUser(user)
    .check(credintialCheckMethod)
    .byDoing(pudData)
    .then(res => {
        expect(res.body).toBe('db res ==> collections/test - hello')
    })
})

it('throws an error, invalud byUser' , () => {
    try {
        putData(data)
        .inPath(path)
        .byUser('')
        .check(credintialCheckMethod)
        .byDoing(pudData)
    } catch(e) {
        expect(e).toBe('Invalid user object received in byUser function')
    }
})

it('throws an error, invalid check argument' , () => {
    try {
        putData(data)
        .inPath(path)
        .byUser(user)
        .check(null)
        .byDoing(pudData)
    } catch(e) {
        expect(e).toBe('Invalid .check value')
    }

    try {
        putData(data)
        .inPath(path)
        .byUser(user)
        .check({})
        .byDoing(pudData)
    } catch(e) {
        expect(e).toBe('Invalid .check value')
    }

    try {
        putData(data)
        .inPath(path)
        .byUser(user)
        .check([])
        .byDoing(pudData)
    } catch(e) {
        expect(e).toBe('Invalid .check value')
    }

    try {
        putData(data)
        .inPath(path)
        .byUser(user)
        .check('foo')
        .byDoing(pudData)
    } catch(e) {
        expect(e).toBe('Invalid .check value')
    }

})

it('throws an error, invalid byDoing value' , () => {
    try {
        putData(data)
        .inPath(path)
        .byUser(user)
        .check(credintialCheckMethod)
        .byDoing()
    } catch(e) {
        expect(e).toBe('Invalid .byDoing value')
    }

    try {
        putData(data)
        .inPath(path)
        .byUser(user)
        .check(credintialCheckMethod)
        .byDoing({})
    } catch(e) {
        expect(e).toBe('Invalid .byDoing value')
    }

    try {
        putData(data)
        .inPath(path)
        .byUser(user)
        .check(credintialCheckMethod)
        .byDoing([])
    } catch(e) {
        expect(e).toBe('Invalid .byDoing value')
    }

    try {
        putData(data)
        .inPath(path)
        .byUser(user)
        .check(credintialCheckMethod)
        .byDoing('foo')
    } catch(e) {
        expect(e).toBe('Invalid .byDoing value')
    }

})