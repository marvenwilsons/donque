<template>
    <div>
        Add new databse admin here
    </div>
</template>

<script>
export default {
    beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      target: "Admin",
      title: "Add new database admin",
      pane_width: "500px",
      maximizable: true
    });
  },
}
</script>

<style>

</style>
