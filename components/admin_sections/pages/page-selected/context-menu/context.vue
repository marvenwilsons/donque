<template>
  <ul id="opt-box-ul" style="margin:0; height:0px; overflow:hidden;">
    <!-- open api -->
    <!-- <li
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
    </li>-->
    <!-- +++++++++++++++++++++++++++ CAN BE DIFFERENT ON OTHER TYPES OF ELEMENT +++++++++++++++++++++++++++++++ -->
    <div v-if="$store.state.pages.opt_cur_view === 'html'" :is="'cnhtml'"></div>
    <div v-if="$store.state.pages.opt_cur_view === 'section'" :is="'cnsection'"></div>
    <div v-if="$store.state.pages.opt_cur_view === 'plugin'" :is="'cnplugin'"></div>
    <div v-if="$store.state.pages.opt_cur_view === 'wrapper'" :is="'cnwrapper'"></div>
    <!-- ++++++++++++++++++++++++++++++++++++++ END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
    <!-- cut -->
    <li
      v-if="$store.state.pages.opt_cur_view != 'section' && $store.state.pages.opt_cur_view != 'wrapper'"
      @mouseover="opts_active = 'cut'"
      @mouseleave="opts_cur_active != `cut` && (opts_active = undefined)"
      @click="cut_copy_delete('cut')"
      :style="{...setStyle(opts_active === `cut` || opts_active == `cut`), color: element_view_is_open ? 'lightgray' : ''}"
      :class="['pad025', 'flex' , element_view_is_open ? 'notallowed' : 'pointer']"
    >
      <div class="flex3">
        <i class="fas fa-cut padleft125"></i>
      </div>
      <div class="flex7">Cut</div>
      <div class="flex4"></div>
    </li>
    <!-- copy -->
    <li
      v-if="$store.state.pages.opt_cur_view != 'section' && $store.state.pages.opt_cur_view != 'wrapper'"
      @mouseover="opts_active = 'copy'"
      @mouseleave="opts_cur_active != `copy` && (opts_active = undefined)"
      @click="cut_copy_delete('copy')"
      :style="{...setStyle(opts_active === `copy` || opts_active == `copy`), color: element_view_is_open ? 'lightgray' : ''}"
      :class="['pad025', 'flex' , element_view_is_open ? 'notallowed' : 'pointer']"
    >
      <div class="flex3">
        <i class="far fa-copy padleft125"></i>
      </div>
      <div class="flex7">Copy</div>
      <div class="flex4"></div>
    </li>
    <!-- paste -->
    <li
      v-if="$store.state.pages.pending_data_to_paste"
      @mouseover="opts_active = 'paste'"
      @mouseleave="opts_cur_active != `paste` && (opts_active = undefined)"
      @click="cut_copy_delete('paste')"
      :style="{...setStyle(opts_active === `paste` || opts_active == `paste`), color: element_view_is_open ? 'lightgray' : ''}"
      :class="['pad025', 'flex' , element_view_is_open ? 'notallowed' : 'pointer']"
    >
      <div class="flex3">
        <!-- <i class="far fa-copy padleft125"></i> -->
      </div>
      <div class="flex7">Paste</div>
      <div class="flex4"></div>
    </li>
    <!-- delete -->
    <!-- {{latest_root.length != 1 && latest_root.length != 0}} -->
    <!-- {{  latest_root.length != 1 && $store.state.pages.opt_cur_view == 'section'}} -->
    <!-- latest_root.length == 1 && $store.state.pages.opt_cur_view == 'html' : false -->
    <li
      v-if="
        $store.state.pages.opt_cur_view != 'wrapper' && 
        latest_root.length != 1 && 
        $store.state.pages.opt_cur_view == 'section' || 
        $store.state.pages.opt_cur_view == 'html'
        "
      @mouseover="opts_active = 'del'"
      @mouseleave="opts_cur_active != `del` && (opts_active = undefined)"
      :style="{...setStyle(opts_active === `del` || opts_active == `del`), color: element_view_is_open ? 'lightgray' : ''}"
      @click="cut_copy_delete('delete')"
      :class="['pad025', 'flex' , element_view_is_open ? 'notallowed' : 'pointer']"
    >
      <div class="flex3">
        <i class="far fa-trash-alt padleft125"></i>
      </div>
      <div class="flex7">Delete</div>
      <div class="flex4"></div>
    </li>
  </ul>
</template>

<script>
import context_html from "./context/html";
import context_section from "./context/section";
import context_plugin from "./context/plugin";
import context_wrapper from "./context/wrapper";

