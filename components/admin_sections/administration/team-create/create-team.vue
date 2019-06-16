<template>
    <div>
        create team
    </div>
</template>

<script>
export default {
 beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      target: "Admin",
      title: "Create new team",
      pane_width: "500px",
      maximizable: true
    });
  },
}
</script>

<style>

</style>
