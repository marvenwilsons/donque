const routine_a = [
    {
        description: 'init app with incorrect information',
        expected: false,
        input: {}
    },
    {
        description: 'init app with correct information',
        expected: true,
        input: {}
    },
    {
        description: 'login with incorrect information',
        expected: false,
        input: {}
    },
    {
        description: 'login with correct information',
        expected: true,
        input: {}
    },
    {
        description: 'calling api with no command',
        expected: false,
        input: {}
    },
    {
        description: 'calling api with no section',
        expected: false,
        input: {}
    },
    {
        description: 'calling api init dashboard',
        expected: true,
        input: {

        }
    },
    {
        description: 'logout',
        expected: true,
        input: {

        }
    },
    {
        description: 'calling api with incorrect token',
        expected: false,
        input: {

        }
    },
    {
        description: 'calling api without token at all',
        expected: false,
        input: {

        }
    },
    {
        description: 'login with incorrect information',
        expected: false,
        input: {}
    },
    {
        description: 'login with correct information',
        expected: true,
        input: {}
    },
    {
        description: 'Reset App',
        expected: true,
        input: {}
    },
    {
        description: 'login with incorrect information',
        expected: false,
        input: {}
    },
    {
        description: 'login with correct information',
        expected: true,
        input: {}
    },
    {
        description: 'purge app',
        expected: true,
        input: {}
    }
]

module.exports = routine_a