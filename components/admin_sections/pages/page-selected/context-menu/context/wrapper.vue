<template>
  <div>
    <!-- add section -->
    <li
      @mouseover="opts_active = 'addsection'"
      @mouseleave="opts_cur_active != `addsection` && (opts_active = undefined)"
      @click="openPageEditorModal()"
      :style="setStyle(opts_active === `addsection` || opts_active == `addsection` || $store.state.pages.api_view == 'addsection')"      
      class="pad025 flex pointer"
    >
      <div class="flex3">
        <i class="fas fa-layer-group padleft125"></i>
      </div>
      <div class="flex7">Add Section</div>
      <div class="flex4"></div>
    </li>
    <!-- models -->
    <li
      @mouseover="opts_active = 'models'"
      @mouseleave="opts_cur_active != `models` && (opts_active = undefined)"
      @click="setContextView('models')"
      :style="setStyle(opts_active === `models` || opts_active == `models` || $store.state.pages.api_view == 'models')"      
      class="pad025 flex pointer"
    >
      <div class="flex3">
        <i class="fas fa-clipboard-list padleft125"></i>
      </div>
      <div class="flex7">Models</div>
      <div class="flex4"></div>
    </li>
    <!-- Controllers -->
    <li
      @mouseover="opts_active = 'controllers'"
      @mouseleave="opts_cur_active != `controllers` && (opts_active = undefined)"
      @click="setContextView('controllers')"
      :style="setStyle(opts_active === `controllers` || opts_active == `controllers` || $store.state.pages.api_view == 'controllers')"      
      class="pad025 flex pointer"
    >
      <div class="flex3"></div>
      <div class="flex7">Controllers</div>
      <div class="flex4"></div>
    </li>
    <!-- Collections -->
    <li
      @mouseover="opts_active = 'collections'"
      @mouseleave="opts_cur_active != `collections` && (opts_active = undefined)"
      @click="setContextView('collections')"
      :style="setStyle(opts_active === `collections` || opts_active == `collections` || $store.state.pages.api_view == 'collections')"      
      class="pad025 flex pointer"
    >
      <div class="flex3"></div>
      <div class="flex7">Collections</div>
      <div class="flex4"></div>
    </li>
    <!-- Server load -->
    <li
      @mouseover="opts_active = 'serverload'"
      @mouseleave="opts_cur_active != `serverload` && (opts_active = undefined)"
      @click="setContextView('serverload')"
      :style="setStyle(opts_active === `serverload` || opts_active == `serverload` || $store.state.pages.api_view == 'serverload')"      
      class="pad025 flex pointer"
    >
      <div class="flex3"></div>
      <div class="flex7">On Server load</div>
      <div class="flex4"></div>
    </li>
    <!-- Cliebt load -->
    <li
      @mouseover="opts_active = 'clientload'"
      @mouseleave="opts_cur_active != `clientload` && (opts_active = undefined)"
      @click="setContextView('clientload')"
      :style="setStyle(opts_active === `clientload` || opts_active == `clientload` || $store.state.pages.api_view == 'clientload')"      
      class="pad025 flex pointer"
    >
      <div class="flex3"></div>
      <div class="flex7">On client load</div>
      <div class="flex4"></div>
    </li>
  </div>
</template>
<script>
export default {
  data: () => ({
    opts_active: undefined,
    opts_cur_active: undefined
  }),
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
    setContextView(vname) {
      this.$store.commit("pages/set_api_view", {
        view: vname
      });
    },
    openPageEditorModal() {
      this.$store.commit('pages/open_page_editor_modal')
    }
  }
};
</script>