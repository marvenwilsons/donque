<template>
  <div id="dq-page-sel-content" class="flex flexcol fullheight-percent flexcenter">
    <div class="flex1 flex fullwidth">
      <div
        class="fullwidth flex"
        :pane_index="my_pane_index"
        :data="data.page"
        :page_data="page_data"
        :is="comp"
      ></div>
    </div>
    <div
      id="dq-sel-page-pane"
      :style="{border: `1px solid ${this.$store.state.theme.global.secondary_bg_color}`}"
      class="flex fullwidth"
    >
      <div
        :style="{background: comp == 'editor' ? $store.state.theme.global.secondary_bg_color : ''}"
        @click="comp = 'editor'"
        class="pad025 pointer margin025 padleft050 padright050"
      >Editor</div>
      <div
        :style="{background: comp == 'rs' ? $store.state.theme.global.secondary_bg_color : ''}"
        @click="comp = 'rs'"
        class="pad025 pointer margin025 padleft050 padright050"
      >Route settings</div>
      <div
        :style="{background: comp == 'mystylesheet' ? $store.state.theme.global.secondary_bg_color : ''}"
        @click="comp = 'mystylesheet'"
        class="pad025 pointer margin025 padleft050 padright050"
      >My Style sheet</div>
      <div
        :style="{background: comp == 'globals' ? $store.state.theme.global.secondary_bg_color : ''}"
        @click="comp = 'globals'"
        class="pad025 pointer margin025 padleft050 padright050"
      >Globals</div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import editor from "./editor-view";
import route_settings from "./route-settings-view";
import mystylesheet from "./mystylesheet.vue";
import globals from "./globals";
import { TweenMax, TimelineLite, TweenLite } from "gsap";

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
    mystylesheet,
    globals
  },
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: null,
      pane_width: "100%",
      pane_head_bg_color: "rgb(48, 51, 64)",
      pane_head_title_color: "white",
      renderOnce: true,
      closable: false
    });
  },
  mounted() {
    const el = document.getElementById("dq-page-sel-content");

    TweenMax.fromTo(el, 1, { opacity: 0 }, { opacity: 1 });
    TweenMax.fromTo(
      el,
      0.2,
      { width: 0 },
      { width: "100%", ease: Power2.easeInOut }
    );
    TweenMax.fromTo(
      el,
      0.2,
      { height: 0 },
      { height: "100%", ease: Power2.easeInOut }
    );

    this.$store.commit("pane_system/alter_pane_config", {
      pane_index: this.my_pane_index,
      alter: {
        title: `Web Page: ${this.data.page}`
      }
    });
  },
  created() {
    // console.log("fetching page contents");
    this.$store
      .dispatch("systemCall", {
        command: "getPage",
        section: "pageMethods",
        data: {
          path: this.data.page
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
