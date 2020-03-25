export default {
    data: () => ({
        tcm: undefined
    }),
    computed: {
        get_textContentModel() {
            return this.text_content_model
        }
    },
    methods: {
      // @saveToStage sample
        tcm_SaveToStage: function () {
            this.$store.dispatch("pages/addrs_finder_mutator", {
                uid: `${this.data.index}--${this.data.uid}`,
                fn: locator => {
                  this.$store.commit("pages/update_section", {
                    desc: `Added Text Content to ${locator}`,
                    locator,
                    scoped_variable: this.get_textContentModel,
                    exec_on_prop(prop, tag, scoped_variable, obj) {
                      obj.properties["text_content"] = scoped_variable;
                    }
                  });
                }
              });
              this.$store.commit("pages/set_temp_id", {
                uid: this.data.uid,
                index: this.data.index
              });
        }
    },
    mounted() {
        // default
        this.text_content_model = this.data.properties.text_content;
    }
}