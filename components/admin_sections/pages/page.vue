<template>
  <div class="flex1">
    <div class="fullheight-percent">
      <div class="pad125">
        <div class="flex">
          <div class="flex1 padright025">search:</div>
          <div class="flex7">
            <input class="flex fullwidth" type="text">
          </div>
          <div class="flex1">
            <i class="fas fa-search padleft025 pointer"></i>
            <i class="fas fa-plus pointer"></i>
          </div>
        </div>
      </div>
      <div class="fullheight-percent relative" style="overflow:auto;">
        <div class="absolute fullwidth fullheight-percent">
          <div
            class="pointer margin050 pad050 flex"
            v-for="(page,p_index) in pages"
            :key="`dq-page-list-${p_index}-${page.name}`"
            :id="`dq-page-${p_index}`"
            :style="{background: active === `dq-page-${p_index}` || cur_actv == `dq-page-${p_index}` ? hoverBgColor : ''}"
            @mouseover="active = `dq-page-${p_index}`"
            @mouseleave="cur_actv != `dq-page-${p_index}` && (active = undefined)"
            @click="cur_actv = `dq-page-${p_index}`,$store.dispatch('pane_system/open',{name: 'pageSelected', index: my_pane_index, data: page, data_index: p_index})"
          >
            <div class="flex1">
              <div>
                <strong>{{page.name}}</strong>
              </div>
              <div>last-updated: MM/DD/YY</div>
            </div>
            <div class="flex flex1 flexend" style="align-items: center;">
              <!-- <i
                class="pad050 dq-page-item fas fa-edit"
                :id="`dq-page-i-${p_index}`"
                :style="{background: i_active === `dq-page-i-${p_index}` && cur_actv === `dq-page-${p_index}` ? heverBgColor2 : ''}"
                @mouseover="i_active = `dq-page-i-${p_index}`"
              ></i>
              <i
                class="pad050 dq-page-item fas fa-redo-alt"
                :id="`dq-page-ref-${p_index}`"
                :style="{background: i_active === `dq-page-ref-${p_index}` && cur_actv === `dq-page-${p_index}` ? heverBgColor2 : ''}"
                @mouseover="i_active = `dq-page-ref-${p_index}`"
              ></i> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["my_pane_index"],
  data() {
    return {
      cur_actv: undefined,
      i_active: undefined,
      active: undefined,
      hoverBgColor: this.$store.state.theme.notify_tile_body_bg_hover_color,
      heverBgColor2: this.$store.state.theme.heading_bg_color,
      pages: [
        { name: "home", lastModified: "" },
        { name: "products", lastModified: "" }
      ]
    };
  },
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Page list",
      pane_width: "350px"
    });
  }
};
</script>

<style>
.dq-page-item {
  border-radius: 100%;
}
</style>
