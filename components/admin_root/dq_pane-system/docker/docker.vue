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
          @click="$store.dispatch('pane_system/start',items), cur_actv = item_index"
          :style="{
              background: active === item_index || cur_actv == item_index ? hoverBgColor : '', 
              color: active == item_index || cur_actv == item_index ? hoverColor : '' 
            }"
          @mouseover="activate(item_index)"
          @mouseleave="(cur_actv != item_index && (active = undefined))"
        >
          <strong :id="`dqdi_title_${item_index}_${items}`">{{items}}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cur_actv: undefined,
      active: undefined,
      hoverBgColor: this.$store.state.theme.docker_hover_menu_item_bg_color,
      hoverColor: this.$store.state.theme.docker_hover_text_color
    };
  },
  methods: {
    activate(arg) {
      this.active = arg;
    }
  },
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

    this.cur_actv = 0;

    // setting css defaults to a specific class
    this.$store.dispatch("theme/set_class_css_defaults", {
      class: ["dq-docker-items"],
      css_keys: ["transition"],
      css_values: ["0.3s"]
    });

    // setting default active menu
    // ids: ["dqdi_0_Dashboard","dqdi_title_0_Dashboard"]
  }
};
</script>


<style>
</style>