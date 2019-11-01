
export default {
    data: () => ({
        attr_globalAttr: undefined,
        attr_nativeAttr: undefined
    }),
    methods: {
        // global handler
        attr_globalChange(val) {
            this.attr_globalAttr = val
        },
        attr_global_saveToStage(){

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
              const nattr = copy(this.attr_globalAttr);
              this.$store.dispatch("pages/addrs_finder_mutator", {
                uid: `${this.data.index}--${this.data.uid}`,
                fn: locator => {
                  this.$store.commit("pages/update_section", {
                    desc: `Updated Attributes ${locator}`,
                    locator,
                    scoped_variable: nattr,
                    exec_on_prop(prop, tag, scoped_variable, obj) {
                      obj.properties["attributes"] = scoped_variable;
                    }
                  });
                }
              });
              this.$store.commit("pages/set_temp_id", {
                uid: this.data.uid,
                index: this.data.index
              });
        },

        // native handler
        attr_nativeChange(val) {
          this.attr_nativeAttr = val
        },
        attr_native_saveToStage() {
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
          const natarr = copy(this.attr_nativeAttr);
          this.$store.dispatch("pages/addrs_finder_mutator", {
            uid: `${this.data.index}--${this.data.uid}`,
            fn: locator => {
              this.$store.commit("pages/update_section", {
                desc: `Updated Attributes ${locator}`,
                locator,
                scoped_variable: natarr,
                exec_on_prop(prop, tag, scoped_variable, obj) {
                  obj.properties["native_attributes"] = scoped_variable;
                }
              });
            }
          });
          this.$store.commit("pages/set_temp_id", {
            uid: this.data.uid,
            index: this.data.index,
            scoped_variable: 1
          });
        }

    }
}