<template>
  <div class="fullheight-percent pad125">
    <!-- <pre>{{data.schema}}</pre> -->
    <!-- <pre>{{Create_Objectify_Schema(this.data.schema)}}</pre> -->
    <div
      class="relative flex fullwidth fullheight-percent"
      style="overflow-x:hidden;overflow-y:scroll;"
      v-if="objectify_Config.data"
    >
      <div class="fullwidth flex flex1 pad125 absolute">
        <div class="flex1">
          <formMaker @openFileSystem="openFileSystem" :schema="data.schema"></formMaker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import objtifyConverter from "@/components/global-ui/objectify/converter";
import modal_AddCollection from "./modals/add_collection";
import selectFileModal from "../../admin_sections/files/selectFileModal"

export default {
  props: ["my_pane_index", "data"],
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: null,
      pane_width: "80%",
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

      wrap_around_border_color: "#B0BEC5",
      divider_border_color: "#B0BEC5",

      keys_bg_color: "#CFD8DC",
      keys_text_color: "#263238",
      values_bg_color: "#ECEFF1",
      values_text_color: "#263238",

      select_arrow_down_color: "#263238",

      button_bg_color: "blue",
      button_text_color: "white",

      background_selected: "#ECEFF1",

      modal_overlay_bg: "#263238"
    }

    // title_text_color: 'gray',
    //       sub_title_description_text_color: 'gray',

    //       wrap_around_border_color: this.$store.state.theme.global.border_color,
    //       divider_border_color:this.$store.state.theme.global.border_color,

    //       keys_bg_color: this.$store.state.theme.global.secondary_bg_color,
    //       keys_text_color: 'black',
    //       values_bg_color: 'white',
    //       values_text_color: 'black',

    //       select_arrow_down_color: 'black',

    //       button_bg_color: 'blue',
    //       button_text_color: 'white',

    //       background_selected: this.$store.state.theme.global.secondary_bg_color,

    //       modal_overlay_bg: this.$store.state.theme.global.secondary_bg_color
  }),
  mounted() {
    const ModalComponent = modal_AddCollection;
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
        default: null
      },
      tabindex: {
        type: "number",
        min: 0,
        max: 999,
        step: 1,
        default: null
      },
      /**
       * list origin from depends on isAList value
       */
      "list origin from": {
        type: "select",
        options: ["models", "collections"],
        default: null,
        hoverInfo: "dq-studio global attribute: re renders element repeatedly"
      },
      /**
       * Collections list and Models depends on isAList value and list origin from value
       */
      "collections list": {
        type: "string",
        minChar: 1,
        maxChar: 900,
        allowWhiteSpace: false,
        default: null
      },
      models: {
        type: "string",
        minChar: 1,
        maxChar: 900,
        allowWhiteSpace: false,
        default: null
      }
    };
  },
  methods: {
    Create_Objectify_Schema(RawSchemaFromSever) {
      let final_Schema = undefined;

      // logic
      const ojbKeys = Object.keys(RawSchemaFromSever);
      final_Schema = ojbKeys;

      return final_Schema;
    },
    openFileSystem() {
      this.$emit("SetPaneModal", {
        pane_index: this.my_pane_index,
        pane_name: `Add New ${this.data['Collection Name']}`,
        component: selectFileModal,
        title: "Select file from file system",
        width: "1090px",
        CanBeClose: true,
        header: true,
        CustomData: 'img'
      });
    }
  }
};
</script>