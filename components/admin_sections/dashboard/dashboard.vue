<template>
  <div class="fullheight-percent">
    <div class="fullheight-percent">
      Dashboard widgets here!,
      Monitoring - page vist monitoring
    </div>
    </div>


  </div>
</template>

<script>
import my_mixin from "@/components/mixin.js";

export default {
  props: ["my_pane_index"],
  mixins: [my_mixin],
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Dashboard",
      pane_Width: "100%",
      closable: false
    });
  },
  mounted() {
    const ModalComponent = () => import("./modal");
    this.$emit("SetPaneModal", {
      pane_index: this.my_pane_index,
      pane_name: "Dashboard",
      component: ModalComponent
    });
  },
  beforeDestroy() {
    this.$emit("UnSetPaneModal");
  }
};
</script>

<style>
</style>
