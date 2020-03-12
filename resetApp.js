const path = require('path')
const fs = require('fs')
const dqfs = require('./server/app_lib/utils/dqfs.js')

console.log('** Reseting application')

// const files_to_be_deleted = fs.readdirSync(path.join(__dirname, '../../Desktop/database/Data/storage.bson'))
// console.log(files_to_be_deleted)

const database_location = path.join(__dirname, '../dq-db/Data')

// console.log(fs.readdirSync(database_location))
// return

const { execFile, exec, execSync, spawn } = require('child_process')

execFile('mongod', ['--dbpath', database_location, '--shutdown'], (error, stdout, stderr) => {
    console.log('** Database shutdown')

    console.log('** Clearing database directory')
    dqfs.rm(database_location)

    console.log('** Creating Data directory')
    dqfs.mkdir(database_location)

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

