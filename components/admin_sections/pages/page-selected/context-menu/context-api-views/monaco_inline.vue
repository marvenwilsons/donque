<template>
  <div class="fullwidth">
    <MonacoEditor
      v-if="ready"
      v-show="show"
      class="mo-editor"
      v-model="code"
      language="css"
      height="100px"
      editorMounted="e_mounted"
      :options="options"
      @change="onChange"
    />
  </div>
</template>

<script>
//https://www.npmjs.com/package/monaco-editor-vue
import MonacoEditor from "vue-monaco";

export default {
  props: ["trigger", "data"],

  components: {
    MonacoEditor
  },

  data() {
    return {
      code: `customInlineStyle{\n\t\n}`,
      width: "100%",
      ready: false,
      show: false,
      options: {},
      final_value: undefined
    };
  },

  methods: {
    onChange(value) {
      this.$emit('codeChange')
      this.final_value = value;
    }
  },

  watch: {
    trigger() {
      // alert(this.final_value)
      if (this.final_value) {
        let final_obj = {};
        const customInlineValue = this.final_value.split(
          "customInlineStyle"
        )[1];
        const trimmed = customInlineValue
          .replace(/\r?\n|\r/g, "")
          .replace(/\s/g, "")
          .replace(/;/g, "_")
          .replace(/[{-}]/g, "")
          .split("_")
          .map(e => {
            const every_e = e.replace(":", " ").split(" ");
            if (every_e[0] != "") {
              final_obj[`${every_e[0]}`] = every_e[1];
            }
          });


        this.$store.dispatch("pages/addrs_finder_mutator", {
          uid: `${this.data.index}--${this.data.uid}`,
          fn: locator => {
            this.$store.commit("pages/update_section", {
              desc: `Added Inline style ${locator}`,
              locator,
              scoped_variable: { final_obj, code: this.final_value },
              exec_on_prop(prop, tag, scoped_variable, obj) {
                obj.inlineStyle = scoped_variable.final_obj;
                obj.inlineCode = scoped_variable.code;
              }
            });
          }
        });

        this.$store.commit('pages/set_temp_id', {
          uid: this.data.uid,
          index: this.data.index
        })
      } else {
        this.$store.commit("modal/set_modal", {
          head: "dqPageLogicError",
          body: "There is currently nothing to save",
          config: {
            ui_type: "err",
            closable: false
          }
        });
      }
    }
  },

  mounted() {
    // for some reason the width of the editor wont get to 100%
    // if I dont refresh the editor 2 times.
    setTimeout(() => {
      this.ready = true;
      setTimeout(() => {
        this.ready = false;
      }, 0);

      setTimeout(() => {
        this.ready = true;
        this.show = true;

        if (this.data.inlineCode) {
          this.code = this.data.inlineCode;
        }
      }, 200);
    }, 0);
  }
};
</script>

<style>
.mo-editor {
  height: 200px;
}
</style>