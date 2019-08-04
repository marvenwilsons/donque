<template>
  <div id="dq-page-editor" class="flex relative">
    <main class="flex fullwidth">
      <div class="fullwidth flex">
        <div
          id="dq-page-editor-area"
          :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
          class="flex flex3 relative flexcol fullwidth margin050 borderred"
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
              <strong>dq Page Structure Editor 1.0</strong>
            </div>
            <div>
              <i
                @click="$store.commit('pages/save_stage',{path: data})"
                class="fas fa-save pointer padright025"
              ></i>
            </div>
          </div>

          <!-- elements view -->
          <main id="dq-page-editor-area-host" class="flex1 flex relative">
            <div class="pad125 relative flex1 absolute">
              <div
                :style="{filter: sec_modal_viz ? 'blur(2px)' : ''}"
                class="fullwidth flex"
                id="dq-page-editor-area-c1"
                v-for="(sections,s_i) in (is_traversing ? travers_mode :  $store.state.pages.stages.length == 0 ? sections : n_sections)"
                :key="`seccc-${s_i}`"
              >
                <div id="dq-viz-host" :data="s_i" class="flex">
                  <div style="min-width:64px;" class="dq-strvw-el pointer">
                    <div
                      @click="sec_modal_viz = true, sec_data = undefined"
                      :style="{background:theme.global.secondary_bg_color}"
                      v-if="s_i == 0"
                    >
                      wrapper
                      <i class="fas fa-caret-right"></i>
                    </div>
                  </div>
                  <div :id="`${s_i}--${sections.uid}`" class="dq-strvw-el">
                    <div
                      :style="{background:theme.global.secondary_bg_color}"
                      class="flex flexcenter spacebetween pointer"
                      @click="openOpt(sections.uid,mode,1)"
                    >
                      <span class="padleft025 padright050">
                        section -
                        <small>{{sections.role}}</small>
                      </span>
                      <i class="fas fa-caret-right"></i>
                      <!-- option box -->
                      <div
                        @click="openOpt(sections.uid,mode, 0)"
                        v-if="opn_opts.includes(sections.uid)"
                        class="relative"
                      >
                        <div
                          :style="{boxShadow:`0 0 5px ${$store.state.theme.global.secondary_bg_color}`}"
                          class="dq-page-el-opt-bx-1 absolute flex pad050"
                        >
                          <div class="flex flexcol">
                            <span>
                              <div
                                @mouseover="active = `optlpp-html${d.text}`"
                                @mouseleave="cur_actv != `optlpp-html${d.text}` && (active = undefined)"
                                :style="setStyle(active === `optlpp-html${d.text}` || cur_actv == `optlpp-html${d.text}`)"
                                @click="view = d.view,  cur_actv = `optlpp-html${d.text}`"
                                v-for="d in opts"
                                class="pad025"
                                :key="`ihga-${d.text}-aw`"
                              >{{d.text}}</div>
                              <!-- option items end -->
                              <div class="pad025">Cut</div>
                              <div class="pad025">Paste</div>
                              <div class="pad025">Move up</div>
                              <div class="pad025">Move down</div>
                            </span>
                          </div>
                          <div
                            v-if="view"
                            :style="{
                        boxShadow:`0 0 5px ${$store.state.theme.global.secondary_bg_color}`,
                        left:'90px',
                        top: '-1px',
                        border: `1px solid ${$store.state.theme.global.border_color}`,
                        background:'white'}"
                            class="pad050 absolute dq-page-el-opt-bx-pu"
                          >
                            <div class="margin025 fullheight-percent">
                              <div
                                class="fullheight-percent"
                                :path="data"
                                :data="page_data"
                                :uid="`${s_i}--${sections.uid}`"
                                :addrs_finder="addrs_finder"
                                :is="view"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- end of option box -->
                    </div>
                  </div>
                  <strvw :data="sections"></strvw>
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
                <strong>Console</strong>
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
                <console></console>
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
                  >{{ st.desc}}</span>
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
import console from "./console";

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
        return this.$store.state.pages.root.sections;
      }
    },
    n_sections() {
      if (this.$store.state.pages.stages.length != 0) {
        return this.$store.state.pages.stages[this.stages.length - 1].obj
          .sections;
      } else {
        return this.$store.state.pages.root.sections;
      }
    },
    travers_mode() {
      if (this.$store.state.pages.stages.length != 0) {
        return this.$store.state.pages.stages[this.pointer].obj.sections;
      } else {
        return this.$store.state.pages.root.sections;
      }
    },
    stages() {
      return this.$store.state.pages.stages;
    }
  },
  data() {
    return {
      addrs_finder: ({ el, uid}, fn) => {
        let addrs = [];
        let go = false;

        const recor = id => {
          const x = document.getElementById(`${id}`);

          if (x.parentElement.id == "dq-viz-host") {
            /**
             * split id > push to array
             * if the id of the element is equal to dq-viz-host
             * trim and split the id discard the character body
             * and parse the it to int then push to addrs array
             */
            addrs.push(
              parseInt(x.id.split("--")[0]) == NaN
                ? x.id.split("--")[0]
                : parseInt(x.id.split("--")[0])
            );

            //
            go = true;
          }
          // if the is is not dq-viz-host
          else {
            const x = document.getElementById(`${id}`);

            const gtr = r => {
              if (r.parentElement.id != "dq-page-editor-area-c1") {
                gtr(r.parentElement);

                if (r.id) {
                  addrs.push(parseInt(r.id.split("--")[0]));
                }
              } else {
                // replace the first index value of the addrs array to
                // data attribute value, this represents the section
                addrs.splice(0, 1, parseInt(r.getAttribute("data")));

                //
                go = true;
              }
            };

            addrs.push(
              parseInt(id.split("--")[0]) == NaN
                ? id.split("--")[0]
                : parseInt(id.split("--")[0])
            );

            /**
             * if the html element has no id, execute the gtr function.
             * the gtr function is a recorsive function,
             * the gtr function's main purpose is to find the id dq-page-editor-area-c1
             * until then the gtr function will kepp on executing on its self
             *
             * if the current html being examine by each execution of the gtr function
             * has an id, that id will be push to addrs array
             *
             * if the id dq-page-editor-area-c1 found
             */
            if (x.parentElement.id == "") {
              const asfd = gtr(x);
            } else {
            }
          }
        };

        /**
         * 1. processing starts here! getting the addrs of the element being click
         * by reading the ID of each element until the parent host id is reach,
         * constant addrs mutation
         */
        recor(uid);

        const isOdd = num => num % 2;

        let cntr = -1;
        let new_addrs = [];

        /**
         * Currently the addrs array is an array of numbers which
         * represents the position index of arrays in the els object
         * insided the section object of the stage object located in the store.
         *
         * ex. current addrs state: [0,0]
         * ex. addrs after for loop: [0,'els',0,'els']
         *
         * 2. push 'els' string to addrs array if index is even,
         * push addrs value according by index if it is odd.
         */
        for (let i = 0; i < addrs.length * 2; i++) {
          if (isOdd(i)) {
            new_addrs.push("els");
          } else {
            cntr++;
            new_addrs.push(addrs[cntr]);
          }
        }

        /**
         * 3
         */
        new_addrs.pop();

        /**
         * 4.
         * send final data to store for new stage entry
         */
        if (go) {
          fn(new_addrs);
          addrs = [];
          new_addrs = [];
        }
      },

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
          text: "properties",
          view: "properties"
        },
        {
          text: "ClassList",
          view: "classList"
        },
        {
          text: "HTML",
          view: "addChild"
        },
        {
          text: "Plugins",
          view: "plgs"
        },
        {
          text: "Inline Style",
          view: "ils"
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
    console,

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
          color: this.$store.state.theme.global.selection2.active_text_color
        };
      } else {
      }
    },
    openOpt(uid, mode, c) {
      if (mode == true) {
        if (this.opn_opts.includes(uid)) {
          this.opn_opts.splice(this.opn_opts.indexOf(uid), 1);
        } else {
          this.opn_opts.push(uid);
        }

        this.mode = false;
      } else {
        this.gg.push(c);

        setTimeout(() => {
          if (this.gg[0] === 0) {
            this.mode = false;
          } else if (this.gg[0] == 1) {
            this.mode = true;
            if (this.opn_opts.includes(uid)) {
              this.opn_opts.splice(this.opn_opts.indexOf(uid), 1);
            } else {
              this.opn_opts.push(uid);
            }
          }
          this.gg = [];
        }, 0);
      }
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
  top: -13px;
  left: 6px;
  min-width: 90px;
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
