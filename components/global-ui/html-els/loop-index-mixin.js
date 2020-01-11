export default {
    data: () => ({
        new_Els: undefined,
        el_data: undefined,
        isInit: false
      }),
      computed: {
        latest_el_data() {
          return this.el_data;
        }
      },
      created() {
        // console.log(this.els)
        this.el_data = [];
      },
      methods: {
        is_dynamic(text) {
          const regex = /\{{(.*)\}}/g;
          let m = regex.exec(text);    
          return m == null;
        },
        get_textContent(text, ObjectIndex,prop) {
          // regex setup
          const regex = /\{{(.*)\}}/g;    
          //
          const getValue = key => {
            return this.el_data[ObjectIndex][key.split("{{").pop()];
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
          if(prop.attributes) {
            if(prop.attributes.isAList) {
              if (prop.attributes.isAList == "Yes") {
                let col = undefined
                this.$store.state.app.data.public.collections.map( e => {
                  if( e[prop.attributes['collection name']] != undefined) {
                    col = e[prop.attributes['collection name']]
                  }
                })

                this.el_data = col
                // console.log(col)

                  // copy func
                  const copy = o => {
                    if (o === null) return null;
          
                    var output, v, key;
                    output = Array.isArray(o) ? [] : {};
                    for (key in o) {
                      v = o[key];
                      output[key] = typeof v === "object" ? copy(v) : v;
                    }
          
                    return output;
                  };
          
                  // copy because is not letting me mutate it
                  const original = copy(el);
                  const els_copy = copy(this.els);

          
                  // loop :)
                  for (var i = 0; i < col.length - 1; i++) {
                    els_copy.push(original);
                  }
          
                  // to avoid infinite  loop
                  els_copy.map(e => {
                    if(e.properties.attributes) {
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