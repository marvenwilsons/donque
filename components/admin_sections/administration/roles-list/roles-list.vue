<template>
    <div>
        roles list
    </div>
</template>

<script>
export default {
 beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      target: "Admin",
      title: "List of all roless",
      pane_width: "500px",
      maximizable: true
    });
  },
}
</script>

<style>

</style>
