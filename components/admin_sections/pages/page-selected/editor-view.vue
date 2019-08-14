<template>
  <div id="dq-page-editor" class="flex relative">
    <main class="flex fullwidth">
      <div class="fullwidth flex">
        <div
          id="dq-page-editor-area"
          :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
          class="flex flex3 relative flexcol fullwidth margin050"
        >
          <!-- section modal -->
          <div
            style="z-index:1000"
            v-if="sec_modal_viz"
            class="absolute fullwidth fullheight-percent flex flexcenter flexcol"
          >
            <div
              :style="{width:'350px', ...theme.modal_host_style, ...theme.global.page_modal_background}"
            >
              <div class="pad125" :style="{...theme.modal_head_style}">Add new section</div>
              <div class="padtop125 padleft125 padright125">
                <span class="padright025">
                  <strong>Section Role</strong>
                </span>
                <input v-model="sec_data" class="margintop025 fullwidth pad025" type="text" />
                <strike class="err" v-if="sec_err">{{sec_err}}</strike>
              </div>
              <div class="flex flexend padright125 padbottom125">
                <span
                  @click="sec_modal_viz = false, sec_err = undefined"
                  :style="{...theme.modal_button_style}"
                  class="pointer margintop125 marginright050 pad025 padleft050 padright050"
                >
                  <strong>Cancel</strong>
                </span>
                <span
                  @click="addSec"
                  :style="{...theme.modal_button_style}"
                  class="pointer margintop125 pad025 padleft050 padright050"
                >
                  <strong>Add Section</strong>
                </span>
              </div>
            </div>
          </div>

          <!-- structure vizualizer -->
          <div
            :style="{filter: sec_modal_viz ? 'blur(2px)' : '', background:`${$store.state.theme.global.secondary_bg_color}`}"
            class="pad050 spacebetween flex st-viz-bnnr"
          >
            <div>
              <strong>DQ Page Structure & Semantic Editor 1.0</strong>
            </div>
            <div>
              <i
                @click="$store.commit('pages/save_stage',{path: data})"
                class="fas fa-save pointer padright025"
              ></i>
            </div>
          </div>

          <!-- elements view @stages - html render -->
          <main
            @click.right.prevent
            @mousemove="mv"
            id="dq-page-editor-area-host"
            class="flex1 flex relative"
          >
            <!-- work -->
            <div
              role="option-box"
              :style="{
                zIndex:100,
                minWidth:'200px',
                left:`${$store.state.pages.opn_opts_pos_left}px`,
                top:`${$store.state.pages.opn_opts_pos_top}px`,
                boxShadow:`0 10px 20px ${$store.state.theme.global.secondary_bg_color}`,
                border: `1px solid ${$store.state.theme.global.border_color}`,
                borderRadius: '8px',
                ...$store.state.theme.global.page_modal_background
                }"
              class="borderred absolute padtop050 padbottom050"
              v-if="$store.state.pages.opn_opts"
            >
              <ul id="opt-box-ul" style="margin:0; height:0px; overflow:hidden;">
                <!-- open api -->
                <li
                  @mouseover="opts_active = 'opts-opt-open-api'"
                  @mouseleave="opts_cur_active != `opts-opt-open-api` && (opts_active = undefined)"
                  :style="setStyle(opts_active === `opts-opt-open-api` || opts_active == `opts-opt-open-api`)"
                  class="pad025 flex pointer"
                >
                  <div class="flex3">
                    <i class="far fa-edit padleft125"></i>
                  </div>
                  <div class="flex7">Open API</div>
                  <div class="flex4"></div>
                </li>
                <!-- add element -->
                <li
                  @mouseover="opts_active = 'opts-opt-addelement'"
                  @mouseleave="opts_cur_active != `opts-opt-addelement` && (opts_active = undefined)"
                  :style="setStyle(opts_active === `opts-opt-addelement` || opts_active == `opts-opt-addelement`)"
                  class="pad025 flex pointer"
                >
                  <div class="flex3">
                    <!-- <i class="far fa-edit padleft125"></i> -->
                  </div>
                  <div class="flex7">Add Element</div>
                  <div class="flex4"></div>
                </li>
                <!-- cut -->
                <li
                  @mouseover="opts_active = 'cut'"
                  @mouseleave="opts_cur_active != `cut` && (opts_active = undefined)"
                  :style="setStyle(opts_active === `cut` || opts_active == `cut`)"
                  class="pad025 flex pointer"
                >
                  <div class="flex3">
                    <i class="fas fa-cut padleft125"></i>
                  </div>
                  <div class="flex7">Cut</div>
                  <div class="flex4"></div>
                </li>
                <!-- copy -->
                <li
                  @mouseover="opts_active = 'copy'"
                  @mouseleave="opts_cur_active != `copy` && (opts_active = undefined)"
                  :style="setStyle(opts_active === `copy` || opts_active == `copy`)"
                  class="pad025 flex pointer"
                >
                  <div class="flex3">
                    <i class="far fa-copy padleft125"></i>
                  </div>
                  <div class="flex7">Copy</div>
                  <div class="flex4"></div>
                </li>
                <!-- paste -->
                <li
                  @mouseover="opts_active = 'paste'"
                  @mouseleave="opts_cur_active != `paste` && (opts_active = undefined)"
                  :style="setStyle(opts_active === `paste` || opts_active == `paste`)"
                  class="pad025 flex pointer"
                >
                  <div class="flex3">
                    <!-- <i class="far fa-copy padleft125"></i> -->
                  </div>
                  <div class="flex7">Paste</div>
                  <div class="flex4"></div>
                </li>
                <!-- delete -->
                <li
                  @mouseover="opts_active = 'del'"
                  @mouseleave="opts_cur_active != `del` && (opts_active = undefined)"
                  :style="setStyle(opts_active === `del` || opts_active == `del`)"
                  class="pad025 flex pointer"
                >
                  <div class="flex3">
                    <i class="far fa-trash-alt padleft125"></i>
                  </div>
                  <div class="flex7">Delete</div>
                  <div class="flex4"></div>
                </li>
              </ul>
            </div>
            <div class="pad025 flex relative flex1 absolute fullwidth fullheight-percent">
              <div class="pad050 flex1 aut">
                <div
                  :style="{filter: sec_modal_viz ? 'blur(2px)' : ''}"
                  class="fullwidth flex"
                  id="dq-page-editor-area-c1"
                  v-for="(sections,s_i) in (is_traversing ? travers_mode :  $store.state.pages.stages.length == 0 ? sections : n_sections)"
                  :key="`seccc-${s_i}`"
                >
                  <div id="dq-viz-host" :data="s_i" :class="[`viz-host-${s_i}`, 'flex']">
                    <div style="min-width:75px;" class="dq-strvw-el pointer">
                      <div
                        @click="sec_modal_viz = true, sec_data = undefined"
                        :style="{background:theme.global.secondary_bg_color}"
                        v-if="s_i == 0"
                      >
                        wrapper
                        <i class="fas fa-chess-rook padleft025 padright025"></i>
                      </div>
                    </div>
                    <div :id="`${s_i}--${sections.uid}`" class="dq-strvw-el">
                      <div
                        :style="{background:theme.global.secondary_bg_color}"
                        class="flex flexcenter spacebetween pointer"
                        @click.right.prevent="openOpt(sections.uid,$event)"
                      >
                        <span class="padleft025 padright050">
                          section
                          <!-- <small>{{sections.role}}</small> -->
                        </span>
                        <i class="fas fa-layer-group padright025 padleft025"></i>
                      </div>
                    </div>
                    <strvw :x="x" :y="y" :data="sections"></strvw>
                  </div>
                </div>
              </div>
              <div
                :style="{border: `1px solid ${$store.state.theme.global.border_color}`, maxWidth:'600px'}"
                class="flex1 relative flex flexcol"
                v-if="$store.state.pages.api_view"
              >
                <div
                  :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
                  class="pad050 spacebetween flex st-viz-bnnr pointer"
                  @click="$store.commit('pages/close_el_api')"
                >
                  <strong>Element API</strong>
                  <div>
                    <i class="fas fa-times-circle"></i>
                  </div>
                </div>
                <!-- Element api container -->
                <div class="relative fullheight-percent flex flexcol">
                  <div>ClassList</div>
                  <div class="flex relative fullheight-percent">
                    <div class="absolute fullwidth fullheight-percent aut flex">
                      <div
                        v-if="$store.state.pages.api_view"
                        :uid="$store.state.pages.api_view.uid"
                        :is="$store.state.pages.api_view.view"
                        :data="$store.state.pages.api_view.el"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <!-- console view -->
          <div>
            <div
              class="pad050 flex spacebetween relative"
              :style="{
                borderTop: `1px solid ${$store.state.theme.global.border_color}`,
                background:`${$store.state.theme.global.secondary_bg_color}`}"
            >
              <div>
                <strong class="pointer">Console</strong> |
                <strong class="pointer">Live View</strong>
                <!-- <strong>Live-view</strong> -->
              </div>
              <div
                @click="exp_console"
                style="text-align:center;"
                class="padright050 pointer flex flexcenter"
              >
                <i v-if="!console" class="fas fa-angle-up"></i>
                <i v-if="console" class="fas fa-angle-down"></i>
              </div>
            </div>
            <div class="relative flex" id="dq-page-edtr-console-host">
              <div class="absolute fullwidth fullheight-percent">
                <dqPageConsole></dqPageConsole>
              </div>
            </div>
          </div>
        </div>

        <!-- side boxes -->
        <div id="dq-opts-indc-bxs" class="flex flexcol">
          <div
            :style="{border:`1px solid ${$store.state.theme.global.border_color}`, borderTop:`1px solid ${$store.state.theme.global.border_color}`}"
            class="flex2 flex flexcol margintop050 marginright050"
          >
            <div
              :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
              class="pad050 spacebetween flex"
            >
              <span class="padleft025">
                <strong>Stages</strong>
                - {{this.stages.length}} unsave change(s)
              </span>
              <span class="padright025">
                <i @click="travers('down')" class="fas fa-arrow-circle-left pointer padright025"></i>
                <i @click="travers('up')" class="fas fa-arrow-circle-right pointer"></i>
              </span>
            </div>
            <div id="dq-edtr-sd-pane-h" class="dq-edtr-sd-pane flex1 relative">
              <div class="absolute flexcol fullwidth">
                <div
                  @click="travers('select',st_k)"
                  class="padleft025 pointer flex"
                  v-for="(st,st_k) in stages"
                  :key="`st-${st_k}`"
                >
                  <div>
                    <i v-if="pointer == st_k" class="fas fa-caret-right" style="min-width:8px;"></i>
                  </div>
                  <div v-if="pointer != st_k" class style="min-width:8px;"></div>
                  <span
                    :style="{textDecoration: pointer == st_k ?  `underline dotted ${$store.state.theme.global.primary_text_color}` : ''}"
                  >
                    <small>
                      <strong>{{st.desc}}</strong>
                    </small>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            :style="{border:`1px solid ${$store.state.theme.global.border_color}`}"
            class="flex2 flex flexcol margintop050 marginright050"
          >
            <div
              :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
              class="pad050 flex spacebetween pointer"
            >
              <span class="padleft025">
                <strong>Commits</strong>
              </span>
              <span class="padright025">
                <i class="fas fa-plus-circle"></i>
              </span>
            </div>
            <div class="dq-edtr-sd-pane flex1 relative">
              <div class="absolute flexcol fullwidth">
                <div></div>
              </div>
            </div>
          </div>
          <div
            :style="{border:`1px solid ${$store.state.theme.global.border_color}`}"
            class="flex2 flex flexcol margintop050 marginright050 marginbottom050"
          >
            <div
              :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
              class="pad050 flex spacebetween pointer"
            >
              <span class="padleft025">
                <strong>Versions</strong>
              </span>
              <span class="padright025">
                <i class="fas fa-plus-circle"></i>
              </span>
            </div>
            <div class="dq-edtr-sd-pane flex1 relative">
              <div class="absolute flexcol fullwidth">
                <div></div>
              </div>
            </div>
          </div>
        </div>

        <!-- end -->
      </div>
    </main>
  </div>