export default {
  data() {
    return {
      opts_active: undefined,
      opts_cur_active: undefined
    };
  },
  components: {
    cnhtml: context_html,
    cnsection: context_section,
    cnplugin: context_plugin,
    cnwrapper: context_wrapper
  },
  computed: {
    latest_root() {
      if (this.$store.state.pages.stages.length == 0) {
        return this.$store.state.pages.root.sections;
      } else {
        return this.$store.state.pages.stages[
          this.$store.state.pages.stages.length - 1
        ].obj.sections;
      }
    },
    element_view_is_open() {
      if (this.$store.state.pages.api_view) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    setStyle(i) {
      if (i) {
        if (this.element_view_is_open) {
          return {
            color: this.$store.state.theme.global.selection2.active_text_color,
            transition: "0.3s"
          };
        } else {
          return {
            background: this.$store.state.theme.global.selection2
              .hover_bg_color,
            color: this.$store.state.theme.global.selection2.active_text_color,
            transition: "0.3s"
          };
        }
      }
    },
    cut() {
      // 1. finding the selected element
      // get the uid, then use the addrs_finder to get the object being selected
      // save the object selected in pages store states named pending_data_to_paste
      // 2. deleting the element
      // get the parent of the selected element
      // empty the els property of that parent element by mutating the els property to
      // an empty object.
      this.$store.commit("pages/set_copy", this.$store.state.pages.api_view_el);
      this.delete();
    },
    copy() {
      // 1. finding the selected element
      // get the uid, then use the addrs_finder to get the object being selected
      // save the object selected in pages store states named pending_data_to_paste

      // copy because vuex wont let me mutate its state outside of its scope
      const copy = o => {
        if (o === null) return null;

        var output, v, key;
        output = Array.isArray(o) ? [] : {};
        for (key in o) {
          v = o[key];
          output[key] = typeof v === "object" ? copy(v) : v;
        }

        return output;
      };

      const api_v_copy = copy(this.$store.state.pages.api_view_el);

      const mutate_uid = o => {
        if (o === null) return null;

        var output, v, key;
        output = Array.isArray(o) ? [] : {};
        for (key in o) {
          o.uid = (length => {
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
          })(20);

          v = o[key];
          output[key] = typeof v === "object" ? mutate_uid(v) : v;
        }

        return output;
      };

      const customCopy = mutate_uid(api_v_copy);
      this.$store.commit("pages/set_copy", customCopy);
    },
    paste() {
      // 1. get the object saved in pages store states named pending_data_to_paste
      // 2. using the addrs_finder and uid, find then mutate the els property of the selected
      // element, mutate the els property into the value found in pending_data_to_paste

      this.$store.dispatch("pages/addrs_finder_mutator", {
        uid: `${this.$store.state.pages.api_view_el.index}--${this.$store.state.pages.api_view_el.uid}`,
        fn: locator => {
          this.$store.commit("pages/update_section", {
            desc: `paste element - addrs: ${locator.join(" > ")}`,
            locator: locator,
            scoped_variable: this.$store.state.pages.pending_data_to_paste,
            exec_on_prop: function(prop, tag, scoped_variable, obj) {
              obj.els.push(scoped_variable);
            }
          });
        }
      });

      this.$store.commit("pages/clear_copy_state");
    },
    delete() {
      // 1. using the addrs_finder and uid, find then mutate the els property of the selected
      // element, mutate the els property into empty object
      let element_type = undefined;

      Object.keys(this.$store.state.pages.api_view_el).length == 4 ||
        Object.keys(this.$store.state.pages.api_view_el).length == 6;
      this.$store.state.pages.api_view_el.role != undefined
        ? (element_type = "section")
        : (element_type = "html/plugin");

      if (element_type == "section") {
        // splice section
        this.$store.commit("pages/update_section_delete_section", {
          index: this.$store.state.pages.api_view_el.index,
          root: this.latest_root
        });
      } else if (element_type == "html/plugin") {
        // find and splice
        this.$store.dispatch("pages/addrs_finder_mutator", {
          uid: `${this.$store.state.pages.api_view_el.index}--${this.$store.state.pages.api_view_el.uid}`,
          fn: locator => {
            // pop the last item so that I can move backward target the parent
            // and then locate the selected to delete element using index
            locator.pop();

            this.$store.commit("pages/update_section", {
              desc: `remove element - addrs: ${locator.join(" > ")}`,
              locator: locator,
              scoped_variable: this.$store.state.pages.api_view_el.index,
              exec_on_prop: function(prop, tag, scoped_variable, obj) {
                obj.splice(scoped_variable, 1);
              }
            });
          }
        });
      } else if (element_type == undefined) {
        // if the structure of the element is changed manually in the source code.
        this.$store.commit("modal/set_modal", {
          head: "Fatal System Error",
          body:
            "Fatal System Error! un recognized element type after performing 'before delete' hook. ",
          config: {
            ui_type: "err",
            closable: false
          }
        });
      }
    },
    cut_copy_delete(arg) {
      if (!this.element_view_is_open) {
        if (this.$store.state.pages.api_view) {
          this.$store.commit("pages/close_api_view");
          this.$store.commit("pages/clear_opts");
          this[arg]();
        } else {
          this.$store.commit("pages/clear_opts");
          this[arg]();
        }
      }
    }
  }
};
</script>