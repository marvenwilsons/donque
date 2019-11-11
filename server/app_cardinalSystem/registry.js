module.exports = (() => {
    return {
        adminMethods: require('../app_programs/administration/index'),
        dqapp: require('../app_programs/protocols/index'),
        pageMethods: require('../app_programs/page/index'),
        collectionMethods: require('../app_programs/collections/index')
    }
})()

