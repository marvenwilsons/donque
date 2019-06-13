<template>
  <div class>
    <div class="flex flexcol margin125">
      <div class="pad050">
        <strong>Administration</strong>
        <div>admin related settings, manages administrators to manage application resources</div>
      </div>
      <div
        v-for="(items,item_index) in admin_opts"
        class="pad050 pointer"
        :key="`admn_opts_${items}`"
        :id="`admn_opts_${items}`"
        :style="{background: active === `admn-${item_index}` || cur_actv == `admn-${item_index}` ? hoverBgColor : ''}"
        @click="cur_actv = `admn-${item_index}`"
        @mouseover="active = `admn-${item_index}`"
        @mouseleave="cur_actv != `admn-${item_index}` && (active = undefined)"
      >{{items}}</div>
    </div>

    <!-- teams -->
    <div class="flex flexcol margin125">
      <div class="pad050">
        <strong>Teams</strong>
        <div>Assign admins to teams, a way to categorize admins base on the bussiness role granted to them</div>
      </div>
      <div
        v-for="(items,item_index) in Teams"
        class="pad050 pointer"
        :key="`ad_opts_${items}`"
        :id="`ad_opts_${items}`"
        :style="{background: active === `teams-${item_index}` || cur_actv == `teams-${item_index}` ? hoverBgColor : ''}"
        @click="cur_actv = `teams-${item_index}`"
        @mouseover="active = `teams-${item_index}`"
        @mouseleave="cur_actv != `teams-${item_index}` && (active = undefined)"
      >{{items}}</div>
    </div>

    <!-- roles -->
    <div class="flex flexcol margin125">
      <div class="pad050">
        <strong>Roles</strong>
        <div>Assign admins to teams, a way to categorize admins base on the bussiness role granted to them</div>
      </div>
      <div
        v-for="(items,item_index) in Roles"
        class="pad050 pointer"
        :key="`ad_opts_${items}`"
        :id="`ad_opts_${items}`"
        :style="{background: active === `roles-${item_index}` || cur_actv == `roles-${item_index}` ? hoverBgColor : ''}"
        @click="cur_actv = `roles-${item_index}`"
        @mouseover="active = `roles-${item_index}`"
        @mouseleave="cur_actv != `roles-${item_index}` && (active = undefined)"
      >{{items}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cur_actv: undefined,
      active: undefined,
      hoverBgColor: this.$store.state.theme.notify_tile_body_bg_hover_color,
      admin_opts: [
        "Add new application admin",
        "Add new database admin",
        "Application admin list",
        "Database admin list",
        "Current live admins",
        "Current blocked admins",
        "Lost password request"
      ],
      Teams: ["Create new team", "Display all teams"],
      Roles: ["Create custom roles", "Display all roles"],

    };
  },
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      target: "Admin",
      title: "Administration",
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
