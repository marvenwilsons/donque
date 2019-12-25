<template>
  <div>Office tools here</div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Office",
      pane_Width: "100%",
      closable: false
    });
  }
};
</script>