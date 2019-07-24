const pageMethods = {}

const gots = ({ tag, name, role, inlineStyle, innerText, classList, els, path, createdOn, createdBy, lastModified }) => {
    return {
        tag: tag ? tag : 'html_div',
        name,
        role,
        inlineStyle: inlineStyle ? inlineStyle : {},
        innerText,
        classList: classList ? classList : [],
        els: els ? els : [],
        data_collection: {},
        "stat": {
            lastModified,
            createdOn,
            createdBy,
            type: "",
            path
        },
        "security": {
            isLokced: false,
            password: "",
            allowedAdminsToWrite: [],
            access_type: 'public',
            is_under_maintenance: false
        },
        uid: ((length) => {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        })(15)
    }
}

/**
 * creates route and route contents in database
 */
pageMethods.createPage = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    async createPage({dep,data}){
        console.log('creating page!')

        const { db, } = dep
        const { name, parent } = data
        let err = undefined

        return new Promise(async (resolve,reject) => {
            // validation 1
            if (name) {
                if (name.indexOf(" ") != -1) {
                    err = "Error: page name cannot have white spaces";
                } else {
                    err = false;
                }
            } else {
                err = "Error: page name is a required";
            }

            // validation 2 check parent existence
            console.log('the parent')
            console.log(parent ? `routes.${parent}` : 'routes')
            const parentExists = db.collection('dq_app').findOne({
                [parent ? `routes.${parent}` : 'routes']: { $exists: true }
            })
                .then(data => {
                    if (data === null) {
                        return false
                    } else {
                        return true
                    }
                })
                .catch(err => {
                    reject({
                        status: false,
                        data: {
                            msg: `Error while validating parent page existence \t\t ${err}`,
                            actions: [
                                {
                                    title: 'prompt_err'
                                }
                            ]
                        }
                    })
                })

            // validation 3 check if page already exists
            const pageExists = db.collection('dq_app').findOne({
                [`routes.${parent}.${name}`]: { $exists: true }
            })
                .then(data => {
                    if (data === null) {
                        return false
                    } else {
                        return true
                    }
                })
                .catch(err => {
                    reject({
                        status: false,
                        data: {
                            msg: 'Error while validating page existence',
                            actions: [
                                {
                                    title: 'prompt_err'
                                }
                            ]
                        }
                    })
                })
            

            // returning errors
            if(err) {
                return reject({
                    status: false,
                    data: {
                        msg: err,
                        actions: [
                            {
                                title: 'prompt_err'
                            }
                        ]
                    }
                })
            } else if(await parentExists == false){
                return reject({
                    status: false,
                    data: {
                        msg: `cannot find "${parent}" route to add or insert "${name}" page`,
                        actions: [
                            {
                                title: 'prompt_err'
                            }
                        ]
                    }
                })
            } else if(await pageExists){
                return reject({
                    status: false,
                    data: {
                        msg: `${name} page already exists`,
                        actions: [
                            {
                                title: 'prompt_err'
                            }
                        ]
                    }
                })
            }

            // construting path
            let path = {}
            let rcpath = undefined

            if(parent) {
                if (parent.indexOf('.') != -1) {
                    rcpath = parent.replace('.', '/')
                } else {
                    rcpath = parent
                }
            }

            if (!parent) {
                path = {
                    r: `routes.${name}`,
                    rc: `routeContents.${name}` 
                }
            } else {
                path = {
                    r: `routes.${parent}.${name}`,
                    rc: `routeContents.${rcpath.split('.').join('/')}/${name}`
                }
            }

            // writing to routes document
            db.collection('dq_app').findOneAndUpdate(
                    {},
                    {
                        $set: {
                            [path.r]: {}
                        }
                    }).catch(err => {
                        return reject({
                            status: false,
                            data: {
                                msg: `Error while writing to document routes \t\t ${err}`,
                                actions: [
                                    {
                                        title: 'prompt_err'
                                    }
                                ]
                            }
                        })
                    })

            // writing to routeContents
            console.log('path-rc')
            console.log(path.rc)
            db.collection('dq_app').findOneAndUpdate(
                {},
                {
                    $set: {
                        [`${path.rc}`] : {
                            layout: 'default',
                            sections: [
                                {
                                    els:[]
                                }
                            ],
                            data_collection: {},
                            "stat": {
                                lastModified: "",
                                createdOn: "",
                                createdBy: "",
                                type: "",
                            },
                            "security": {
                                isLokced: false,
                                password: "",
                                allowedAdminsToWrite: [],
                                access_type: 'public',
                                is_under_maintenance: ''
                            }
                        }
                    }
                }
            )
            .catch(err => {
                return reject({
                    status: false,
                    data: {
                        msg: `Error while writing to document routeContents \t\t ${err}`,
                        actions: [
                            {
                                title: 'prompt_err'
                            }
                        ]
                    }
                })
            })
            

            resolve({
                status: true,
                data: {
                    msg: `${data.name} page successfully created`,
                    actions: [
                        {
                            title: 'prompt_msg'
                        }
                    ]
                }
            }) 
        })
    }
}

