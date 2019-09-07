<template>
  <div class="margin050">
    <!-- this is components, <br>
        page components <br>
        globals > color pallete, custom data, <br>
        404 page, <br>
    navigation-->

    <div class="pad050">
      <div
        v-for="(items,item_index) in opts"
        class="pad050 pointer"
        :key="`admn_opts_${items}`"
        :id="`admn_opts_${items}`"
        :style="{background: active === `admn-${item_index}` || cur_actv == `admn-${item_index}` ? hoverBgColor : ''}"
        @click="cur_actv = `admn-${item_index}`,$store.dispatch('pane_system/open',{name: items, index: my_pane_index})"
        @mouseover="active = `admn-${item_index}`"
        @mouseleave="cur_actv != `admn-${item_index}` && (active = undefined)"
      >{{items}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["my_pane_index"],
  data() {
    return {
      cur_actv: undefined,
      active: undefined,
      hoverBgColor: this.$store.state.theme.notify_tile_body_bg_hover_color,
      opts: ["Page Components", "Globals", "Navigation", "404 Page"]
    };
  },
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Components",
      pane_width: "300px"
    });
  }
};
</script>

<style>
</style>
