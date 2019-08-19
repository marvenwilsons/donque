/**
 * @note 1, fix bug, inconsestent context menu spawn when main window scroll to right
 */

<template>
  <div>
    <!-- {{$store.state.pages.opn_opts}} -->
    <div
      :style="{color:$store.state.theme.global.secondary_text_color}"
      class="flex"
      :id="`${el_i}--${el.uid}`"
      v-for="(el,el_i) in data.els"
      :key="`el-${el_i}`"
    >
      <div class="dq-strvw-el">
        <div
          @mouseenter="showInfoBox(el,el_i)"
          @mouseleave="resetInfoBox()"
          @click="$store.commit('pages/clear_opts')"
          :style="{
            background: $store.state.pages.opn_opts == el.uid ? $store.state.theme.global.primary_bg_color : $store.state.theme.global.secondary_bg_color, 
            color: $store.state.pages.opn_opts == el.uid ? 'white' : '', 
            }"
          @click.right.prevent="openOpt({uid: el.uid, tag: el.tag, el})"
        >
          <!-- @note add travers event origin highlight element feature -->
          <div class="flex spacebetween flexcol flexwrap">
            <div class="flex1 flex flexcenter spacebetween">
              <div
                :style="{fontWeight: $store.state.pages.opn_opts == el.uid ? 700 : ''}"
                class="padleft025 padright050"
              >{{trimTitle(el.tag)}}</div>
              <i class="fab fa-html5 padright025"></i>
            </div>
          </div>
        </div>
      </div>
      <strvw :x="x" :y="y" :data="el"></strvw>
    </div>
  </div>
</template>

<script>
/**
 *
 */

import addChild from "../struct-view-el-opts/addChild";
import classList from "../struct-view-el-opts/classList";
import dddel from "../struct-view-el-opts/delete";
import dddesc from "../struct-view-el-opts/desc";
import properties from "../struct-view-el-opts/properties";
import ils from "../struct-view-el-opts/inlineStyle";

export default {
  props: ["data", "x", "y"],
  name: "strvw",
  data() {
    return {
      open: "",
      isOpen: false,
      opn_opts: [],
      cur_uid: undefined,
      mode: true,
      gg: [],
      view: undefined,
      active: undefined,
      cur_actv: undefined,
      rec: undefined,
      opts: [
        {
          text: "Add Element",
          view: "addChild"
        },
        {
          text: "ClassList",
          view: "classList"
        },
        {
          text: "properties",
          view: "properties"
        },
        {
          text: "Delete",
          view: "dddel"
        }
      ]
    };
  },
  components: {
    addChild,
    classList,
    dddel,
    dddesc,
    properties,
    ils
  },
  methods: {
    trimTitle(t) {
      if (t) {
        return t.split("_").pop();
      } else {
        return t;
      }
    },
    setStyle(i) {
      if (i) {
        return {
          background: this.$store.state.theme.global.selection2.hover_bg_color,
          color: this.$store.state.theme.global.selection2.active_text_color
        };
      }
    },
    openOpt({ uid, tag, el }) {
      // #work
      if (this.$store.state.pages.info_box_data) {
        this.$store.commit("pages/set_api_view", {
          uid,
          el: this.$store.state.pages.info_box_data
        });
      }

      this.$store.commit("pages/reset_info_box");
      this.$store.commit("pages/set_context_view", "html");
      this.$store.commit("pages/set_opts", {
        uid,
        tag,
        top: this.y,
        left: this.x,
        context_height: "230"
      });
      setTimeout(() => {
        const n = document.getElementById("opt-box-ul");
        //@pages > CONTEXT_MENU > on right_click > height controller
        if (n) {
          TweenMax.fromTo(
            n,
            0.1,
            { height: "0" },
            { height: this.$store.state.pages.context_height }
          );
        }
      }, 0);
    },
    set_view({ view, uid, el }) {
      this.$store.commit("pages/set_api_view", { view, uid, el });
    },
    showInfoBox(data,index) {
      this.$store.commit("pages/set_info_box", {
        data,
        index
      });

      setTimeout(() => {
        const n = document.getElementById("dq-page-el-info-box");
        if (n) {
          TweenMax.fromTo(n, 0.3, { opacity: "0" }, { opacity: "1" });
        }
      }, 0);
    },
    resetInfoBox() {
      this.$store.commit("pages/reset_info_box");
    }
  },
  mounted() {
    this.$store.commit("pages/set_recur", this.data);
    this.rec = this.$store.state.pages.recur;
  }
};
</script>

<style>
.dq-strvw-el {
  border-left: 1px solid rgba(128, 128, 128, 0.432);
  min-width: 40px;
}
.dq-strvw-el > div {
  padding: calc(var(--fontSize) * 0.25);
  min-width: 60px;
  border-radius: 2px;
  border-bottom: 1px solid white;
  cursor: pointer;
}
.dq-page-el-opt-bx {
  left: 70px;
  z-index: 900;
  background: white;
  min-width: 100px;
  border-radius: 2px;
  top: -23px;
}
.dq-page-el-opt-bx-pu {
  z-index: 900;
}
</style>
