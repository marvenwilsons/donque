<template>
    <div>
        current live admins
    </div>
</template>

<script>
export default {
 beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      target: "Admin",
      title: "Current live admins",
      pane_width: "500px",
      maximizable: true
    });
  },
}
</script>

<style>

</style>
