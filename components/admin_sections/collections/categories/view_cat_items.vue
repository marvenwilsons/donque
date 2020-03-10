<template>
  <div class="fullheight-percent">Tablefy here
      {{data}}
  </div>
</template>

<script>
export default {
  props: ["data",'my_pane_index'],
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Category Items",
      pane_width: "80%",
      pane_head_bg_color: "rgb(48, 51, 64)",
      renderOnce: true,
      pane_head_title_color: "white"
    });
  },
  mounted() {
    this.$store.commit("pane_system/alter_pane_config", {
      pane_index: this.my_pane_index,
      alter: {
        title: `Entries in ${this.data['Category Name']} Category`
      }
    });
  }
};
</script>