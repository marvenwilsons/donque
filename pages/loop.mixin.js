export default {
  data: () => ({
    page_data: undefined,
    temp_page: undefined,
    SelectedCollection: undefined,
    NormalizeTextExec: 0,
  }),
  methods: {
    NormalizeTextContext_Horizontal() {

    },
    IsJSX(text) {
      const regex = /\{{(.*)\}}/g;
      let m = regex.exec(text);
      return m != null;
    },
    GetTextContent(text, content) {
      //
      const getValue = key => {
        let val = content[key.split("{{").pop()]
        if (val) {
          return val
        }
      };

      //
      let finalStr = "";
      text.split("}}").map(c => {
        const str = `${c}}}`
          .replace(new RegExp("{{(.*)}}", "g"), getValue(c))
          .replace("}}", "");
        finalStr += str;
      });
      return finalStr;
    },
    NormalizeTextContext(ExecutionTimes, arr, ctx) {
      arr[ExecutionTimes].uid = `lpp-${ExecutionTimes}`
      const recur = (obj) => {
        if (obj.properties) {
          obj.properties.text_content = this.GetTextContent(obj.properties.text_content, ctx)
          obj.els.map((e, i) => recur(e))
        }
      }
      recur(arr[ExecutionTimes])
    },
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
                    if(e.properties) {
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

        getList(ty, (SelectedCollection, temp, CollectionName) => {
          if (!this.temp_page) {
            this.temp_page = temp
          }
        }, null)

        let tps = undefined
        if (this.temp_page) {
          this.temp_page.map((e, i) => {
            // mutation here
            // e.properties.text_content
            const TextContent = e.properties.text_content
            this.NormalizeTextContext(i, this.temp_page, this.SelectedCollection[i])
          })
        }


        getList(this.page_data, (SelectedCollection, temp, CollectionName, ty) => {
          if (ty != undefined) {
            this.page_data = ty
          }
        }, this.temp_page)
      }
    }
  },
}
