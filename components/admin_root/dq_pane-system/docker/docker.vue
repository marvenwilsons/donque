<template>
  <div class="fullheight-percent flex flexcol" style="border-right: 2px solid whitesmoke">
    <div class="flex1">avatar here</div>
    <div role="container" class="flex3">
      <div role="docker-host" class="fullheight-percent">
        <div
          class="pad050 pointer padright125 dq-docker-items"
          v-for="(items,item_index) in menu_items"
          :key="`docker-item-${item_index}`"
          :id="`dqdi_${item_index}_${items}`"
          @click="$store.dispatch('pane_system/start',items), $store.dispatch('theme/toggle_active', {
            ids: [`dqdi_${item_index}_${items}`, `dqdi_title_${item_index}_${items}`],
            css_keys: ['background','color'],
            css_value_on: ['docker_hover_menu_item_bg_color','docker_hover_text_color'],
            css_value_off: ['docker_bg_color', 'docker_text_color']
          })"
          @mouseover="$store.dispatch('theme/mouseover',{
            ids: [`dqdi_${item_index}_${items}`, `dqdi_title_${item_index}_${items}`],
            css_keys: ['background','color'],
            css_values: ['docker_hover_menu_item_bg_color','docker_hover_text_color']
          })"
          @mouseleave="$store.dispatch('theme/mouseleave',{
            ids: [`dqdi_${item_index}_${items}`, `dqdi_title_${item_index}_${items}`],
            css_keys: ['background','color'],
            css_values: ['docker_bg_color', 'docker_text_color']
          })"
        >
          <strong :id="`dqdi_title_${item_index}_${items}`">{{items}}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    menu_items() {
      return (
        this.$store.state.dashboard_data.resources &&
        Object.keys(this.$store.state.dashboard_data.resources)
      );
    }
  },
  mounted() {
    this.$store.dispatch("pane_system/init_pane");

    // setting css defaults to a specific class
    this.$store.dispatch("theme/set_class_css_defaults", {
      class: ["dq-docker-items"],
      css_keys: ["transition"],
      css_values: ["0.3s"]
    });

    // setting default active menu
    // ids: ["dqdi_0_Dashboard","dqdi_title_0_Dashboard"]
    this.$store.dispatch("theme/set_active", {
      ids: ["dqdi_0_Dashboard","dqdi_title_0_Dashboard"],
      css_keys: ["background", "color"],
      css_value_on: [
        "docker_hover_menu_item_bg_color",
        "docker_hover_text_color"
      ],
      css_value_off: ["docker_bg_color", "docker_text_color"]
    });
  }
};
</script>


<style>
.active {
  background: red;
}
</style>