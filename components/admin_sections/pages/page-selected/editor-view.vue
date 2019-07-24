<template>
  <div id="dq-page-editor" class="flex relative">
    <div class="flex3 flex absolute fullheight-percent">
      <div id="dq-page-editor-area" class="margin125 flex flex1 relative flexcol fullwidth">
        <!-- section modal -->
        <div
          style="z-index:1000"
          v-if="sec_modal_viz"
          class="absolute fullwidth fullheight-percent flex flexcenter flexcol"
        >
          <div :style="{width:'350px', ...theme.modal_host_style, ...theme.global.page_modal_background}" class>
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
                @click="sec_modal_viz = false"
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
        <div :style="{filter: sec_modal_viz ? 'blur(2px)' : ''}" class="padbottom050">
          <strong>Page Structure Visualizer 1.0</strong>
        </div>
        <div
          :style="{filter: sec_modal_viz ? 'blur(2px)' : ''}"
          id="dq-page-editor-area-c1"
          v-for="(sections,s_i) in sections"
          :key="`seccc-${s_i}`"
        >
          <div class="flex">
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
            <div class="dq-strvw-el">
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
                        <div class="fullheight-percent" :is="view"></div>
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
      <div
        :style="{borderLeft:`1px solid ${$store.state.theme.global.secondary_bg_color}`}"
        id="dq-page-editor-area-c2"
        class="fullheight-percent flex flexcol"
      >
        <div
          :style="{border:`1px solid ${$store.state.theme.global.border_color}`}"
          class="pad050 flex spacebetween"
        >
          <div>link here</div>
          <span>
            <i class="fas fa-desktop padleft125 pointer"></i>
            <i class="fas fa-tablet-alt padleft125 pointer"></i>
            <i class="fas fa-mobile-alt padleft125 padright125 pointer"></i>
          </span>
        </div>
        <div class="relative flex1">
          <div class="absolute fullwidth">live view here</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import el_box_model from "./el-box-model";
import struct_view from "./struc-view";

import addChild from "../struct-view-el-opts/addChild";
import classList from "../struct-view-el-opts/classList";
import dddel from "../struct-view-el-opts/delete";
import dddesc from "../struct-view-el-opts/desc";
import properties from "../struct-view-el-opts/properties";
import ils from "../struct-view-el-opts/inlineStyle";

export default {
  props: ["page_data"],
  computed: {
    sections() {
      if (this.$store.state.pages.root) {
        return this.$store.state.pages.root.sections;
      }
    }
  },
  data() {
    return {
      cur_open: undefined,
      opn_opts: [],
      mode: true,
      gg: [],

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

      // options available in every el
      opts: [
        {
          text: "Desc",
          view: "dddesc"
        },
        {
          text: "AddChild",
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
        },
        {
          text: "Inline Style",
          view: "ils"
        }
      ]
    };
  },
  components: {
    boxmodel: el_box_model,
    strvw: struct_view,

    addChild,
    classList,
    dddel,
    dddesc,
    properties,
    ils
  },
  methods: {
    addSec() {

      if (this.sec_data) {
        // validate len
        if (this.sec_data.length > 25) {
          this.sec_err = "Error: section role must not exceed 25 characters";
        } else {
          this.sec_err = undefined;
        }

        // validate val if there is no character and only spaces
        if(this.sec_data.trim() == ''){
          this.sec_err = "Error: section role must have valid characters"
        }else {
          this.sec_err = undefined
        }
      } else if (!this.sec_data) {
        // validate val 2
        this.sec_err = "Error: section role is required";
      } else {
        this.sec_err = undefined;
      }
      

      // submit
      if (this.sec_err == undefined) {
        this.$store
          .dispatch("systemCall", {
            command: "updatePage",
            section: "pageMethods",
            data: {
              mode: "addSection",
              path: this.page_data.path,
              customData: {
                role: this.sec_data
              }
            },
            method: "post"
          })
          .then(respose => {
            if (respose.status) {
              this.$store.dispatch("pages/update_root", this.page_data.path);
              this.sec_modal_viz = false
            }
          });
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
  }
};
</script>

<style scoped>
.err {
  color: var(--err);
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
#dq-page-editor {
  /* max-width: 350px; */
  overflow: auto;
}
#dq-page-editor-area {
  overflow: auto;
}
#dq-page-editor-area-c1 {
  min-width: 900px;
}
#dq-page-editor-area-c2 {
  min-width: 1500px;
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
