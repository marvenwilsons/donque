<template>
  <div class="flex">
    <!-- <iframe class="borderred fullwidth fullheight-percent" src="https://www6.gogoanime.io/lord-el-melloi-ii-sei-no-jikenbo-rail-zeppelin-grace-note-episode-1" frameborder="0"></iframe> -->
    <div class="flex3 flex flexcol">
      <div id="dq-page-editor-area" class="pad125 flex1 relative flexcol fullwidth">
        <div v-for="(sections,s_i) in $store.state.root" :key="`seccc-${s_i}`">
          <div class="flex">
            <div class="dq-strvw-el">
              <div
                :style="{background:$store.state.theme.global.secondary_bg_color}"
                class="flex flexcenter spacebetween pointer"
              >
                section
                <i class="fas fa-caret-right"></i>
                <!-- option box -->
                <div v-if="false" class="relative">
                  <div
                    :style="{boxShadow:`0 0 5px ${$store.state.theme.global.secondary_bg_color}`}"
                    class="pad125 dq-page-el-opt-bx-1 absolute flex"
                  >
                    <div class="padright050 flex flexcol">
                      <div class="pad025" @click="view = 'dddesc'">> Desc</div>
                      <div class="pad025" @click="view = 'addChild'">AddChild</div>
                      <div class="pad025" @click="view = 'classList'">ClassList</div>
                      <div class="pad025" @click="view = 'properties'">Properties</div>
                      <div class="pad025">Style</div>
                      <div class="pad025">Cut</div>
                      <div class="pad025">Paste</div>
                      <div class="pad025" @click="view = 'dddel'">Delete</div>
                    </div>
                  </div>
                </div>
                <!-- end of option box -->
              </div>
            </div>
            <strvw :data="sections"></strvw>
          </div>
        </div>
      </div>
      <!-- <div>html trail ?</div> -->
    </div>
  </div>
</template>

<script>
import el_box_model from "./el-box-model";
import struct_view from "./struc-view";

export default {
  components: {
    boxmodel: el_box_model,
    strvw: struct_view
  }
};
</script>

<style scoped>
.dq-page-el-opt-bx-1 {
  z-index: 900;
  background: white;
  border: 1px solid rgba(128, 128, 128, 0.432);
  min-width: 100px;
  border-radius: 2px;
  top: -13px;
  left: 6px;
}
#dq-box-model-v {
  min-height: 140px;
}
#dq-page-editor {
  max-width: 350px;
}
#dq-page-editor-area {
  overflow: auto;
}
.dq-page-gr-hor {
  padding: 10px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.205);
}
.dq-page-gr-ver {
  padding: 10px;
  width: 145px;
  border-right: 1px solid rgba(128, 128, 128, 0.205);
}

table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
th,
td {
  padding: 5px;
  text-align: left;
}
</style>
