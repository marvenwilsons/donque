<template>
  <div class="fullwidth fullheight-percent flex">
    <!-- stage area -->
    <div style="background:#f5fbfd;" class="flex1">
      <div class="fullheight-percent relative pad125 fullheight-percent" style="overflow-y:scroll;">
        <div
          class="fullheight-percent"
          style="max-width:1080px;background:white;box-shadow: 1px 1px 10px 1px #393e4210;"
        >
          <div v-for="(item,item_index) in stage_array" :key="`${item}-${item_index}`">
            <dqAud @onSelectOption="onSelectOption" v-if="item == 'AUDIO'" />
            <dqHeading @onSelectOption="onSelectOption" v-if="item == 'HEADING'" />
            <dqImage @onSelectOption="onSelectOption" v-if="item == 'IMG'" />
            <dqParag @onSelectOption="onSelectOption" v-if="item == 'P'" />
            <dqVid @onSelectOption="onSelectOption" v-if="item == 'VIDEO'" />
            <dqTable @onSelectOption="onSelectOption" v-if="item == 'TABLE'" />
            <dqGrid @onSelectOption="onSelectOption" v-if="item == 'GRID'" />
          </div>
        </div>
      </div>
    </div>
    <!-- options panel -->
    <div style="width:21%;background:#dceffa;" class="relative flex flexcol">
      <!-- save and publish -->
      <div class="flex flexend pad125">
        <button class="buttonreset pad050 borderRad4 editorBtn">Save and publish</button>
      </div>
      <!-- dynamic options sections -->
      <div style="overflow-y:scroll;" class="flex1 relative">
        <!-- strong -->
        <div v-if="!selected_opt">
          <strong class="pad125 marginleft050 dq-editor-els-text-color">COMPONENTS</strong>
          <div class="absolute fullwidth pad125 flex flexwrap">
            <div
              @click="selected_el = element.name"
              class="flex"
              v-for="element in elements"
              :key="element.name"
            >
              <els :selected="selected_el" :data="element" />
            </div>
          </div>
        </div>
        <!-- container options -->
        <div class="pad125" v-if="selected_opt == 'con'">
          <con />
        </div>
        <!-- element prop -->
        <div class="pad125" v-if="selected_opt == 'prop'">
          <prop />
        </div>
      </div>
      <!-- dynamic buttons section -->
      {{$store.state.editor.currentClicked}}
      <div class="flex flexend pad125 relative">
        <transition name="fade">
          <button
            @click="addElement"
            v-if="selected_el"
            class="buttonreset pad050 borderRad4 editorBtn"
          >Add Element</button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import els from "./els";
import OptionsPanelElementsMixin from "./mixin-elements";

import con from "./con";
import prop from "./prop";

import dqAud from "./html/audio";
import dqHeading from "./html/heading";
import dqImage from "./html/image";
import dqParag from "./html/parag";
import dqVid from "./html/video";
import dqTable from "./html/table";
import dqGrid from "./html/grid";

export default {
  mixins: [OptionsPanelElementsMixin],
  data: () => ({
    selected_el: undefined,
    selected_opt: undefined,
    stage_array: []
  }),
  methods: {
    addElement() {
      if (this.selected_el) {
        this.stage_array.push(this.selected_el);
      }
    },
    onSelectOption(ctx) {
      //
      this.selected_opt = ctx.selectedOpt;
    }
  },
  components: {
    els,
    dqAud,
    dqHeading,
    dqImage,
    dqParag,
    dqVid,
    dqTable,
    dqGrid,
    con,
    prop
  },
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      pane_width: "100%",
      head_visibility: false

      // pane_head_bg_color: "rgb(48, 51, 64)",
      // pane_head_title_color: "white"
    });
  }
};
</script>

<style scoped >
.editorBtn {
  background: #6dbce8;
  color: white;
  font-weight: bold;
  border: 2px solid #98d0ef;
}
</style>