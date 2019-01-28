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
        return ['owner','admin']
    },
    ReadPage({dep,data}){

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