<template>
  <div>
    <!-- add section -->
    <li
      @mouseover="opts_active = 'addsection'"
      @mouseleave="opts_cur_active != `addsection` && (opts_active = undefined)"
      @click="openPageEditorModal()"
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
    setStyle() {},
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