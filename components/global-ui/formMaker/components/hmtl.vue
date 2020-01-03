<template>
  <div class="pad050" style="border:1px solid lightgray;border-radius:4px;">
    <!-- Can only add Paragraph, Video, Audio, Img -->

    <!-- view here -->
    <dqTab
      :tabs="['Editor', 'Preview','HTML']"
      :toggleMode="'rerender'"
      :default="0"
      :options="{
                  borderColor: $store.state.theme.global.border_color,
                  activeColor: $store.state.theme.global.secondary_bg_color,
                  activeTextColor: 'inherit',
                }"
    >
      <div slot="Editor">
        <div id="dqWysEditor" class="relative">
          <div class="absolute fullwidth pad125">
            <div
              class="bordergray marginbottom125"
              v-for="(items,item_index) in workArea"
              :key="item_index"
            >
              <!--  -->
              <div style="background: lightgray;" class="pad050">
                <!-- {{items[Object.keys(items)[0]].type}} -->
                <span class="flex spacebetween" v-if="items[Object.keys(items)[0]].type == 'table'">
                  <span>Table</span>
                  <span>
                    <span class="marginright125 pointer">
                      <i>Style</i>
                    </span>
                    <span class="marginright050 pointer">move up</span>
                    <span class="marginright050 pointer">move down</span>
                    <span class="marginright050 pointer">delete</span>
                  </span>
                </span>
                <span class="flex spacebetween" v-if="items[Object.keys(items)[0]].type == 'vid'">
                  <span>Video</span>
                  <span>
                    <span class="marginright125 pointer">
                      <i>Style</i>
                    </span>
                    <span class="marginright050 pointer">move up</span>
                    <span class="marginright050 pointer">move down</span>
                    <span class="marginright050 pointer">delete</span>
                  </span>
                </span>
                <span class="flex spacebetween" v-if="items[Object.keys(items)[0]].type == 'img'">
                  <span>Image / Picture</span>
                  <span>
                    <span class="marginright125 pointer">
                      <i>Style</i>
                    </span>
                    <span @click="addTag('img',Object.keys(items)[0])" class="marginright125 pointer">
                      <i>Add new image tag</i>
                    </span>
                    <span class="marginright050 pointer">move up</span>
                    <span class="marginright050 pointer">move down</span>
                    <span class="marginright050 pointer">delete</span>
                  </span>
                </span>
                <span class="flex spacebetween" v-if="items[Object.keys(items)[0]].type == 'aud'">
                  <span>Audio</span>
                  <span>
                    <span class="marginright125 pointer">
                      <i>Style</i>
                    </span>
                    <span class="marginright050 pointer">move up</span>
                    <span class="marginright050 pointer">move down</span>
                    <span class="marginright050 pointer">delete</span>
                  </span>
                </span>
                <span class="flex spacebetween" v-if="items[Object.keys(items)[0]].type == 'parag'">
                  <span>Paragraph / Text</span>
                  <span>
                    <span class="marginright125 pointer">
                      <i>Style</i>
                    </span>
                    <span class="marginright050 pointer">move up</span>
                    <span class="marginright050 pointer">move down</span>
                    <span class="marginright050 pointer">delete</span>
                  </span>
                </span>
                <span
                  class="flex spacebetween"
                  v-if="items[Object.keys(items)[0]].type == 'heading'"
                >
                  <span>Heading</span>
                  <span>
                    <span class="marginright125 pointer">
                      <i>Style</i>
                    </span>
                    <span class="marginright050 pointer">move up</span>
                    <span class="marginright050 pointer">move down</span>
                    <span class="marginright050 pointer">delete</span>
                  </span>
                </span>
              </div>
              <!--  -->
              <div class="pad125">
                <dqVid :data="items" v-if="items[Object.keys(items)[0]].type == 'vid'" />
                <dqAud :data="items" v-if="items[Object.keys(items)[0]].type == 'aud'" />
                <dqHeading :data="items" v-if="items[Object.keys(items)[0]].type == 'heading'" />
                <dqImage
                  ref="dqImage"
                  :data="items"
                  v-if="items[Object.keys(items)[0]].type == 'img'"
                />
                <dqParag :data="items" v-if="items[Object.keys(items)[0]].type == 'parag'" />
                <dqTable :data="items" v-if="items[Object.keys(items)[0]].type == 'table'" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex flexcenter margintop050">
          <div>
            <button @click="addWorkAreaItem('img')" class="buttonreset pad050">Image / Picture</button>
            <button @click="addWorkAreaItem('vid')" class="buttonreset pad050">Video</button>
            <button @click="addWorkAreaItem('aud')" class="buttonreset pad050">Audio</button>
            <button @click="addWorkAreaItem('parag')" class="buttonreset pad050">Paragraph / Text</button>
            <button @click="addWorkAreaItem('heading')" class="buttonreset pad050">Heading</button>
            <button @click="addWorkAreaItem('table')" class="buttonreset pad050">Table</button>
          </div>
        </div>
      </div>

      <div style="height:500px;" class="pad050" slot="Preview">this is VDS</div>
      <div style="height:500px;" class="pad050" slot="HTML">this is VDS</div>
    </dqTab>
  </div>
</template>

<script>
import dqAud from "./html/audio";
import dqHeading from "./html/heading";
import dqImage from "./html/image";
import dqParag from "./html/parag";
import dqVid from "./html/video";
import dqTable from "./html/table";

export default {
  data: () => ({
    workArea: []
  }),
  components: {
    dqAud,
    dqHeading,
    dqImage,
    dqParag,
    dqVid,
    dqTable
  },
  methods: {
    addWorkAreaItem(itemType) {
      //
      function makeid(length) {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }
      //
      this.workArea.push({
        [makeid(5)]: {
          type: itemType,
          html: ""
        }
      });
    },
    addTag(tag, containerId) {
      if (tag == "img") {
        this.$refs.dqImage[0].addImageToimgArray(containerId);
      }
    }
  }
};
</script>

<style>
#dqWysEditor {
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  min-height: 500px;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
.bordergray {
  border: 1px solid lightgrey;
  border-radius: 4px;
  background: whitesmoke;
}
</style>