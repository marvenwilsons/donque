<template>
  <div class="flex flexcol fullheight-percent">
    <div class="flex1 flex">
      <div
        class="fullwidth"
        :pane_index="my_pane_index"
        :data="data"
        :page_data="page_data"
        :is="comp"
      ></div>
    </div>
    <div
      id="dq-sel-page-pane"
      :style="{border: `1px solid ${this.$store.state.theme.global.secondary_bg_color}`}"
      class="flex"
    >
      <div @click="comp = 'editor'" class="pad050 pointer">Editor</div>
      <div @click="comp = 'rs'" class="pad050 pointer">Route settings</div>
      <div @click="comp = 'props'" class="pad050 pointer">Properties</div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import editor from "./editor-view";
import route_settings from "./route-settings-view";
import properties from "./props-view";

export default {
  props: ["data", "my_pane_index"],
  data() {
    return {
      comp: "editor",
      page_data: undefined
    };
  },
  components: {
    editor,
    rs: route_settings,
    props: properties
  },
  created() {
    console.log("fetching page contents");
    this.$store
      .dispatch("systemCall", {
        command: "getPage",
        section: "pageMethods",
        data: {
          path: this.data
        },
        method: "post"
      })
      .then(({ status, data }) => {
        if (status) {
          this.$store.commit("pages/set_root", data.data);
          this.page_data = data.data;
        } else {
          this.$store.commit("modal/set_modal", {
            head: "Error while fetching editor data",
            body: data.msg,
            config: {
              ui_type: "err",
              closable: false
            }
          });
        }
      });

    this.$store
      .dispatch("systemCall", {
        command: "getCss",
        section: "pageMethods",
        method: "get"
      })
      .then(({ status, data }) => {
        if (status) {
          this.$store.commit("pages/set_css_class", data.payload);
        } else {
          this.$store.commit("modal/set_modal", {
            head: "Error while fetching editor data",
            body: data.msg,
            config: {
              ui_type: "err",
              closable: false
            }
          });
        }
      });
  }
};
</script>

<style>
</style>
