<template>
  <div>
    files
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