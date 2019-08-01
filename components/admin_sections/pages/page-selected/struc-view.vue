<template>
  <div>
    <div
      :style="{color:$store.state.theme.global.secondary_text_color}"
      class="flex"
      :id="`${el_i}--${el.uid}`"
      v-for="(el,el_i) in data.els"
      :key="`el-${el_i}`"
    >
      <div   class="dq-strvw-el">
        <div
          :style="{background:$store.state.theme.global.secondary_bg_color}"
          @click="openOpt(el.uid,mode, 1)"
        >
          <div class="flex spacebetween flexcenter">
            {{trimTitle(el.tag)}}
            <i class="fas fa-caret-right"></i>
          </div>
          <!-- option box -->
          <div
            @click="openOpt(el.uid,mode, 0)"
            v-if="opn_opts.includes(el.uid)"
            class="flex padleft125 relative"
          >
            <div class="dq-page-el-opt-bx absolute flex relative">
              <div
                :style="{
                  boxShadow:`0 0 5px ${$store.state.theme.global.secondary_bg_color}`,
                  border: `1px solid ${$store.state.theme.global.border_color}`
                  }"
                class="pad050 flex flexcol"
              >
                <!-- option items or the api window of the element -->
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
                  <div class="pad025">Move up</div>
                  <div class="pad025">Move down</div>
                  <div class="pad025">Cut</div>
                  <div class="pad025">Paste</div>
                </span>
              </div>
              <div
                v-if="view"
                :style="{
                  boxShadow:`0 0 5px ${$store.state.theme.global.secondary_bg_color}`,
                  left:'89px',
                  border: `1px solid ${$store.state.theme.global.border_color}`,
                  background:'white'}"
                class="pad050 absolute dq-page-el-opt-bx-pu"
              >
                <div class="margin025 fullheight-percent">
                  <div class="fullheight-percent" :uid="`${el_i}--${el.uid}`" :data="el" :is="view"></div>
                </div>
              </div>
              <div style="bottom:-50px;color:white;" class="absolute">.</div>
            </div>
          </div>
          <!-- end of option box -->
        </div>
      </div>
      <strvw :data="el"></strvw>
    </div>
  </div>
</template>

<script>
import addChild from "../struct-view-el-opts/addChild";
import classList from "../struct-view-el-opts/classList";
import dddel from "../struct-view-el-opts/delete";
import dddesc from "../struct-view-el-opts/desc";
import properties from "../struct-view-el-opts/properties";
import ils from "../struct-view-el-opts/inlineStyle";

export default {
  props: ["data"],
  name: "strvw",
  data() {
    return {
      open: "",
      isOpen: false,
      opn_opts: [],
      mode: true,
      gg: [],
      view: undefined,
      active: undefined,
      cur_actv: undefined,
      rec: undefined,
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
    addChild,
    classList,
    dddel,
    dddesc,
    properties,
    ils
  },
  methods: {
    con(x, y) {
      // console.log(`${x} - ${y}`)
    },
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
        // console.log(`test ${y}`)

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
  left: 60px;
  z-index: 900;
  background: white;
  /* border: 1px solid rgba(128, 128, 128, 0.432); */
  min-width: 100px;
  border-radius: 2px;
  /* box-shadow: 0 0 5px rgba(128, 128, 128, 0.432); */
  top: -23px;
}
.dq-page-el-opt-bx-pu {
  z-index: 900;
}
</style>
