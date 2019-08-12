<template>
  <div class="fullwidth pad050 flex">
    <div
      :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
      class="marginbottom050 borderred flex flexcol fullwidth"
    >
      <div
        :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
        class="pad050 spacebetween flex st-viz-bnnr"
      >
        <strong>Class list</strong>
      </div>
      <div class="pad050 flex fullheight-percent">
        <main class="flex flexcol flex1">
          {{cur_cl_list}}
          <div class="pad050">
            <span class="margin025">
              <strong>Classes applied</strong>
            </span>
            <div
              :style="{border: `1px solid ${$store.state.theme.global.border_color}`, height:'150px'}"
              class="flex pad025 hdn"
            >
              <div class="relative fullwidth aut">
                <div class="absolute flex flexwrap aut">
                  <span
                    class="pad025 margin025 tc-pn"
                    :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
                    v-for="cls in cl_list"
                    :key="`oiq-${cls}`"
                  >
                    <small style="font-weight:600;">
                      <span class="padleft050">{{cls}}</span>

                      <span @click="rem_cl(cls)">
                        <span class="padright050 padleft025">
                          <i style="opacity:0.8" class="fas fa-times-circle"></i>
                        </span>
                      </span>
                    </small>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="padleft050 padright050 padbottom050 padtop025 flex flex1 flexcol">
            <span class="margin025">
              <strong>Available Classes</strong>
            </span>
            <div
              :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
              class="borderred flex1 flex"
            >
              <div class="flex1">
                <div
                  :style="{background:`${$store.state.theme.global.secondary_bg_color}`,padding:'4px'}"
                  class="padleft050"
                >
                  <small>
                    <strong>CSS File</strong>
                  </small>
                </div>
                <div class="relative">
                  <div class="absolute">
                    <div
                      @click="sel_file(keys)"
                      class="padtop025 padleft025"
                      v-for="keys in Object.keys($store.state.pages.css_classes)"
                      :key="`qwehrk-${keys}`"
                    >
                      <small>
                        <strong>{{keys}}</strong>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div
                :style="{borderLeft: `1px solid ${$store.state.theme.global.border_color}`}"
                class="flex3 flex flexcol hdn"
              >
                <div
                  :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
                  class="pad025 padleft050 flex"
                >
                  <div class="flex flexcenter">
                    <small>
                      <strong>Search classes on file:</strong>
                    </small>
                  </div>
                  <div class="padleft025 padright025 flex1 flexcenter">
                    <small>
                      <input
                        v-model="cur_search_value"
                        id="cl_srch"
                        class="fullwidth flex pad025"
                        type="text"
                        v-on:keyup.enter="submit_sel_cl"
                      />
                    </small>
                  </div>
                </div>
                <div class="relative flex1 flex">
                  <div
                    :style="{borderRight: `1px solid ${$store.state.theme.global.border_color}`}"
                    class="flex1 relative aut"
                  >
                    <div
                      class="flex flexwrap absolute pad025"
                      v-if="!isEmpty($store.state.pages.css_classes[cur_sel])"
                    >
                      <span
                        class="pad025 margin025 padleft050 padright050 tc-pn"
                        v-for="classes in (cur_search_result ? cur_search_result : Object.keys($store.state.pages.css_classes[cur_sel]))"
                        :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
                        :key="`osw-${classes}`"
                      >
                        <small>
                          <strong>
                            <span @click="sel_class(classes)">{{classes}}</span>
                          </strong>
                          <span @click="addClass(classes)">
                            <strong>
                              <i style="opacity:0.8" class="fas fa-plus-circle"></i>
                            </strong>
                          </span>
                        </small>
                      </span>
                    </div>
                  </div>
                  <div style="max-width:170px;" class="flex1 aut pad050">
                    <div v-if="!isEmpty($store.state.pages.css_classes[cur_sel])">
                      <small>
                        <pre>.{{cur_sel_cl}} {{$store.state.pages.css_classes[cur_sel][cur_sel_cl]}}</pre>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["uid", "addrs_finder"],
  data() {
    return {
      cur_sel: undefined,
      cur_sel_cl: undefined,
      cl_list: [],

      cur_trv_view: undefined,

      cur_search_value: undefined,
      cur_search_result: undefined
    };
  },
  computed: {
    cur_cl_list() {
      this.$store
        .dispatch("pages/addrs_teller", {
          uid: this.uid,
          target_prop: "classList"
        })
        .then(d => {
          this.cl_list = d;
        });
    },
    ...mapGetters({
      str_trvers_view_state: "pages/travers_view_state"
    })
  },
  watch: {
    str_trvers_view_state(o, n) {
      // a stages travers feature, where it syncs to the current travers pointer in stage array
      this.$store
        .dispatch("pages/addrs_teller", {
          uid: this.uid,
          target_prop: "classList",
          stage_pointer: this.$store.state.pages.cur_pointer
        })
        .then(addrs => {
          this.cl_list = addrs;
        });
    },
    cur_search_value(o, n) {
      // @note fix the bug invalid regular expression, type \ in the search box
      if (this.cur_search_value == "") {
        this.cur_search_value = undefined;
      } else {
        const arr = Object.keys(
          this.$store.state.pages.css_classes[this.cur_sel]
        );
        let cur_res = [];
        arr.map(cls => {
          if (cls.search(this.cur_search_value) == 0) {
            cur_res.push(cls);
          }
        });

        this.cur_search_result = cur_res;
      }
    }
  },
  methods: {
    sel_file(key) {
      this.cur_sel = key;
    },
    sel_class(cl) {
      this.cur_sel_cl = cl;
    },
    isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    },
    addClass(cl) {
      if (!this.cl_list.includes(cl)) {
        // this classlist push class
        this.cl_list.push(cl);

        // push new changes to stage
        this.$store.dispatch("pages/addrs_finder", {
          uid: this.uid,
          fn: locator => {
            this.$store.commit("pages/update_section", {
              desc: `Added new class to HTML element - addrs: ${locator.join(
                " > "
              )}`,
              locator,
              tag: null,
              target_prop: "classList",
              exec_on_prop: function(prop) {
                prop.push(cl);
              }
            });
          }
        });
      } else {
        // class is already in the classlist therefore it not goin to be added
        this.$store.commit("modal/set_modal", {
          head: "Alert",
          body: `${cl} class is already in the classlist`,
          config: {
            ui_type: "msg",
            closable: false
          }
        });
      }
    },
    rem_cl(cl) {
      //removes the selected class from the latest stage obj
      this.$store.dispatch("pages/addrs_finder", {
        uid: this.uid,
        fn: locator => {
          this.$store.commit("pages/update_section", {
            desc: `Removed a class in HTML element - addrs: ${locator.join(
              " > "
            )}`,
            locator,
            target_prop: "classList",
            exec_on_prop: function(prop) {
              prop.splice(prop.indexOf(cl), 1);
            }
          });
        }
      });
    },
    submit_sel_cl() {
      if (this.cur_search_result.length) {
        this.addClass(this.cur_search_result[0]);
      }
    }
  },
  mounted() {
    // focus on class search input box
    if (document.getElementById("cl_srch") != null) {
      document.getElementById("cl_srch").focus();
    }

    // populates the current class list
    this.$store
      .dispatch("pages/addrs_teller", {
        uid: this.uid,
        target_prop: "classList"
      })
      .then(addrs => {
        this.cl_list = addrs;
      });

    this.cur_sel = "dq-default.css";
  }
};
</script>

<style>
.hdn {
  overflow: hidden;
}
.aut {
  overflow: auto;
}
.tc-pn {
  border-radius: 15px;
}
</style>

