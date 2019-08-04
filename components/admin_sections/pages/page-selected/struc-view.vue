<template>
  <div>
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
          @click="openOpt(el.uid,mode, 1)"
        >
          <div class="flex spacebetween flexcenter">
            <span class="padleft025">{{trimTitle(el.tag)}}</span>
            <i class="fas fa-caret-right padright025"></i>
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
                  <div
                    class="fullheight-percent"
                    :addrs_finder="addrs_finder"
                    :uid="`${el_i}--${el.uid}`"
                    :data="el"
                    :is="view"
                  ></div>
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
  min-width: 100px;
  border-radius: 2px;
  top: -23px;
}
.dq-page-el-opt-bx-pu {
  z-index: 900;
}
</style>
