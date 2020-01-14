export default {
    methods: {
        ini1() {
            if(this.$store.state.app.data.public.collections) {
                const copy = (o, p) => {
                    if (o === null) return null;
                    var output, v, key;
                    output = Array.isArray(o) ? [] : {};
                    for (key in o) {
                      v = o[key];
                      output[key] = typeof v === "object" ? copy(v) : v;
                    }
                    return output;
                  };
              
                  // copy because vue is not letting me mutate the data from the store
                  if(this.$store.state.current_page) {
                      this.page_data = copy(this.$store.state.current_page)
                  }
              
                  // recursion
                  let temp = undefined
                  const getList = (o,hy) => {
                      if(temp == undefined) {
                          temp = o
              
                          if(temp) {
                              getList(temp,hy)
                          }
                      } else {
                          if(Array.isArray(temp)) {
                              temp.map(e => {
                                  if(e.properties && e.properties.attributes == undefined) {
                                      temp = e.els
                                      getList(temp,hy)
                                  } else {
                                      if( e.properties) {
                                        const CollectionName = e.properties.attributes['collection name']
                                        let SelectedCollection = undefined
                                             
              
                                      // accessing collection that this page required
                                      if(this.$store.state.app.data.public.collections) {
                                        this.$store.state.app.data.public.collections.map(collection => {
                                            SelectedCollection = collection[CollectionName]
                                        })
                                      } 
                                      
              
                                      // list is found and render the list
                                      hy(SelectedCollection,temp,CollectionName)
                                      }                        
                    
                                  }
                                  // getList(e)
                              })
                          } else if(Array.isArray(temp) == false && typeof temp == 'object') {
                              if(temp.properties && temp.properties.attributes == undefined) {
                                  temp = temp.els
                                  getList(temp,hy)
                              }
                          }
                      }
                  }
              
                  let exec_count = - 1
              
                  getList(this.page_data,(SelectedCollection,temp,CollectionName) => {
                      for(var i = 0; i < SelectedCollection.length - 1; i++) {
                          temp.push(temp[0])
                      }
                  })
            }
        }
    }
}