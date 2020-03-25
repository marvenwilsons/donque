const { execFile, exec, execSync, spawn } = require('child_process')
const dblocation = require('./db.location')

const runNextTest = (testFile) => {
    execFile('mongod', ['--dbpath', dblocation, '--shutdown'], (error, stdout, stderr) => {
    });
    console.log(`Executing test : ${__dirname}/${testFile}`)

    setTimeout(() => {
        execSync(
            `node ${__dirname}/${testFile}`,
            { stdio: 'inherit' }
        );
    },50)

    
}

module.exports = runNextTest