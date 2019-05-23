const { execFile, exec, execSync, spawn } = require('child_process')

const runNextTest = (testFile) => {
    execFile('mongod', ['--dbpath', '/home/marven/Desktop/database/Data', '--shutdown'], (error, stdout, stderr) => {
    });
    console.log(`Executing test : ${__dirname}/${testFile}`)

    setTimeout(() => {
        execSync(
            `node ${__dirname}/${testFile}`,
            { stdio: 'inherit' }
        );
    },4000)

    
}

module.exports = runNextTest