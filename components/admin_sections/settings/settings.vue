<template>
  <div class>
    <div class="flex flexcol margin125">
      <div class="pad050">
        <strong>Backend settings</strong>
        <!-- <div>admin related settings</div> -->
      </div>
      <div
        v-for="(items,item_index) in admin_opts"
        class="pad050 pointer"
        :key="`admn_opts_${items}`"
        :id="`admn_opts_${items}`"
        :style="{background: active === `admn-${item_index}` || cur_actv == `admn-${item_index}` ? hoverBgColor : ''}"
        @click="cur_actv = `admn-${item_index}`,$store.dispatch('pane_system/open',{name: items, index: my_pane_index})"
        @mouseover="active = `admn-${item_index}`"
        @mouseleave="cur_actv != `admn-${item_index}` && (active = undefined)"
      >{{items}}</div>
    </div>

    <!--  -->
    <div class="flex flexcol margin125">
      <div class="pad050">
        <strong>Website general settings</strong>
        <!-- <div>admin related settings</div> -->
      </div>
      <div
        v-for="(items,item_index) in Webs"
        class="pad050 pointer"
        :key="`admn_st1_${items}`"
        :id="`admn_st1_${items}`"
        :style="{background: active === `admn_st1-${item_index}` || cur_actv == `admn_st1-${item_index}` ? hoverBgColor : ''}"
        @click="cur_actv = `admn_st1-${item_index}`,$store.dispatch('pane_system/open',{name: items, index: my_pane_index})"
        @mouseover="active = `admn_st1-${item_index}`"
        @mouseleave="cur_actv != `admn_st1-${item_index}` && (active = undefined)"
      >{{items}}</div>
    </div>

    <!--  -->
    <div class="flex flexcol margin125">
      <div class="pad050">
        <strong>Application security</strong>
        <!-- <div>admin related settings</div> -->
      </div>
      <div
        v-for="(items,item_index) in Sec"
        class="pad050 pointer"
        :key="`admn_st2_${items}`"
        :id="`admn_st2_${items}`"
        :style="{background: active === `admn_st2_${item_index}` || cur_actv == `admn_st2_${item_index}` ? hoverBgColor : ''}"
        @click="cur_actv = `admn_st2_${item_index}`,$store.dispatch('pane_system/open',{name: items, index: my_pane_index})"
        @mouseover="active = `admn_st2_${item_index}`"
        @mouseleave="cur_actv != `admn_st2_${item_index}` && (active = undefined)"
      >{{items}}</div>
    </div>

    <!--  -->
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
      admin_opts: [
        "Appearance",
        "Dashboard settings",
        "Change admin access route",
      ],
      Webs: ["Universal font-size", "Favicon", "Site title"],
      Sec: ["HTTPS settings", "Perm Certifecates"],

    };
  },
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      target: "Admin",
      title: "Settings",
      pane_width: "300px",
      maximizable: false
    });
  },
  mounted() {
  }
};
</script>

<style>
</style>
