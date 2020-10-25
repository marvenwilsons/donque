const path = require('path')
const Templates = require(path.join(__dirname,'../../../server/templates.js'))


module.exports = function(postgress, fetch) {
     // perform get request here
        // first pane items should -> Pages, Page layouts, Page Views, Page 3rd party plugins, Recently Deleted,
        let pages = []
        pages.push(new Templates.Page({
            pageName: '/',
            admin_id:'test',
            lastModified: 'test 1',
            pageContent: 'none',
            version_id:'000DSFKJHB3J4G5',
            isUndermaintenance: true,
            subPages:[],
            pageId: '22F5E4T2WER'
        }))
        pages.push(new Templates.Page({
            pageName: '/about',
            admin_id:'test',
            lastModified: 'test about',
            pageContent: 'none',
            version_id:'NFGRIUHIERGHG4',
            isUndermaintenance: true,
            subPages:[],
            pageId: '034F4R1H4R1D'
        }))
        pages.push(new Templates.Page({
            pageName: '/teams',
            admin_id:'test',
            lastModified: 'test teams',
            pageContent: 'none',
            version_id:'JGHEKSU45',
            isUndermaintenance: true,
            subPages:[],
            pageId: '3450DS254GW52S'
        }))
        pages.push(new Templates.Page({
            pageName: '/products',
            admin_id:'test',
            lastModified: 'test products',
            pageContent: 'none',
            version_id:'HDGTKBH483',
            isUndermaintenance: true,
            subPages:[
                {
                    pageName: '/mensware',
                    admin_id:'test',
                    lastModified: 'test products',
                    pageContent: 'none',
                    version_id:'HDGTKBH483',
                    isUndermaintenance: true,
                    subPages:[
                        {
                            pageName: '/pants',
                            admin_id:'test',
                            lastModified: 'test products',
                            pageContent: 'none',
                            version_id:'HDGTKBH483',
                            isUndermaintenance: true,
                            subPages:[
                                {
                                    pageName: '/denims',
                                    admin_id:'test',
                                    lastModified: 'test products',
                                    pageContent: 'none',
                                    version_id:'HDGTKBH483',
                                    isUndermaintenance: true,
                                    subPages:[
                                        {
                                            pageName: '/large',
                                            admin_id:'test',
                                            lastModified: 'test products',
                                            pageContent: 'none',
                                            version_id:'HDGTKBH483',
                                            isUndermaintenance: true,
                                            subPages:[
                                                {
                                                    pageName: '/x-large',
                                                    admin_id:'test',
                                                    lastModified: 'test products',
                                                    pageContent: 'none',
                                                    version_id:'HDGTKBH483',
                                                    isUndermaintenance: true,
                                                    subPages:[],
                                                    pageId: '0025WD4R4W'
                                                }
                                            ],
                                            pageId: '0025WD4R4W'
                                        },
                                        {
                                            pageName: '/medium',
                                            admin_id:'test',
                                            lastModified: 'test products',
                                            pageContent: 'none',
                                            version_id:'HDGTKBH483',
                                            isUndermaintenance: true,
                                            subPages:[],
                                            pageId: '0025WD4R4W'
                                        }
                                    ],
                                    pageId: '0025WD4R4W'
                                },
                                {
                                    pageName: '/skinny',
                                    admin_id:'test',
                                    lastModified: 'test products',
                                    pageContent: 'none',
                                    version_id:'HDGTKBH483',
                                    isUndermaintenance: true,
                                    subPages:[],
                                    pageId: '0025WD4R4W'
                                }
                            ],
                            pageId: '0025WD4R4W'
                        },
                        {
                            pageName: '/shirts',
                            admin_id:'test',
                            lastModified: 'test products',
                            pageContent: 'none',
                            version_id:'HDGTKBH483',
                            isUndermaintenance: true,
                            subPages:[],
                            pageId: '0025WD4R4W'
                        }
                    ],
                    pageId: '0025WD4R4W'
                },
                {
                    pageName: '/kidsware',
                    admin_id:'test',
                    lastModified: 'test products',
                    pageContent: 'none',
                    version_id:'HDGTKBH483',
                    isUndermaintenance: true,
                    subPages:[],
                    pageId: '0025WD4R4W'
                },
                {
                    pageName: '/ladysware',
                    admin_id:'test',
                    lastModified: 'test products',
                    pageContent: 'none',
                    version_id:'HDGTKBH483',
                    isUndermaintenance: true,
                    subPages:[],
                    pageId: '0025WD4R4W'
                }
            ],
            pageId: '0025WD4R4W'
        }))
        pages.push(new Templates.Page({
            pageName: '/blog',
            admin_id:'test',
            lastModified: 'test blog',
            pageContent: 'none',
            version_id:'ASDFJHBVJEGT34WEE52',
            isUndermaintenance: true,
            subPages:[],
            pageId: '0382KJVHEW'
        }))
        pages.push(new Templates.Page({
            pageName: '/achivements',
            admin_id:'test',
            lastModified: 'test achivements',
            pageContent: 'none',
            version_id:'POJLK4H562',
            isUndermaintenance: true,
            subPages:[],
            pageId: '000HGJMWKE'
        }))
        pages.push(new Templates.Page({
            pageName: '/my-service-canada-account',
            admin_id:'test',
            lastModified: 'test msca',
            pageContent: 'none',
            version_id:'KJSBD345',
            isUndermaintenance: true,
            subPages:[],
            pageId: '000IISJEWH'
        }))
        
        return new Promise((resolve,reject) => {
            resolve(pages)
        })
}