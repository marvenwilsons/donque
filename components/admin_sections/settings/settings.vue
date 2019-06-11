<template>
  <div>
    view live site
    settings,
    admin,
    users,
    documentation,
    dq appearance
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Settings",
      pane_width: "500px"
    });
  }
};
</script>

<style>
</style>

