<template>
  <div class="fullheight-percent">
    <fileExplorer @SetPaneModal="SetPaneModal" />
  </div>
</template>

<script>
import fileExplorer from "./fileExplorer";

export default {
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Files",
      pane_width: "95%",
      pane_head_bg_color: "rgb(48, 51, 64)",
      pane_head_title_color: "white"
    });
  },

  components: {
    fileExplorer
  },

  data: () => ({}),

  methods: {
    SetPaneModal(val) {
      this.$emit('SetPaneModal',val)
    },
  }
};
</script>