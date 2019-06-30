<template>
  <div>
    <div>details here</div>
    {{data}}
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["data", "my_pane_index"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      data_list: "pane_system/data_list"
    })
  },
  mounted() {
    // for pane title refeclects the page user selected
    this.$store.commit("pane_system/alter_pane_config", {
      pane_index: this.my_pane_index,
      alter: {
        title: `${this.data} page`
      }
    });

    // call systemCall to fetch the data of the selected page
  },
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: " ",
      pane_width: "95%",
      renderOnce: true,
    });
  }
};
</script>

<style>
</style>
