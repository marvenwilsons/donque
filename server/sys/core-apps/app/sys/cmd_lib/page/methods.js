const page = {}

page.CreatePage = {
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

page.ReadPage = {
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

page.ListPage = {
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


page.UpdatePage = {
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

page.DeletePage = {
    get permissions() {
        return 'delete'
    },
    get funcIsDestructive() {
        return true
    },
    get allowedTitle() {
        return ['owner','admin']
    },
    DeletePage({dep,data}){

    }
}

module.exports = page