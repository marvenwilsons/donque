// this is backup

export default {
    data: () => ({
      new_Els: undefined,
      el_data: undefined,
      isInit: false,
    }),
    computed: {
      latest_el_data() {
        return this.el_data;
      }
    },
    created() {
      this.el_data = [];
    },
    mounted() {
  
    },
    methods: {
      is_dynamic(text) {
        const regex = /\{{(.*)\}}/g;
        let m = regex.exec(text);
        return m == null;
      },
      get_textContent(text, ObjectIndex, prop) {
        // regex setup
        const regex = /\{{(.*)\}}/g;
        //
        const getValue = key => {
          // console.log(this.indexed_collection_data)
          // console.log(ObjectIndex,this.real_index)
          if (this.el_data[ObjectIndex]) {
            return this.el_data[ObjectIndex][key.split("{{").pop()];
          } else {
            if (this.collection_data[this.real_index]) {
              // console.log('udef var', key.split("{{").pop() )
              const k = key.split("{{").pop()
              if (this.collection_data[this.real_index][k]) {
                return this.collection_data[this.real_index][k]
              }
            } else {
              // console.log('2nd level nested child')
              // console.log(this.new_Els)
            }
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
  
        //
        return finalStr;
      },
      get_prop(prop, el) {
        if (prop.attributes) {
          if (prop.attributes.isAList) {
            if (prop.attributes.isAList == "Yes") {
              let col = undefined
              this.$store.state.app.data.public.collections.map(e => {
                if (e[prop.attributes['collection name']] != undefined) {
                  col = e[prop.attributes['collection name']]
                }
              })
  
              this.el_data = col
              // if (this.$store.state.pages.selected_collection == undefined) {
              //   this.$store.commit('pages/set_selected_collection', col)
              // }
  
  
              // copy func
              let el_ar = []
  
              const copy = (o, m) => {
                
                if (o === null) return null;
                let t = 0
  
                var output, v, key;
                output = Array.isArray(o) ? [] : {};
                for (key in o) {
                  v = o[key];
                  output[key] = typeof v === "object" ? copy(v) : v;
                  if (typeof v != "object") {
                    t++
                  }
                }
                output.data_collection = col
                output.loop_index = Math.round(t/2) - 1
  
                if (output.properties) {
                  if(output.properties.text_content) {
                    el_ar.push(output)
                  }                
                }
                return output;
              };
  
  
              // copy because is not letting me mutate it
              let original = copy(el);
              let els_copy = copy(this.els);
  
  
  
  
              // loop :)
              for (var i = 0; i < col.length - 1; i++) {
                els_copy.push(original);
              }
  
  
              // to avoid infinite  loop
              const rr = els_copy.map((e, i) => {
  
                if (e.properties.attributes) {
                  e.properties.attributes.isAList = "No";
                }
              });
  
              // send to heaven
              this.new_Els = els_copy;
            }
          }
        }
  
      }
    }
  }
  