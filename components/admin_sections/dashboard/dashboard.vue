<template>
  <div class="fullheight-percent">
    <div class="borderred fullheight-percent">
        Dashboard widgets here!
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      head_visibility: false,
      title: "Dashboard",
      pane_Width:"100%"
    });
  }
};
</script>

<style>
</style>
