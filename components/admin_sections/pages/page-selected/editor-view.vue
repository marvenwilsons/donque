<template>
  <div id="dq-page-editor" class="flex relative">
    <div class="flex3 flex absolute fullheight-percent">
      <div id="dq-page-editor-area" class="pad125 flex1 relative flexcol fullwidth">
        <div
          id="dq-page-editor-area-c1"
          v-for="(sections,s_i) in $store.state.root"
          :key="`seccc-${s_i}`"
        >
          <div class="flex">
            <div class="dq-strvw-el">
              <div
                :style="{background:$store.state.theme.global.secondary_bg_color}"
                class="flex flexcenter spacebetween pointer"
                @click="openOpt(sections.uid,mode,1)"
              >
                section
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
                      class="pad050 absolute dq-page-el-opt-bx-pu "
                    >
                      <div class="margin025 fullheight-percent ">
                        <div class="fullheight-percent" :data="el" :is="view"></div>
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
        class="fullheight-percent"
      >test</div>
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
  data() {
    return {
      cur_open: undefined,
      opn_opts: [],
      mode: true,
      gg: [],

      view: undefined,

      cur_actv: undefined,
      active: undefined,

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
