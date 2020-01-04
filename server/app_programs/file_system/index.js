module.exports = {
    // dir
    createDir: require('./dir/createDir'),
    renameDir: require('./dir/renameDir'),
    deleteDir: require('./dir/deleteDir'),
    getDirContent: require('./dir/getDirContent'),
    
    // file
    createFile : require('./file/createFile'),
    renameFile : require('./file/renameFile'),
    deleteFile : require('./file/deleteFile'),
    readFile: require('./file/readFile')
}