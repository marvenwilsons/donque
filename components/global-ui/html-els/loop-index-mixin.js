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
    // console.log(this.$refs.test)
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
        if (this.el_data[ObjectIndex]) {
          return this.el_data[ObjectIndex][key.split("{{").pop()];
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
            //
            let col = undefined
            this.$store.state.app.data.public.collections.map(e => {
              if (e[prop.attributes['collection name']] != undefined) {
                col = e[prop.attributes['collection name']]
              }
            })

            //
            this.el_data = col

            // loop :)
            for (var i = 0; i < col.length - 1; i++) {
              this.els.push(el)
            }

            const x = this.els.map((el,el_i) => {
              // accessing vertital children
              console.log('exec1')
             
              if(this.els[el_i].els[el_i].els[el_i]) {
                this.els[el_i].els[el_i].els[el_i].properties.text_content= el_i
              }

              
              return this.els[el_i]
            })

            console.log(x)

            // console.log(x)

            // to avoid infinite  loop
            this.els.map((e, i) => {
              console.log('exec2')

              e.isFirstLevelDirectChild = true

              if (e.properties.attributes) {
                e.properties.attributes.isAList = "No";
              }
            });

            // send to heaven
            this.new_Els = this.els;
          }
        }
      }

    }
  }
}
