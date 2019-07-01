const pageMethods = {}
pageMethods.createRoute = {
    createRoute({dep,data}){

    }
}
pageMethods.getRoutes = {
    /**
     * reutrns all of the routes
     * returns an object
     */
    getRoutes({dep,data}){
        console.log('** reading page')
        return new Promise((resolve,reject) => {
            resolve({
                status:true,
                data:{
                    content:'test',
                    promptmessage:null
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
pageMethods.updatePage = {
}
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

module.exports = pageMethods