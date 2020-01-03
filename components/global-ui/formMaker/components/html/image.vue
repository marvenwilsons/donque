<template>
  <div class="flex flexcol">
    <transition name="fade">
      <div v-if="isAttrShow" style="background:lightgray" class="bordergray pad050 marginbottom125">
        <!-- Attributes: src, alt, witdth, height, longdesc, id, class -->
        <div>Image Attributes:</div>
        <div class="pad050 flex flexwrap">
          <div>
            <i>src:</i>
            <input class="pad025 margin050" type="text" />
          </div>
          <div>
            <i>alt:</i>
            <input class="pad025 margin050" type="text" />
          </div>
          <div>
            <i>id:</i>
            <input v-model="selectedImg.id" class="pad025 margin050" type="text" />
          </div>
          <div>
            <i>class:</i>
            <input class="pad025 margin050" type="text" />
          </div>
          <div>
            <i>width:</i>
            <input v-model="selectedImg.width" class="pad025 margin050" type="text" />
          </div>
          <div>
            <i>height:</i>
            <input v-model="selectedImg.height" class="pad025 margin050" type="text" />
          </div>
          <div>
            <i>longdesc:</i>
            <input class="pad025 margin050" type="text" />
          </div>
        </div>
      </div>
    </transition>
    <!--  -->
    <div>
      <div
        v-for="(imgs, img_index) in imgArray"
        :key="img_index"
        @click="showAttr(imgs,img_index)"
        class="pointer flex flexcenter"
        style="border:1px solid lightgray; height:100px; width:100px;"
      >
      <span class="fullwidth flex flexcenter" v-if="imgs.src == ''">No Img</span>
        <img v-if="imgs.src" src alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "addImage"],
  data: () => ({
    imgArray: [],
    isAttrShow: false,
    selectedImg: undefined,
    selectedImgIndex: undefined
  }),
  methods: {
    makeId(length) {
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
    },
    showAttr(attr, index) {
      this.selectedImg = attr;

      // this.isAttrShow = true;

      if (this.selectedImgIndex === index) {
        this.isAttrShow = false;
        this.selectedImgIndex = undefined;
      } else {
        this.isAttrShow = true;
      }

      this.selectedImgIndex = index;
    },
    addImageToimgArray(containerId) {
      this.imgArray.push({
        src: "",
        alt: "",
        width: "100px",
        height: "100px",
        longdesc: "",
        id: this.makeId(7),
        class: ""
      });
    }
  },
  watch: {},
  mounted() {
    if (this.imgArray.length == 0) {
      this.imgArray.push({
        src: "",
        alt: "",
        width: "100px",
        height: "100px",
        longdesc: "",
        id: this.makeId(7),
        class: ""
      });
    }
  }
};
</script>