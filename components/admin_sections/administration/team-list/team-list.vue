<template>
    <div>
        team list
    </div>
</template>

<script>
export default {
 beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      target: "Admin",
      title: "Team list",
      pane_width: "500px",
      maximizable: true
    });
  },
}
</script>

<style>

</style>
