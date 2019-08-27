<template>
  <div>
    <!-- add element -->
    <li
      @mouseover="opts_active = 'opts-opt-addelement'"
      @mouseleave="opts_cur_active != `opts-opt-addelement` && (opts_active = undefined)"
      @click="setContextView('addChild')"
      :style="setStyle(opts_active === `opts-opt-addelement` || opts_active == `opts-opt-addelement` || $store.state.pages.api_view == 'addChild')"
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
      @click="$store.commit('pages/set_api_view',{view: 'addNote'})"
      :style="setStyle(opts_active === `addNote` || opts_active == `addNote` || $store.state.pages.api_view == 'addNote')"
      class="pad025 flex pointer"
    >
      <div class="flex3">
        <!-- <i class="far fa-edit padleft125"></i> -->
      </div>
      <div class="flex7">Add Notes</div>
      <div class="flex4"></div>
    </li>
    <!-- Role -->
    <li
      @mouseover="opts_active = 'EditRole'"
      @mouseleave="opts_cur_active != `EditRole` && (opts_active = undefined)"
      @click="$store.commit('pages/set_api_view',{view: 'editRole'})"
      :style="setStyle(opts_active === `EditRole` || opts_active == `EditRole`)"
      class="pad025 flex pointer"
    >
      <div class="flex3">
        <!-- <i class="far fa-edit padleft125"></i> -->
      </div>
      <div class="flex7">Edit Role</div>
      <div class="flex4"></div>
    </li>
    <!-- Move up -->
    <li
      @mouseover="opts_active = 'moveUp'"
      @mouseleave="opts_cur_active != `moveUp` && (opts_active = undefined)"
      @click="moveUp"
      :style="setStyle(opts_active === `moveUp` || opts_active == `moveUp`)"
      class="pad025 flex pointer"
    >
      <div class="flex3">
        <i class="fas fa-long-arrow-alt-up padleft125"></i>
      </div>
      <div class="flex7">Move up</div>
      <div class="flex4"></div>
    </li>
    <!-- Move down -->
    <li
      @mouseover="opts_active = 'moveDown'"
      @mouseleave="opts_cur_active != `moveDown` && (opts_active = undefined)"
      @click="moveDown"
      :style="setStyle(opts_active === `moveDown` || opts_active == `moveDown`)"
      class="pad025 flex pointer"
    >
      <div class="flex3">
        <i class="fas fa-long-arrow-alt-down padleft125"></i>
      </div>
      <div class="flex7">Move down</div>
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
  props: ['data'],
  methods: {
    setContextView(vname) {
        this.$store.commit('pages/set_api_view',{
            view: vname
        })
    },
    setStyle(i) {
      if (i) {
        return {
          background: this.$store.state.theme.global.selection2.hover_bg_color,
          color: this.$store.state.theme.global.selection2.active_text_color,
          transition: "0.3s"
        };
      }
    },
    moveUp(){

    },
    moveDown(){

    }
  }
};
</script>