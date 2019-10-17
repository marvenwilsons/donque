<template>
  <div class="fullheight-percent">
    <div class="fullheight-percent">
        Dashboard widgets here!,
        Monitoring - page vist monitoring
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Dashboard",
      pane_Width:"100%"
    });
  }
};
</script>

<style>
</style>
