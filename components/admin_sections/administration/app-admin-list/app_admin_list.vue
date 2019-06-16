<template>
    <div>
        app admin list here
    </div>
</template>

<script>
export default {
 beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      target: "Admin",
      title: "Application admin list",
      pane_width: "500px",
      maximizable: true
    });
  },
}
</script>

<style>

</style>
