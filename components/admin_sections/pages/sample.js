// sample route
const route = {
    home: {},
    products: {
        _id: {}
    },
    services: {
        service1: {},
        service2: {},
        service3: {
            scope: {}
        }
    },
    team: {
        devs: {},
        directors: {}
    }
}

const routeContents = {
    "home": {
        layout: {}, // the choosen layout for this page
        sections: {}, // sections of the pages
        data_collection: {}, // points to the database collection, ! only if type is dynamic else it is undefined

        "stat": {
            name: "home",
            lastModified: "", // date,
            createdOn: "", // data
            createdBy: "", // admin name,
            type: "", // static or dynamic
        },
        "security": {
            isLokced: false,
            password: "",
            allowedAdminsToWrite: [], // array of admin name
            access_type: '', // public or private
            is_under_maintenance: '' // boolean
        },
    },
    
    "services": {},
    "services.service1" : {},
    "services.service3.scope": {},
    "services._id": {}
}