pageMethods.getPageContents = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    getPageContents({dep,data}) {
        console.log('** [getPageContents]')
        
        const { db } = dep
        
        // path mutations
        if(typeof data != 'object'){
            data = JSON.parse(data)
        }

        let { path } = data
        path === '/' && (path = '/home')
        // construct access string
        path = path.split('/')
        path.shift()
        path = path.join('/')
        path = `routeContents.${path}`


        return new Promise( async (resolve,reject) => {
            const content = await db.collection('dq_app').findOne({
                [path] : {$exists: true}
            }).then(data => {
                if (data !== null){
                    return data.routeContents
                }else {
                    return false
                }
            })

            // path mutation
            path = path.replace('routeContents.','')
            
            //
            if (content[path]){
                return resolve({
                    status: true,
                    data: {
                        msg: null,
                        actions: [{}],
                        public: {
                            layout: content[path].layout,
                            sections: content[path].sections
                        }
                    }
                })
            }else {
                reject({
                    status: false,
                    data: {
                        statusCode: 404,
                        msg: `Page ${path} not found`,
                        actions: [{}]
                    }
                })
            }

            
        })
    }
}

pageMethods.getPage = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    getPage({dep,data}){
        console.log('getting page!')
        
        // dep
        const { db } = dep
        let { path } = data

        // path
        const og_p = path
        path === '/' && (path = '/home')
        path = `routeContents.${path}`        

        return new Promise((resolve,reject) => {
            // fetching
            db.collection('dq_app').findOne({
                [path]: { $exists: true }
            }).then(data => {
                if (data) {
                   resolve({
                       status: true,
                       data: {
                            msg: null,
                            actions: [],
                            data: {
                                path: og_p,
                                ...data['routeContents'][og_p]
                            }
                       }
                   })
                } else {
                    reject({
                        status: false,
                        data: {
                            actions:[{
                                title: 'prompt_err'
                            }],
                            msg: `Error! Cannot find ${path}`
                        }
                    })
                }
            })
        })
    }
}

/**
 * create a route only no contents
 */
pageMethods.createRoute = {

}

pageMethods.getAllRoutes = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    /**
     * reutrns all of the routes
     * returns an object
     */
    getAllRoutes({dep,data}){
        console.log('** reading page')

        const { db } = dep

        let routes = {}

        return new Promise(async (resolve, reject) => {
            const dq_appCursor = await db.collection('dq_app').find()

            await dq_appCursor.forEach((doc,err) => {
                return routes = doc.routes
            }).then(() => {
                resolve({
                    status: true,
                    data: {
                        msg: null,
                        actions: [{
                            title: null,
                            contents: routes 
                        }]
                    }
                })
            }).catch(err => {
                resolve({
                    status: false,
                    data: {
                        msg: err,
                        actions: [{
                            title: 'prompt_err'
                        }]
                    }
                })
            })
            
            
        })
    }
}
pageMethods.updateRoute = {

    get progressCounter(){
        // if the progress value does equals more than 1
        // if it is negative return
        // *you are **nums** commits behind, then display the commits, who made, and time.
        // if value is higher more, display invalid progress counter then refresh page
    },
    updateRoute({dep,data}){
        
    }
}

/**
 * update
 */
pageMethods.updatePage = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    updatePage({dep,data}){
        let { mode, path, customData } = data
        const { db, moment } = dep

        path === '/' && (path = '/home')
        path = `routeContents.${path}` 

        
        return new Promise((resolve,reject) => {

            switch(mode){
                case 'addSection' : 
                    db.collection('dq_app').findOneAndUpdate(
                        { [path]: { $exists: true } },
                        {
                            $push:{
                                [`${path}.sections`] : gots({
                                    tag: 'html_section',
                                    role: customData.role,
                                    createdOn: moment().format("MMM Do YY"),
                                })
                            }
                        }
                    ).then(data => {
                        if(data) {
                            resolve({
                                status: true,
                                data: {
                                    actions: [],
                                    msg: null
                                }
                            })
                        }
                    }).catch(err => {
                        reject({
                            status: false,
                            data: {
                               actions: [{
                                   title: 'prompt_err'
                               }],
                               msg: err
                            }
                        })
                    })
                break
            }
        })
    }
}

/**
 * only deletes the route from the routes
 * object, but the contents that is linked
 * into this route is still in the database
 */
pageMethods.deleteRoute = {
    get prop() {
        return {
            allowedtitle: ['owner'],
            funcIsDestructive: false
        }
    },
    deletePage({dep,data}){
        console.log('** [PageMethods] Deleting page')

        

        return new Promise((resolve,reject) => {
            resolve({
                status: true,
                data: {
                    msg: null,
                    actions: []
                }
            })
        })
    }
}

/**
 * only deletes the route contents from the database
 * but doesnt delete the route
 */
pageMethods.deleteRouteContents = {

}

/**
 * delets the route and the route contents all at once
 */
pageMethods.deletePage = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    deletePage(){
        return new Promise((resolve, reject) => {
            resolve({
                status: true,
                data: {
                    msg: null,
                    actions: []
                }
            })
        })
    }
}

module.exports = pageMethods