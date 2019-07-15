<template>
  <div class="flex flexcol fullheight-percent">
    <div class="flex1 flex">
      <div class="fullwidth" :is="comp" ></div>
    </div>
    <div id="dq-sel-page-pane" class="borderred flex">
      <div :data="data" @click="comp = 'editor'" class="pad050 pointer">Editor</div>
      <div :data="data" @click="comp = 'rs'" class="pad050 pointer">Route settings</div>
      <div :data="data" @click="comp = 'props'" class="pad050 pointer">Properties</div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import editor from './editor-view'
import route_settings from './route-settings-view'
import properties from './props-view'

export default {
  props: ["data", "my_pane_index"],
  data() {
    return {
      comp: 'editor'
    }
  },
  components: {
    editor,
    rs: route_settings,
    props: properties
  }
};
</script>

<style>
</style>
