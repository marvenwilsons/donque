const pageMethods = {}

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
                            layout: {},
                            sections: {},
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
                                access_type: '',
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
 * 
 */
pageMethods.updatePage = {
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