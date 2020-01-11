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
        data_collection: [],
        notes: '',
        properties: {},
        events: {},
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
        commits: [],
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

        const { db, moment, user } = dep
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
            db.collection('dq_app').findOneAndUpdate(
                {},
                {
                    $set: {
                        [`${path.rc}`] : {
                            layout: 'default',
                            sections: [
                                gots({
                                    role: 'dq-default',
                                    tag: 'html_section',
                                    createdOn: moment().format("MMM Do YY")
                                })
                            ],
                            data_collection: [],
                            "stat": {
                                lastModified: moment().format("MMM Do YY"),
                                createdOn: moment().format("MMM Do YY"),
                                createdBy: user.adminName,
                                type: "",
                            },
                            "security": {
                                isLokced: false,
                                password: "",
                                allowedAdminsToWrite: [],
                                access_type: '',
                                is_under_maintenance: ''
                            },
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
                const data_collections = content[path].data_collection
                let cols = []
                
                if(data_collections.length) {
                    const prs = data_collections.map(collectionName => {
                        return db.collection('dq_collections').findOne({
                            [collectionName] : {$exists: true}
                        }).then(r => {
                            delete r._id
                            return r
                        })
                    })

                    Promise.all(prs).then((res) => {
                        return resolve({
                            status: true,
                            data: {
                                msg: null,
                                actions: [{}],
                                public: {
                                    layout: content[path].layout,
                                    sections: content[path].sections,
                                    collections: res
                                }
                            }
                        })
                    })

                    

                } else {
                    return resolve({
                        status: true,
                        data: {
                            msg: null,
                            actions: [{}],
                            public: {
                                layout: content[path].layout,
                                sections: content[path].sections,
                                collections: null
                            }
                        }
                    })
                }


                
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
pageMethods.getMyCustomStyleSheet = {
    get prop() {
        return {
          funcIsDestructive: false
        };
    },
    getMyCustomStyleSheet() {
        console.log("** Fetching custom style sheet")
        
        const path = require("path");
        const fs = require("fs");

        const my_custom_css = path.join(__dirname, '../../../assets/installed-css/my-custom.css')
        const file_content = fs.readFileSync(my_custom_css).toString();

        return new Promise((resolve,reject) => {
            resolve({
              status: true,
              data: {
                actions: [],
                msg: null,
                payload: file_content
              }
            });
        })
    }
}
pageMethods.updateCustomStyleSheet = {
    get prop() {
        return {
        funcIsDestructive: false
        };
    },
    updateCustomStyleSheet({ dep, data }) {
        console.log("** Updating custom stlye sheet");
        
        const path = require("path")
        const fs = require("fs");
        const my_custom_css = path.join(
        __dirname,
        "../../../assets/installed-css/my-custom.css"
        );

        let hasErr = undefined
        fs.writeFile(my_custom_css, data, err => {
            if (err) {
                hasErr = err
            }
        })

        return new Promise(async (resolve, reject) => {
            if(hasErr) {
                reject({
                    status: false,
                    data: {
                        actions: [{
                            title: 'prompt_err',
                            msg: hasErr
                        }]
                    }
                })
            } else {
                resolve({
                  status: true,
                  data: {
                    actions: [],
                    msg: null,
                  }
                });
            }
        });

    }
};
pageMethods.getCss = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    getCss({ dep, data }){
        console.log('fetchin all css')

        const path = require('path')
        const fs = require('fs')

        const ins_css_loc = path.join(__dirname, '../../../assets/installed-css')

        // 
        let valid_css_files = []
        fs.readdirSync(ins_css_loc).map((fileName) => {
            if (fileName.split('.')[fileName.split('.').length - 1] == 'css'){
                valid_css_files.push(fileName)
            }
        })

        //
        let css = {}
        let con = []

        valid_css_files.map((fileName) => {
            const file_loc = `${ins_css_loc}/${fileName}`            
            const file_content = fs.readFileSync(file_loc).toString()

            css[fileName] = []
            con[fileName] = []

            let m;
            const regex = /\.[a-zA-Z_][\w-_]*[^\.\s\{#:\,;]/gm;
            while ((m = regex.exec(file_content)) !== null) {
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }

                m.forEach((match, groupIndex) => {
                    css[fileName].push(match.split('.').pop())
                });
            }

            const regex2 = /\{([^}]+)\}/g;
            while ((n = regex2.exec(file_content)) !== null) {
                if (n.index === regex2.lastIndex) {
                    regex2.lastIndex++;
                }

                n.forEach((match, groupIndex) => {
                    if(groupIndex == 0 ){
                        con[fileName].push(match)                        
                    }
                });
            }

        })

        let final = {}

        valid_css_files.map(f => {            
            final[f] = {}
            css[f].map((v,i) => {
                final[f][css[f][i]] = con[f][i]
            })
        })

        return new Promise((resolve,reject) => {
            resolve({
                status: true,
                data: {
                    actions: [],
                    msg: null,
                    payload: final
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

        const finalizeRotes = (r) => {
            return Object.keys(r)
        }

        return new Promise(async (resolve, reject) => {
            const dq_appCursor = await db.collection('dq_app').find()

            await dq_appCursor.forEach((doc,err) => {
                return routes = doc.routeContents
            })

            resolve({
                status: true,
                data: {
                    msg: null,
                    actions: [{
                        title: null,
                        contents: finalizeRotes(routes)
                    }]
                }
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
pageMethods.updatePage2 = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    updatePage2({dep,data}){
        let { mode, path, customData } = data
        const { db, moment, user } = dep

        og_p = path
        path === '/' && (path = '/home')
        path = `routeContents.${path}` 

        
        return new Promise((resolve,reject) => {

            switch(mode){
                case 'addSection' : 

                    const { role } = customData

                    if (role) {
                        // validate len
                        if (role.length > 25) {
                            return reject({
                                status: false,
                                data: {
                                    msg: "Error: section role must not exceed 25 characters",
                                    actions: [{
                                        title: 'prompt_err'
                                    }]
                                }
                            })
                        }

                        // validate val if there is no character and only spaces
                        if (role.trim() == "") {
                            return reject({
                                status: false,
                                data: {
                                    msg: "Error: section role must have valid characters",
                                    actions: [{
                                        title: 'prompt_err'
                                    }]
                                }
                            })
                        } 
                    }
                    else if (!role) {
                        // validate val 2
                        return reject({
                            status: false,
                            data: {
                                msg: "Error: section role is required",
                                actions: [{
                                    title: 'prompt_err'
                                }]
                            }
                        })
                    }

                    db.collection('dq_app').findOneAndUpdate(
                        { [path]: { $exists: true } },
                        {
                            $push:{
                                [`${path}.sections`] : gots({
                                    tag: 'html_section',
                                    role: customData.role,
                                    createdOn: moment().format("MMM Do YY"),
                                    lastModified: moment().format("MMM Do YY"),
                                    createdBy: user.adminName
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
                case 'addChild':
                    console.log('adding child')
                    console.log(path)
                    console.log(customData)

                    
                break
            }
        })
    }
}
pageMethods.updatePage = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    updatePage({dep,data}){

        let { content, path } = data
        const { db, moment } = dep

        path === '/' && (path = '/home')
        path = `routeContents.${path}` 

        content.stat.lastModified = moment().format("MMM Do YY")

        return new Promise((resolve,reject) => {

            db.collection('dq_app').findOneAndUpdate(
                { [path]: { $exists: true } },
                {
                    $set: {
                        [`${path}`]: content
                    }
                }
            ).then(res => {
                resolve({
                    status: true,
                    data: {
                        actions: [],
                        msg: null
                    }
                })
            }).catch(err => {
                reject({
                    status: false,
                    data: {
                        actions: [{
                            title: 'prompt_err',
                            msg: err
                        }]
                    }
                })
            })

            
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

pageMethods.updateDataCollection = {
    get prop() {
        return {
            funcIsDestructive: false
        }
    },
    updateDataCollection({dep,data}) {
        console.log('updating data colletion')
        
        const {pageName, collectionName, action} = data
        const {db} = dep
        
        db.collection('dq_app').findOneAndUpdate(
            {},
            {
                [`$${action}`]: {
                    [`routeContents.${pageName}.data_collection` ] : collectionName
                }
            }
        )

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

module.exports = pageMethods