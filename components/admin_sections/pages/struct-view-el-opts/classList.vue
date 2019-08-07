<template>
  <div style="min-width:500px;">
    <main>
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
export default {
  props: ["uid", "addrs_finder"],
  data() {
    return {
      cur_sel: undefined,
      cur_sel_cl: undefined,
      cl_list: []
    };
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
      //@note to be finish, add fucos to class search box, and auto complete feature

      if (!this.cl_list.includes(cl)) {
        this.cl_list.push(cl);

        this.addrs_finder({el: null, uid: this.uid}, locator => {
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
        });
      } else {
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
      this.cl_list.splice(this.cl_list.indexOf(cl), 1);
    }
  },
  mounted() {
    // focus on class search input box
    document.getElementById("cl_srch").focus()

    // @note on load construct a id, get the classlist, push to cl_list 
    // console.log(document.getElementById(this.uid))
    console.log('test')
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

