<template>
  <div>
    <!-- {{$store.state.pages.root.sections.length}} -->
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
      @click="api_v.index != 0 && moveUp(api_v.index)"
      :style="{
        ...setStyle(opts_active === `moveUp` && 
        api_v.index != 0 || 
        opts_active == `moveUp` 
        && api_v.index != 0), 
        color: api_v && api_v.index != 0 ? '' : 'lightgray' }"
      :class="[api_v && api_v.index != 0 ? 'pointer' : '', 'pad025' ,'flex']"
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
      @click="api_v.index != stage_len - 1 && moveDown(api_v.index)"
      :style="{...setStyle(opts_active === `moveDown` && api_v.index != stage_len - 1 || opts_active == `moveDown` &&  api_v.index != stage_len - 1),
      color: api_v && api_v.index != stage_len - 1 ? '' : 'lightgray'
      }"
      :class="[api_v && api_v.index != stage_len - 1 ? 'pointer' : '', 'pad025' ,'flex']"
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
      opts_cur_active: undefined,
      api_v: this.$store.state.pages.api_view_el
    };
  },
  computed: {
    stage_len() {
      if (this.$store.state.pages.stages.length == 0) {
        return this.$store.state.pages.root.sections.length;
      } else {
        return this.$store.state.pages.stages[
          this.$store.state.pages.stages.length - 1
        ].obj.sections.length;
      }
    },
    latest_arr() {
      if (this.$store.state.pages.stages.length == 0) {
        return this.$store.state.pages.root.sections;
      } else {
        return this.$store.state.pages.stages[
          this.$store.state.pages.stages.length - 1
        ].obj.sections;
      }
    }
  },
  props: ["data"],
  methods: {
    setContextView(vname) {
      this.$store.commit("pages/set_api_view", {
        view: vname
      });
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
    moveUp(index_origin) {
      this.$store.commit("pages/clear_opts");

      const index_dist = index_origin - 1;

      // update_section_move_items
      this.$store.commit("pages/update_section_move_sections", {
        arr: this.latest_arr,
        origin: index_origin,
        dist: index_dist
      });
    },
    moveDown(index_origin) {
      this.$store.commit("pages/clear_opts");

      const index_dist = index_origin + 1;

      // update_section_move_items
      this.$store.commit("pages/update_section_move_sections", {
        arr: this.latest_arr,
        origin: index_origin,
        dist: index_dist
      });
    }
  }
};
</script>