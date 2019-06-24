<template>
  <div class="flex1">
    <div class="fullheight-percent">
      <div class="pad125">
        <div class="flex">
          <div class="flex1 padright025">search:</div>
          <div class="flex7">
            <input class="flex fullwidth" type="text">
          </div>
          <div class="flex1">
            <i class="fas fa-search padleft025 pointer"></i>
            <i class="fas fa-plus pointer"></i>
          </div>
        </div>
      </div>
      <div class="fullheight-percent relative" style="overflow:auto;">
        <div class="absolute fullwidth fullheight-percent">
          <div
            class="pointer margin050 pad050 flex dq-page-item-host"
            v-for="(page,p_index) in pages"
            :key="`dq-page-list-${p_index}-${page.name}`"
            :id="`dq-page-${p_index}`"
            :style="setStyle( active === `dq-page-${p_index}` || cur_actv == `dq-page-${p_index}`)"
            @mouseover="active = `dq-page-${p_index}`"
            @mouseleave="cur_actv != `dq-page-${p_index}` && (active = undefined)"
          >
            <div class="flex1">
              <div>
                <strong>{{page.name}}</strong>
              </div>
              <small class="flex spacebetween">
                <span class="padright125">last-updated: MM/DD/YY</span> |
                <span class="underlinehover flex flex1 flexcenter">sub pages - 8</span> |
                <span
                  @click="cur_actv = `dq-page-${p_index}`,$store.dispatch('pane_system/open',{name: 'pageSelected', index: my_pane_index, data: page, data_index: p_index})"
                  :class="[cur_actv == `dq-page-${p_index}` && 'underline' , 'underlinehover', 'flex' ,'flex1' ,'flexcenter']"
                >edit</span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["my_pane_index"],
  data() {
    return {
      cur_actv: undefined,
      i_active: undefined,
      active: undefined,
      hoverBgColor: this.$store.state.theme.notify_tile_body_bg_hover_color,
      heverBgColor2: this.$store.state.theme.heading_bg_color,
      pages: [
        { name: "home", lastModified: "" },
        { name: "products", lastModified: "" },
        { name: "services", lastModified: "" },
        { name: "team", lastModified: "" },
      ]
    };
  },
  methods: {
    setStyle(c) {
      if (c) {
        return {
          background: this.$store.state.theme.notify_tile_body_bg_hover_color,
          borderLeft: `2px solid ${this.$store.state.theme.heading_bg_color}`,
          border: "2px solid whitesmoke"
        };
      } else {
        return {
          background: this.$store.state.theme.notify_tile_body_bg_color,
          border: "2px solid whitesmoke"
        };
      }
    }
  },
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Page list",
      pane_width: "350px"
    });
  },
  mounted(){
    this.$store.dispatch("theme/set_class_css_defaults", {
      class: ["dq-page-item-host"],
      css_keys: ["transition"],
      css_values: ["0.2s"]
    });
  }
};
</script>

<style>
.dq-page-item {
  border-radius: 100%;
}
.underlinehover:hover {
  text-decoration: underline;
}
.underline{
  text-decoration: underline;
}
</style>
