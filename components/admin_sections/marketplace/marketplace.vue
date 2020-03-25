<template>
  <div>
      Marketplace
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Marketplace",
      pane_width: "500px"
    });
  }
};
</script>

<style>
</style>
