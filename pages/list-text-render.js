/**
 * Responsible for handling dynamic text_contents to 
 * display the correct data.
 */
export default {
  data: () => ({
    page_data: undefined,
    temp_page: undefined,
    SelectedCollection: undefined,
    NormalizeTextExec: 0,
  }),
  methods: {
    ini2() {

      if (this.$store.state.app.data.public.collections) {
        let temp = undefined
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
        let ty = copy(this.page_data)
        const getList = (o, hy, nn) => {
          if (temp == undefined) {
            temp = o

            if (temp) {
              getList(temp, hy, nn)
            }
          } else {
            if (Array.isArray(temp)) {
              temp.map((e, i) => {
                if (e.properties && e.properties.attributes == undefined) {
                  temp = e.els
                  getList(temp, hy, nn)
                } else {
                  if (e.properties) {

                    let SelectedCollection = undefined

                    const CollectionName = e.properties.attributes['collection name']


                    // accessing collection that this page required
                    this.$store.state.app.data.public.collections.map(collection => {
                      SelectedCollection = collection[CollectionName]
                    })
                    this.SelectedCollection = SelectedCollection

                    // list is found and render the list                                               
                    if (nn) {
                      temp = nn
                      hy(SelectedCollection, temp, CollectionName, ty)
                    }


                    hy(SelectedCollection, temp, CollectionName)
                  }


                }
                // getList(e)
              })
            } else if (Array.isArray(temp) == false && typeof temp == 'object') {
              if (temp.properties && temp.properties.attributes == undefined) {
                temp = temp.els
                getList(temp, hy, nn)
              }
            }
          }
        }

        ty.map(e => {
          if (e.els.length) {
            getList(e.els, (SelectedCollection, temp, CollectionName) => {
              if (!this.temp_page) {
                this.temp_page = temp // the list --> the root or parent list
              }
            }, null)
          }
        })


        // get JSX expression and replace with associated value
        const keys = Object.keys(this.SelectedCollection[0])
        let c = -1
        if (this.temp_page) {
          this.temp_page.map((e, i) => {
            if (c > keys.length - 2) {
              c = 0
            } else {
              c++
            }

            keys.map((e,ei) => {
              const regx = `{{${e}}}`
              const t = JSON.stringify(this.temp_page[i]).replace(new RegExp(regx,'g'), `${this.SelectedCollection[c][e]}`)
              const tt = JSON.parse(t)
              this.temp_page[i] = tt
            })
          })
        }


        this.page_data.map(e => {
          if (e.els.length) {
            getList(e.els, (SelectedCollection, temp, CollectionName, ty) => {
              if (ty != undefined) {
                this.page_data = ty
              }
            }, this.temp_page)
          }

        })

      }

      // console.log('I dont get it')
      // console.log(this.page_data)
    }
  },
}
