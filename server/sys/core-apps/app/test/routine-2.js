const r2 = [
    // test get current app state should be owner login required
    {
        description: 'get the current app state, output msg should be - owner login required',
        expected: true,
        expectedMsg:'owner login required',
        input: {},
        after: err => err(false),
        before: err => err(false)
    }
]

module.exports = r2