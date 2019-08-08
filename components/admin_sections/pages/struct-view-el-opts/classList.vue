<template>
  <div style="min-width:500px;">
    <main>
      {{cur_cl_list}}
      <div class="pad050">
        <span class="margin025">
          <strong>Class list</strong>
          {{uid}}
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
                <span class="padleft025">{{cls}}</span>
                <span @click="rem_cl(cls)">
                  <strong class="padright025">
                    <i class="fa fa-minus"></i>
                  </strong>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="padleft050 padright050 padbottom050 padtop025">
        <span class="margin025">
          <strong>Available Classes</strong>
        </span>
        <div
          :style="{border: `1px solid ${$store.state.theme.global.border_color}`, height:'250px'}"
          class="borderred flex"
        >
          <div class="flex1">
            <div
              :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
              class="pad025 padleft050"
            >CSS File</div>
            <div class="relative">
              <div class="absolute">
                <div
                  @click="sel_file(keys)"
                  class="padtop025 padleft025"
                  v-for="keys in Object.keys($store.state.pages.css_classes)"
                  :key="`qwehrk-${keys}`"
                >{{keys}}</div>
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
              <div class>Search classes on file:</div>
              <div class="padleft025 padright025 flex1 flexcenter">
                <input id="cl_srch" class="fullwidth flex" type="text" />
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
                    v-for="classes in Object.keys($store.state.pages.css_classes[cur_sel])"
                    :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
                    :key="`osw-${classes}`"
                  >
                    <span @click="sel_class(classes)">{{classes}}</span>
                    <span @click="addClass(classes)">
                      <strong>
                        <i class="padleft025 fas fa-plus"></i>
                      </strong>
                    </span>
                  </span>
                </div>
              </div>
              <div style="max-width:170px;" class="flex1 aut">
                <div v-if="!isEmpty($store.state.pages.css_classes[cur_sel])">
                  <pre>.{{cur_sel_cl}} {{$store.state.pages.css_classes[cur_sel][cur_sel_cl]}}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["uid", "addrs_finder", "travers_data"],
  data() {
    return {
      cur_sel: undefined,
      cur_sel_cl: undefined,
      cl_list: [],

      cur_trv_view: undefined
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
  border-radius: 2px;
}
</style>

