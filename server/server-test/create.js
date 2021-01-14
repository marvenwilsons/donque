const fs = require('fs')
const path = require('path')

console.log('creating test files')

const root = path.join(__dirname,`./test-data/${process.argv[2]}`)

fs.mkdir(root, (err) => {
    if(err) {
        console.log(err)
    } else {
        fs.writeFileSync(`${root}/config.json`, `
{
    "filepath_to_test": "server/app/",
    "method_to_test": null
}
        `)


        fs.writeFileSync(`${root}/happy.json`, `
{
    "data_description": "Data is expected to be successfull",
    "expected": true,
    "data": {

    }
}
        `)


        fs.writeFileSync(`${root}/fail-1.json`, `
{
    "data_description": "Data is expected to fail",
    "expected": false,
    "data": {

    }
}
        `)

        fs.writeFileSync(`${root}/fail-2.json`, `
{
    "data_description": "Data is expected to fail",
    "expected": false,
    "data": {

    }
}
        `)


        fs.writeFileSync(`${root}/middleware.js`, `
module.exports = async ({data : {/** props here */},method}, cb) => {
    /** cb should be called at the end of execution and return the final return value */
}
        `)
    }
})