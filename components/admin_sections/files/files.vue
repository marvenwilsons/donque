<template>
  <div>
    <div class="margin125 borderred">1</div>
    <div class="margin125 borderred">2</div>
    <div class="margin125 borderred">3</div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Files",
      pane_width: "90%"
    });
  },
};
</script>