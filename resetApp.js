const path = require('path')
const fs = require('fs')
const dqfs = require('./server/app_lib/utils/dqfs.js')

console.log('** Reseting application')

// const files_to_be_deleted = fs.readdirSync(path.join(__dirname, '../../Desktop/database/Data/storage.bson'))
// console.log(files_to_be_deleted)

const { execFile, exec, execSync, spawn } = require('child_process')

execFile('mongod', ['--dbpath', '/home/marven/Desktop/database/Data', '--shutdown'], (error, stdout, stderr) => {
    console.log('** Database shutdown')

    console.log('** Clearing database directory')
    dqfs.rm(path.join(__dirname, '../../Desktop/database/Data/'))

    console.log('** Creating Data directory')
    dqfs.mkdir(path.join(__dirname, '../../Desktop/database/Data'))

    // console.log(fs.readdirSync())
    


    console.log('** starting test')
    setTimeout(() => {
        dqfs.rm(path.join(__dirname, 'server/app_manifest/'))

        dqfs.mkdir(path.join(__dirname, 'server/app_manifest'))
        setTimeout(() => {
            execSync(
                `node ./server/app_test/test-1-CoreSystem-feature.js`,
                { stdio: 'inherit' }
            );
        },500)
    }, 500);
});

