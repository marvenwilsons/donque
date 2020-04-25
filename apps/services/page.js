const path = require('path')
const Templates = require(path.join(__dirname,'../../server/templates.js'))

module.exports = Templates.Service({
    name: 'Pages',
    data: function(sql,fetch) {
        // perform get request here
        let pages = []
        pages.push(new Templates.Page({
            pageName: '/',
            admin_id:'test',
            lastModified: 'test 1',
            pageContent: 'none',
            version_id:'ASDFWEE52',
            isUndermaintenance: true
        }))
        pages.push(new Templates.Page({
            pageName: '/about',
            admin_id:'test',
            lastModified: 'test 1',
            pageContent: 'none',
            version_id:'ASDFWEE52',
            isUndermaintenance: true
        }))
        pages.push(new Templates.Page({
            pageName: '/teams',
            admin_id:'test',
            lastModified: 'test 1',
            pageContent: 'none',
            version_id:'ASDFWEE52',
            isUndermaintenance: true
        }))
        pages.push(new Templates.Page({
            pageName: '/products',
            admin_id:'test',
            lastModified: 'test 1',
            pageContent: 'none',
            version_id:'ASDFWEE52',
            isUndermaintenance: true
        }))
        pages.push(new Templates.Page({
            pageName: '/blog',
            admin_id:'test',
            lastModified: 'test 1',
            pageContent: 'none',
            version_id:'ASDFWEE52',
            isUndermaintenance: true
        }))
        pages.push(new Templates.Page({
            pageName: '/achivements',
            admin_id:'test',
            lastModified: 'test 1',
            pageContent: 'none',
            version_id:'ASDFWEE52',
            isUndermaintenance: true
        }))
        pages.push(new Templates.Page({
            pageName: '/my-service-canada-account',
            admin_id:'test',
            lastModified: 'test 1',
            pageContent: 'none',
            version_id:'ASDFWEE52',
            isUndermaintenance: true
        }))
        return pages
    },
    views: function(data,helper,utils,templates) {
        
        if(Array.isArray(data) || typeof data === 'object' && data.controllerName === 'sub page') {
            return {
                componentConfig: {
                    dataControllers: [
                        {
                            name: 'open page',
                            handler: function(item) {
                                const componentName = helper.paneGetView(item)
                                helper.paneAdd(componentName)
                            }
                        },
                        {
                            name: 'sub page',
                            handler: function() {
                                console.log('sub page')
                                console.log(data)
                            }
                        },
                        {
                            name: 'delete page',
                            handler: function(helper) {
                
                            }
                        },
                        {
                            name: 'rename page',
                            handler: function(helper) {
                                
                            }
                        }
                    ],
                    displayProp: 'pageName',
                    ableToAddItem: true,
                    infoDisplay: ['pageName','lastUpdated','updatedBy']

                },
                paneOnLoad: function() {
                    // console.log('testing! on load', data)
                },
                paneConfig: {
                    paneName: 'Pages',
                    paneWidth: '550px',
                    isClosable: true,
                    paneView: 'listify'
                },
            }
        } else if(typeof data === 'object' && !Array.isArray(data) && data.controllerName === 'open page' ) {
            // && utils.hasSetOfKeys(['pageName','lastUpdated','updatedBy'],)
            // console.log('this is the view you are looking for', data.item instanceof templates.Page)
            // console.log(data )
            return {
                componentConfig: {
                    msg: 'hello world'
                },
                paneOnLoad: function () {},
                paneConfig: {
                    paneName: data.item.pageName,
                    paneWidth: '700px',
                    isClosable: true,
                    paneView: 'pageContent',
                    paneData: data.item,
                }
            }
        }
    }
})