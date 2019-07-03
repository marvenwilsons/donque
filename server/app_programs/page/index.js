console.log('am i a joke to you?')
const pageMethods = {}
pageMethods.createRoute = {
    createRoute({dep,data}){

    }
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
            }).cath(err => {
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
            funcIsDestructive: true
        }
    },
    deletePage(){

    }
}

module.exports = pageMethods