const pageMethods = {}

pageMethods.CreatePage = {
    get permissions() {
        return 'create'
    },
    get funcIsDestructive() {
        return false
    },
    get allowedTitle() {
        return ['owner','admin']
    },
    CreatePage({dep,data}){

    }
}

pageMethods.ReadPage = {
    get permissions() {
        return 'read'
    },
    get allowedTitle() {
        return ['owner','admins']
    },
    ReadPage({dep,data}){
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

pageMethods.ListPage = {
    get permissions() {
        return 'read'
    },
    get allowedTitle() {
        return ['owner', 'admins']
    },
    ListPage({ dep, data }) {
        console.log('** listing page')
        return new Promise((resolve, reject) => {
            resolve({
                status: true,
                data: {
                    content: ['sample','home','pages','testing'],
                    promptmessage: null
                }
            })
        })
    }
}


pageMethods.UpdatePage = {
    get permissions() {
        return 'update'
    },
    get funcIsDestructive() {
        return true
    },
    get allowedTitle() {
        return ['owner','admin']
    },
    get progressCounter(){
        // if the progress value does equals more than 1
        // if it is negative return
        // *you are **nums** commits behind, then display the commits, who made, and time.
        // if value is higher more, display invalid progress counter then refresh page
    },
    UpdatePage({dep,data}){

    }
}

pageMethods.deletePage = {
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