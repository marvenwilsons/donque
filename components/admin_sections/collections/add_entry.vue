<template>
  <div>Add Entry
    <pre>{{this.data.schema}}</pre>
  </div>
</template>

<script>
export default {
  props: ['my_pane_index','data'],
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: null,
      pane_width: "800px",
      pane_head_bg_color: "rgb(48, 51, 64)",
      renderOnce: true,
      pane_head_title_color: "white"
    });
  },
  mounted() {
    this.$store.commit("pane_system/alter_pane_config", {
      pane_index: this.my_pane_index,
      alter: {
        title: `Add New ${this.data['Collection Name']}`
      }
    });
  }
};
</script>