</template>

<script>
import el_box_model from "./el-box-model";
import struct_view from "./struc-view";
import dqPageConsole from "./console";

import addChild from "../struct-view-el-opts/addChild";
import classList from "../struct-view-el-opts/classList";
import dddel from "../struct-view-el-opts/delete";
import dddesc from "../struct-view-el-opts/desc";
import properties from "../struct-view-el-opts/properties";
import ils from "../struct-view-el-opts/inlineStyle";
import plgs from "../struct-view-el-opts/plugins";

import { TweenMax, TimelineLite, TweenLite } from "gsap";

export default {
  props: ["page_data", "data"],
  computed: {
    sections() {
      if (this.$store.state.pages.root) {
        this.$store.commit("pages/set_travers_view", {
          obj: this.$store.state.pages.root.sections
        });
        return this.$store.state.pages.root.sections;
      }
    },
    n_sections() {
      if (this.$store.state.pages.stages.length != 0) {
        this.$store.commit("pages/set_travers_view", {
          obj: this.$store.state.pages.stages[this.stages.length - 1].obj
            .sections
        });

        return this.$store.state.pages.stages[this.stages.length - 1].obj
          .sections;
      } else {
        this.$store.commit("pages/set_travers_view", {
          obj: this.$store.state.pages.root.sections
        });
        return this.$store.state.pages.root.sections;
      }
    },
    travers_mode() {
      if (this.$store.state.pages.stages.length != 0) {
        this.$store.commit("pages/set_travers_view", {
          obj: this.$store.state.pages.stages[this.pointer].obj.sections,
          pointer: this.pointer
        });
        return this.$store.state.pages.stages[this.pointer].obj.sections;
      } else {
        this.$store.commit("pages/set_travers_view", {
          obj: this.$store.state.pages.root.sections
        });
        return this.$store.state.pages.root.sections;
      }
    },
    stages() {
      return this.$store.state.pages.stages;
    }
  },
  data() {
    return {
      x: undefined,
      y: undefined,
      cur_open: undefined,
      opn_opts: [],
      mode: true,
      gg: [],
      cur_sec: undefined,

      // current main component being display
      view: undefined,

      // mouse and indicator effects
      cur_actv: undefined,
      active: undefined,

      // opts active
      opts_active: undefined,
      opts_cur_active: undefined,

      // theme related
      theme: this.$store.state.theme,

      // creating new section related
      sec_modal_viz: false,
      sec_data: undefined,
      sec_err: undefined,

      // stage travers related
      pointer: undefined,
      is_traversing: false,

      // console
      console: false,

      // options available in every el
      opts: [
        {
          text: "Add Element",
          view: "addChild"
        },
        {
          text: "Desc",
          view: "dddesc"
        },
        {
          text: "Delete",
          view: "dddel"
        }
      ]
    };
  },
  components: {
    boxmodel: el_box_model,
    strvw: struct_view,
    dqPageConsole,

    addChild,
    classList,
    dddel,
    dddesc,
    properties,
    ils,
    plgs
  },
  methods: {
    uidGen() {
      return (length => {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      })(5);
    },
    travers(mode, val) {
      this.is_traversing = true;

      if (mode == "up") {
        if (this.pointer == this.stages.length - 1) {
          this.pointer = 0;
        } else {
          this.pointer = this.pointer + 1;
        }
      } else if (mode == "down") {
        if (this.pointer == 0) {
          this.pointer = this.stages.length - 1;
        } else {
          this.pointer = this.pointer - 1;
        }
      } else if (mode == "select") {
        this.pointer = val;
      }
    },
    scrollToEnd: function() {
      setTimeout(() => {
        var container = this.$el.querySelector("#dq-edtr-sd-pane-h");
        container.scrollTop = container.scrollHeight;
      }, 1);
    },
    exp_console() {
      this.console = !this.console;
      const n = document.getElementById("dq-page-edtr-console-host");

      if (this.console) {
        TweenMax.fromTo(n, 0.3, { height: "0" }, { height: "300" });
      } else {
        TweenMax.fromTo(n, 0.3, { height: "300" }, { height: "0" });
      }
    },
    addSec() {
      if (this.sec_data) {
        // validate len
        if (this.sec_data.length > 25) {
          return (this.sec_err =
            "Error: section role must not exceed 25 characters");
        } else {
          this.sec_err = undefined;
        }

        // validate val if there is no character and only spaces
        if (this.sec_data.trim() == "") {
          return (this.sec_err =
            "Error: section role must have valid characters");
        } else {
          this.sec_err = undefined;
        }
      } else if (!this.sec_data) {
        // validate val 2
        return (this.sec_err = "Error: section role is required");
      } else {
        this.sec_err = undefined;
      }

      if (this.sec_err == undefined) {
        if (this.$store.state.pages.stages.length == 0) {
          let n_sec = [];

          this.sections.map(e => {
            n_sec.push(e);
          });

          n_sec.push({
            els: [],
            role: this.sec_data,
            uid: this.uidGen()
          });

          this.$store.commit("pages/stage_push", {
            desc: `Added new section - ${this.sec_data}`,
            obj: {
              sections: n_sec
            },
            mode: 1
          });

          this.sec_modal_viz = false;
        } else {
          // get all contents from stages and sections
          // make a new array
          // push the new data to the array
          // push to stage

          let tempArr = [];

          this.stages.map(i => {
            tempArr.push(i);
          });

          let nSec = [];

          tempArr[tempArr.length - 1].obj.sections.map(e => {
            nSec.push(e);
          });

          nSec.push({
            els: [],
            role: this.sec_data,
            uid: this.uidGen()
          });

          this.$store.commit("pages/stage_push", {
            desc: `Added new section - ${this.sec_data}`,
            obj: {
              sections: nSec
            }
          });

          this.sec_modal_viz = false;
        }
      }
    },
    setStyle(i) {
      if (i) {
        return {
          background: this.$store.state.theme.global.selection2.hover_bg_color,
          color: this.$store.state.theme.global.selection2.active_text_color,
          transition: "0.3s"
        };
      }
    },
    // work
    mv($event) {
      const ev_clHeight = $event.clientX - 252 + 5;
      const ev_clWidth = $event.clientY - 126 + 25;

      this.x = ev_clHeight;
      this.y = ev_clWidth;

      // console.log($event)
    },
    openOpt(uid, $event) {
      this.$store.commit("pages/set_opts", {
        uid,
        top: this.y,
        left: this.x
      });

      setTimeout(() => {
        // console.log(document.getElementById("opt-box-ul"));
        const n = document.getElementById("opt-box-ul");
        if (n) {
          TweenMax.fromTo(n, 0.1, { height: "0" }, { height: "165" });
        }
      }, 0);
    },
    closeOpt() {
      console.log("test");
      this.$store.commit("pages/clear_opts");
    }
  },
  watch: {
    stages() {
      this.pointer = this.stages.length - 1;

      this.scrollToEnd();
      this.scrollToEnd();
    }
  }
};
</script>

<style scoped>
.err {
  color: var(--err);
}
.dq-edtr-sd-pane {
  overflow-x: hidden;
}
.dq-page-el-opt-bx-1 {
  z-index: 900;
  background: white;
  border: 1px solid rgba(128, 128, 128, 0.432);
  border-radius: 2px;
  /* top: -13px; */
  /* left: 6px; */
  min-width: 120px;
}
#dq-box-model-v {
  min-height: 140px;
}
#dq-page-editor-area-host {
  overflow: auto;
  /* min-width: 800px; */
}

#dq-opts-indc-bxs {
  min-width: 300px;
}
.dq-page-gr-hor {
  padding: 10px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.205);
}
.dq-page-gr-ver {
  padding: 10px;
  width: 145px;
  border-right: 1px solid rgba(128, 128, 128, 0.205);
}

#dq-page-edtr-console-host {
  overflow: hidden;
}

table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
th,
td {
  padding: 5px;
  text-align: left;
}
</style>
