<template>
  <div class="flex">
    <!-- <iframe class="borderred fullwidth fullheight-percent" src="https://www6.gogoanime.io/lord-el-melloi-ii-sei-no-jikenbo-rail-zeppelin-grace-note-episode-1" frameborder="0"></iframe> -->
    <div class="flex3 flex flexcol">
      <div id="dq-page-editor-area" class="pad125 flex1 relative flexcol fullwidth">
        <div class=" " v-for="sections in $store.state.root">
          <div class="flex">
            <div class="dq-strvw-el">
              <div class="padleft025 padright025 marginright025 pointer">section</div>
            </div>
            <strvw :data="sections"></strvw>
          </div>
        </div>
      </div>
      <div>html trail ?</div>
    </div>
    <div id="dq-page-editor" class="flex1 flex flexcol">
      <div class="borderred flex3">top</div>
      <div id="dq-box-model-v" class="borderred flex1 flex flexcenter">
        <boxmodel />
      </div>
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
