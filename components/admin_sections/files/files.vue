<template>
  <div class="pad125">
    <div class="">
      <objectifyFlatSettings
        @onChange="''"
        @onError="err"
        operation="rw"
        :inputData="sample_data"
        :title="'Sample Objectify Usage'"
        :options="{
          borderColor: $store.state.theme.global.border_color,
          padding: 's'
        }"
      ></objectifyFlatSettings>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Files",
      pane_width: "500px"
    });
  },

  data: () => ({
    sample_data: {
      // Normal
      id: {
        type: "string",
        minChar: 3,
        maxChar: 20,
        allowSpecialChars: false,
        allowWhiteSpace: false,
        default: null
      },
      name: {
        type: "string",
        minChar: 1,
        maxChar: 100,
        default: null
      },
      tabindex: {
        type: "number",
        min: 0,
        max: 999,
        step: 1,
        default: null
      },
      // 
      isAList: {
        type: "select",
        options: ["Yes", "No"],
        default: 1,
        hoverInfo: "dq-studio global attribute: re renders element repeatedly"
      },
      "list origin from": {
        type: "select",
        options: ["models", "collections"],
        default: null,
        hoverInfo: "dq-studio global attribute: re renders element repeatedly"
      },
      "collections list": {
        type: "string",
        minChar: 1,
        maxChar: 900,
        allowWhiteSpace: false,
        default: null,
        renderCondition: {
          controllers: ["list origin from"],
          method: schema => schema["list origin from"]["default"] == 1
        }
      },
      models: {
        type: "string",
        minChar: 1,
        maxChar: 900,
        allowWhiteSpace: false,
        default: null,
        renderCondition: {
          controllers: ["list origin from"],
          method: schema => schema["list origin from"]["default"] == 0
        }
      },
    }
  }),

  methods: {}
};
</script>