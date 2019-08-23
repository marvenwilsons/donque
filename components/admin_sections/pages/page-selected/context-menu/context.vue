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
    <!-- ++++++++++++++++++++++++++++++++++++++ END +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
    <!-- cut -->
    <li
      @mouseover="opts_active = 'cut'"
      @mouseleave="opts_cur_active != `cut` && (opts_active = undefined)"
      @click="cut_copy_delete('cut')"
      :style="setStyle(opts_active === `cut` || opts_active == `cut`)"
      class="pad025 flex pointer"
    >
      <div class="flex3">
        <i class="fas fa-cut padleft125"></i>
      </div>
      <div class="flex7">Cut</div>
      <div class="flex4"></div>
    </li>
    <!-- copy -->
    <li
      @mouseover="opts_active = 'copy'"
      @mouseleave="opts_cur_active != `copy` && (opts_active = undefined)"
      @click="cut_copy_delete('copy')"
      :style="setStyle(opts_active === `copy` || opts_active == `copy`)"
      class="pad025 flex pointer"
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
      :style="setStyle(opts_active === `paste` || opts_active == `paste`)"
      class="pad025 flex pointer"
    >
      <div class="flex3">
        <!-- <i class="far fa-copy padleft125"></i> -->
      </div>
      <div class="flex7">Paste</div>
      <div class="flex4"></div>
    </li>
    <!-- delete -->
    <li
      @mouseover="opts_active = 'del'"
      @mouseleave="opts_cur_active != `del` && (opts_active = undefined)"
      :style="setStyle(opts_active === `del` || opts_active == `del`)"
      @click="cut_copy_delete('delete')"
      class="pad025 flex pointer"
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
    cnplugin: context_plugin
  },
  methods: {
    setStyle(i) {
      if (i) {
        return {
          background: this.$store.state.theme.global.selection2.hover_bg_color,
          color: this.$store.state.theme.global.selection2.active_text_color,
          transition: "0.3s"
        };
      }
    },
    cut(){
      // 1. finding the selected element
      // get the uid, then use the addrs_finder to get the object being selected
      // save the object selected in pages store states named pending_data_to_paste

      // 2. deleting the element
      // get the parent of the selected element
      // empty the els property of that parent element by mutating the els property to
      // an empty object.
    },
    copy(){
      // 1. finding the selected element
      // get the uid, then use the addrs_finder to get the object being selected
      // save the object selected in pages store states named pending_data_to_paste

    },
    paste(){
      // 1. get the object saved in pages store states named pending_data_to_paste
      
      // 2. using the addrs_finder and uid, find then mutate the els property of the selected
      // element, mutate the els property into the value found in pending_data_to_paste

      // 3. muatate pending_data_to_paste into undefined
    },
    delete(){
      // 1. using the addrs_finder and uid, find then mutate the els property of the selected
      // element, mutate the els property into empty object 
    },
    cut_copy_delete(arg) {
      if (this.$store.state.pages.api_view) {
        this.$store.commit("pages/close_api_view");
        this.$store.commit("pages/clear_opts");
        this[arg]()
      } else {
        this.$store.commit("pages/clear_opts");
        this[arg]()
      }
    }
  }
};
</script>