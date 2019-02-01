
// usage creating new entity
entity.CreateEntity({
    name: 'a harry potter series',
    dataModel: 'book',
    value: {
        author: 'marven',
        bookNumber: 3
    }
})


// create new entity data model
entity.CreateEntityModel({
    title: 'book',
    model: {
        author: String,
        bookNumber: Number
    }
})

// removing an entity
entity.RemoveEntity('book', 'a harry potter series')

// removing a model
entity.RemoveModel('book')

// update an entity, model | entity | key | new value
entity.UpdateEntity('book', 'a harry potter series', 'author', 'janny')

// update a model
entity.UpdateModel('book', 'title', 'manga')

// ***
