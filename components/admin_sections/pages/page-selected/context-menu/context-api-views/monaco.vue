<template>
  <div class="fullwidth">
    <MonacoEditor
      v-if="ready"
      v-show="show"
      class="mo-editor"
      v-model="code"
      language="css"
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
  props: ['trigger'],

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
      this.final_value = value
    },
  },

  watch: {
    trigger() {
      alert(this.final_value)
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
      }, 200);
    }, 0);
  }
};
</script>

<style>
.mo-editor {
  height: 300px;
}
</style>