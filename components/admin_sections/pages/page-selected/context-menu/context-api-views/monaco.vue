<template>
  <div class="fullwidth">
    <MonacoEditor
      v-if="ready"
      v-show="show"
      theme="vs-dark"
      class="mo-editor"
      v-model="code"
      language="javascript"
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
  components: {
    MonacoEditor
  },

  data() {
    return {
      code: `// Write Custom inline style inside the object \n// use camel case, DO NOT USE dashes \n\n{}`,
      width: "100%",
      ready: false,
      show: false,
      options: {}
    };
  },

  methods: {
    onChange(value) {
      console.log(value);
    },
  },

  mounted() {
console.log(MonacoEditor)

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