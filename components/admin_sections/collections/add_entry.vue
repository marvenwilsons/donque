<template>
  <div class="fullheight-percent pad125">
    Add Entry
    <!-- <pre>{{this.data.schema}}</pre> -->
    <pre>{{Create_Objectify_Schema(this.data.schema)}}</pre>
    <div v-if="objectify_Config.data">
      <objectifyFlatSettings :config="objectify_Config" :appearance="objectify_Appearance">
        <!-- <div slot="modal" class="pad125 flex flexcenter" style="background:white;">
          <pre>{{submit_data}}</pre>
        </div> -->
      </objectifyFlatSettings>
    </div>
  </div>
</template>

<script>

import objtifyConverter from '@/components/global-ui/objectify/converter'
import modal_AddCollection from "./modals/add_collection";

export default {
  props: ["my_pane_index", "data"],
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: null,
      pane_width: "800px",
      pane_head_bg_color: "rgb(48, 51, 64)",
      renderOnce: true,
      pane_head_title_color: "white"
    });
  },
  data: () => ({
    objectify_Config: {
      data: undefined, // object a schema
      operation: "rw", // rw , r
      submit_button: "DEMO SUBMIT", // string: if supplied the button will appear
      show_modal: false,
      allowRemoveProp: true // only in read only operations
    },
    objectify_Appearance: {
      title_text_color: "gray",
      sub_title_description_text_color: "gray",

      wrap_around_border_color: "lightgray",
      divider_border_color: "lightgray",

      keys_bg_color: "whitesmoke",
      keys_text_color: "black",
      values_bg_color: "whitesmoke",
      values_text_color: "black",

      select_arrow_down_color: "black",

      button_bg_color: "blue",
      button_text_color: "white",

      background_selected: "",

      modal_overlay_bg: "black"
    }
  }),
  mounted() {
    const ModalComponent = modal_AddCollection
    this.$emit("SetPaneModal", {
        component: ModalComponent,
        title: 'Create Collection',
        width: '420px',
        CanBeClose: true,
        header: true,
        pane_name:`Add New ${this.data["Collection Name"]}`
      });
    // pane default
    this.$store.commit("pane_system/alter_pane_config", {
      pane_index: this.my_pane_index,
      alter: {
        title: `Add New ${this.data["Collection Name"]}`
      }
    });

    // objectify config defaults
    this.objectify_Config.data = {
      // Normal
      id: {
        type: "string",
        minChar: 3,
        maxChar: 20,
        allowSpecialChars: false,
        allowWhiteSpace: false,
        hoverInfo: "Element Id",
        default: undefined
      },
      name: {
        type: "string",
        minChar: 1,
        maxChar: 100,
        default: null,
      },
      tabindex: {
        type: "number",
        min: 0,
        max: 999,
        step: 1,
        default: null,
      },
      /**
       * list origin from depends on isAList value
       */
      "list origin from": {
        type: "select",
        options: ["models", "collections"],
        default: null,
        hoverInfo: "dq-studio global attribute: re renders element repeatedly",
      },
      /**
       * Collections list and Models depends on isAList value and list origin from value
       */
      "collections list": {
        type: "string",
        minChar: 1,
        maxChar: 900,
        allowWhiteSpace: false,
        default: null,
      },
      models: {
        type: "string",
        minChar: 1,
        maxChar: 900,
        allowWhiteSpace: false,
        default: null,
      },
    }
  },
  methods: {
    Create_Objectify_Schema(RawSchemaFromSever) {
      let final_Schema = undefined

      // logic
      const ojbKeys = Object.keys(RawSchemaFromSever)
      final_Schema = ojbKeys

      return final_Schema
    }
  }
};
</script>