const appAgent = require('./app-agent')

const data = 'az E2c#$'

const x =
    appAgent
        .staticMethods('mass-validate', data)
        .hasCapitalLetters()
        .hasSmallLetters()
        .hasWhiteSpace()
        .hasSpecialCharacters()
        .isTrue(true)
        .isFalse(false)
        .minChar(1)
        .maxChar(4)
        .required()
        .hasNumbers()
        .done()









































































console.log(`


`)
console.log(x)
console.log(`


`)