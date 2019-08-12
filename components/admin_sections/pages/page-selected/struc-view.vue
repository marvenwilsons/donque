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
          :style="{background:$store.state.theme.global.secondary_bg_color}"
          @click="openOpt({uid: el.uid, index: el_i, el})"
        >
          <!-- add travers event origin highlight element feature -->
          <div class="flex spacebetween flexcol flexwrap">
            <div class="flex1 flex flexcenter spacebetween">
              <div class="padleft025">{{trimTitle(el.tag)}}</div>
              <i class="fas fa-caret-right padright025"></i>
            </div>
          </div>
          <!-- option box -->
          <div
            @click="openOpt({uid: el.uid, index: el_i, el})"
            v-if="$store.state.pages.opn_opts[0] == el.uid"
            class="flex padleft125 relative"
          >
            <div
              :style="{
                  boxShadow:`0 0 5px ${$store.state.theme.global.secondary_bg_color}`,
                  border: `1px solid ${$store.state.theme.global.border_color}`
                  }"
              class="dq-page-el-opt-bx absolute flex relative"
            >
              <div class="pad050 flex flexcol fullwidth">
                <!-- option items or the api window of the element -->
                <span>
                  <div
                    @mouseover="active = `optlpp-html${d.text}`"
                    @mouseleave="cur_actv != `optlpp-html${d.text}` && (active = undefined)"
                    :style="setStyle(active === `optlpp-html${d.text}` || cur_actv == `optlpp-html${d.text}`)"
                    @click="set_view({view: d.view, uid: `${el_i}--${el.uid}`, el}),  cur_actv = `optlpp-html${d.text}`"
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
              <!-- <div
                v-if="view"
                :style="{
                  boxShadow:`0 0 5px ${$store.state.theme.global.secondary_bg_color}`,
                  left:'89px',
                  border: `1px solid ${$store.state.theme.global.border_color}`,
                  background:'white'}"
                class="pad050 absolute dq-page-el-opt-bx-pu"
              >
                <div class="margin025 fullheight-percent">
                  <div
                    class="fullheight-percent"
                    :uid="`${el_i}--${el.uid}`"
                    :data="el"
                    :is="view"
                  ></div>
                </div>
              </div>-->
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
      } else {
      }
    },
    openOpt({ uid, index, el }) {
      // User interaction cases
      // case 1: just loaded, no open options yet. then selected one > open option
      // case 2: an option is open, user click the option twice > close option > clear all array back to case 1
      // case 3: an option is open, user click other element while that other option is open > close the prev option >
      // open the newly selected option
      let cur_case = undefined;

      // States of application
      // state 1: true, open, populating open options
      // state 2: true, open, splicing or closing prev options
      // state 1: false, close, clearing open options

      this.$store.commit("pages/set_opts", uid);
      let temp = [];
      this.$store.state.pages.opn_opts.map(ids => {
        if (ids.search(uid) == 0) {
          temp.push(uid);
        }
      });

      if (temp.length == 2) {
        cur_case = 2;
      } else if (temp.length == 1) {
        cur_case = 1;
      }

      // console.log(temp);

      switch (cur_case) {
        case 1:
          // push and clear opn_ops array
          this.$store.commit("pages/clear_opts");
          this.$store.commit("pages/set_opts", uid);
          break;
        case 2:
          this.$store.commit("pages/clear_opts");
          temp = [];
          break;
      }

      // for case 2
      // triggers when the user clicks another element while not closing the first selected element,
      // it will open a new option box with the same selected option, it will close the prev option box
      if (this.$store.state.pages.case2 && cur_case == 1) {
        console.log('case 2')
        console.log(this.$store.state.pages.case2)
        this.$store.commit("pages/set_api_view", {
          view: this.$store.state.pages.api_view_que.view,
          uid: `${index}--${uid}`,
          el
        });
      }

      if (cur_case == 2 && this.$store.state.pages.case2) {
        console.log('total reset!')
        this.$store.commit("pages/opts_total_reset");
        cur_case = undefined
      } 
    },
    set_view({ view, uid, el }) {
      this.$store.commit("pages/set_api_view", { view, uid, el });
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
  left: 65px;
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
