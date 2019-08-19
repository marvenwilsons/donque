<template>
  <div>
    <!-- add element -->
    <li
      @mouseover="opts_active = 'opts-opt-addelement'"
      @mouseleave="opts_cur_active != `opts-opt-addelement` && (opts_active = undefined)"
      :style="setStyle(opts_active === `opts-opt-addelement` || opts_active == `opts-opt-addelement`)"
      class="pad025 flex pointer"
    >
      <div class="flex3">
        <!-- <i class="far fa-edit padleft125"></i> -->
      </div>
      <div class="flex7">Add Element(s)</div>
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
    <!-- Role -->
    <li
      @mouseover="opts_active = 'EditRole'"
      @mouseleave="opts_cur_active != `EditRole` && (opts_active = undefined)"
      :style="setStyle(opts_active === `EditRole` || opts_active == `EditRole`)"
      class="pad025 flex pointer"
    >
      <div class="flex3">
        <!-- <i class="far fa-edit padleft125"></i> -->
      </div>
      <div class="flex7">Edit Role</div>
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