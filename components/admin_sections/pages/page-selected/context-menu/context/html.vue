<template>
  <div>
    <li
      @mouseover="opts_active = 'opts-opt-addelement'"
      @mouseleave="opts_cur_active != `opts-opt-addelement` && (opts_active = undefined)"
      @click="$store.commit('pages/set_api_view',{view: 'addChild'})"
      :style="setStyle(opts_active === `opts-opt-addelement` || opts_active == `opts-opt-addelement`)"
      class="pad025 flex pointer"
    >
      <div class="flex3">
        <!-- <i class="far fa-edit padleft125"></i> -->
      </div>
      <div class="flex7">Add Element(s)</div>
      <div class="flex4"></div>
    </li>
    <!-- Class -->
    <li
      @mouseover="opts_active = 'Class'"
      @mouseleave="opts_cur_active != `Class` && (opts_active = undefined)"
      :style="setStyle(opts_active === `Class` || opts_active == `Class`)"
      class="pad025 flex pointer"
    >
      <div class="flex3">
        <i class="fab fa-css3-alt padleft125"></i>
      </div>
      <div class="flex7">Class</div>
      <div class="flex4"></div>
    </li>
    <!-- Attributes -->
    <li
      @mouseover="opts_active = 'Attributes'"
      @mouseleave="opts_cur_active != `Attributes` && (opts_active = undefined)"
      :style="setStyle(opts_active === `Attributes` || opts_active == `Attributes`)"
      class="pad025 flex pointer"
    >
      <div class="flex3">
        <!-- <i class="far fa-edit padleft125"></i> -->
      </div>
      <div class="flex7">Attributes</div>
      <div class="flex4"></div>
    </li>
    <!-- Events -->
    <li
      @mouseover="opts_active = 'Events'"
      @mouseleave="opts_cur_active != `Events` && (opts_active = undefined)"
      :style="setStyle(opts_active === `Events` || opts_active == `Events`)"
      class="pad025 flex pointer"
    >
      <div class="flex3">
        <!-- <i class="far fa-edit padleft125"></i> -->
      </div>
      <div class="flex7">Events</div>
      <div class="flex4"></div>
    </li>
    <!-- Notes -->
    <li
      @mouseover="opts_active = 'addNote'"
      @mouseleave="opts_cur_active != `addNote` && (opts_active = undefined)"
      :style="setStyle(opts_active === `addNote` || opts_active == `addNote`)"
      class="pad025 flex pointer"
    >
      <div class="flex3">
        <!-- <i class="far fa-edit padleft125"></i> -->
      </div>
      <div class="flex7">Notes</div>
      <div class="flex4"></div>
    </li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opts_active: undefined,
      opts_cur_active: undefined
    };
  },
  methods: {
    setStyle(i) {
      if (i) {
        return {
          background: this.$store.state.theme.global.selection2.hover_bg_color,
          color: this.$store.state.theme.global.selection2.active_text_color,
          transition: "0.3s"
        };
      }
    }
  }
};
</script>