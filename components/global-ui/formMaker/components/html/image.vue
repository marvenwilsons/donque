<template>
  <div class="flex flexcol">
    <transition name="fade">
      <div v-if="isAttrShow" style="background:lightgray" class="bordergray pad050 marginbottom125">
        <!-- Attributes: src, alt, witdth, height, longdesc, id, class -->
        <div class="flex">
          <div
            :style="{textDecoration: selectedGroup == 'attrs' ? 'underline' : ''}"
            @click="selectedGroup = 'attrs'"
            class="marginright125 pointer"
          >Image Attributes</div>
          <div
            :style="{textDecoration: selectedGroup == 'dimensions' ? 'underline' : ''}"
            @click="selectedGroup = 'dimensions'"
            class="marginright125 pointer"
          >Image Dimensions</div>
          <div
            :style="{textDecoration: selectedGroup == 'margins' ? 'underline' : ''}"
            @click="selectedGroup = 'margins'"
            class="pointer"
          >Image Margins</div>
        </div>
        <div class="pad050 flex flexwrap">
          <div class="flex flexwrap" v-if="selectedGroup == 'attrs'">
            <div>
              <!-- native attr -->
              <i>src:</i>
              <input v-model="selectedImg.src" class="pad025 margin050" type="text" />
              <span @click="$emit('openFileSystem')" class="pointer">open file system</span>
            </div>
            <div class="marginleft125">
              <i>alt:</i>
              <input v-model="selectedImg.alt" class="pad025 margin050" type="text" />
            </div>
            <div>
              <i>id:</i>
              <input v-model="selectedImg.id" class="pad025 margin050" type="text" />
            </div>
            <div>
              <i>class:</i>
              <input v-model="selectedImg.class" class="pad025 margin050" type="text" />
            </div>
            <div>
              <i>longdesc:</i>
              <input v-model="selectedImg.longdesc" class="pad025 margin050" type="text" />
            </div>
          </div>
          <!-- dimensions -->
          <div class="flex flexwrap" v-if="selectedGroup == 'dimensions'">
            <div>
              <i>width:</i>
              <input v-model="selectedImg.width" class="pad025 margin050" type="text" />
            </div>
            <div>
              <i>height:</i>
              <input v-model="selectedImg.height" class="pad025 margin050" type="text" />
            </div>
          </div>
          <!-- margins -->
          <div class="flex flexwrap" v-if="selectedGroup == 'margins'">
            <div>
              <i>margin-top:</i>
              <input v-model="selectedImg.margin.marginTop" class="pad025 margin050" type="text" />
            </div>
            <div>
              <i>margin-bottom:</i>
              <input v-model="selectedImg.margin.marginBottom" class="pad025 margin050" type="text" />
            </div>
            <div>
              <i>margin-left:</i>
              <input v-model="selectedImg.margin.marginLeft" class="pad025 margin050" type="text" />
            </div>
            <div>
              <i>margin-right:</i>
              <input v-model="selectedImg.margin.marginRight" class="pad025 margin050" type="text" />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--  -->
    <pre>
      {{finalHtml}}
    </pre>
    <div  >
      <div
        v-for="(imgs, img_index) in imgArray"
        :key="img_index"
        @click="showAttr(imgs,img_index)"
        class="pointer flex flexcenter"
        :style="{border:'1px solid lightgray', height:imgs.height, width: imgs.width}"
      >
        <span class="fullwidth flex flexcenter" v-if="imgArray[img_index].src == ''">No Img</span>
        <transition name="fade">
          <img v-if="imgs.src"  :src="imgs.src" :height="imgs.height" :width="imgs.width"/>
        </transition>
      </div>
    </div>
    <!-- <span v-html="finalHtml" ></span> -->
  </div>
</template>

<script>

export default {
  props: ["data", "addImage"],
  data: () => ({
    imgArray: [],
    isAttrShow: false,
    selectedImg: undefined,
    selectedImgIndex: undefined,
    selectedGroup: undefined,
    containerId: undefined,
    margins: undefined,
    scr: undefined,
  }),
  computed: {
    finalImgHtml() {
      let ar = [];

      let margins = [];
      const marginHandler = marginObj => {
        Object.keys(marginObj).map(e => {
          if (marginObj[e] != undefined) {
            if (marginObj[e].trim() != "") {
              switch (e) {
                case "marginRight":
                  margins.push(`margin-right:${marginObj[e]};`);
                  break;
                case "marginLeft":
                  margins.push(`margin-left:${marginObj[e]};`);
                  break;
                case "marginTop":
                  margins.push(`margin-top:${marginObj[e]};`);
                  break;
                case "marginBottom":
                  margins.push(`margin-bottom:${marginObj[e]};`);
                  break;
              }
            }
          }
        });
        if (margins.length) {
          this.margins = `style="${margins.join(" ")}"`
          return `style="${margins.join(" ")}"`;
        } else {
          return null
        }
      };

      for (var i = 0; i < this.imgArray.length; i++) {
        ar.push(
          `<img scr="static${this.imgArray[i].src}" alt="${this.imgArray[i].alt}" ${
            this.imgArray[i].class ? `class="${this.imgArray[i].class}"` : ""
          }${
            this.imgArray[i].longdesc
              ? `longdesc="${this.imgArray[i].longdesc}"`
              : ""
          } ${marginHandler(this.imgArray[i].margin) ? this.margins : ''} id="${
            this.imgArray[i].id
          }" height="${this.imgArray[i].height}" width="${
            this.imgArray[i].width
          }" ></img>`
        );
      }

      if (ar.length > 1) {
        return ar.join(" \n\t  ");
      } else if (ar.length == 1) {
        return ar.join();
      }
    },
    finalHtml() {
      return `
        <div id="${this.containerId}" >
          ${this.finalImgHtml}
        </div>`;
    },
    fileSysTempData() {
      return this.$store.state.file_system.tempData
    },
    getSelectedImg() {
      return this.selectedImg
    }
  },
  watch: {
    fileSysTempData(current,old) {
      if(current) {
        this.imgArray[this.selectedImgIndex].src = current.publicPath.replace('static','')
        
      }
    },
    getSelectedImg : {
      handler: function (current,old) {
        this.imgArray[this.selectedImgIndex] = current
        // this.ready = false

        // setTimeout(() => {
        //   this.ready = true
        // }, 0);
      },
      deep: true
    }
  },
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
      if (this.selectedImgIndex === index) {
        this.isAttrShow = false;
        this.selectedImgIndex = undefined;
        this.selectedImg = undefined;
      } else {
        this.isAttrShow = true;
        this.selectedImg = attr;
        this.selectedImgIndex = index;
        this.selectedGroup = "attrs";
      }
    },
    addImageToimgArray(containerId) {
      this.imgArray.push({
        src: "",
        alt: "",
        width: "100px",
        height: "100px",
        longdesc: "",
        id: this.makeId(7),
        class: "",
        margin: {
          marginTop: undefined,
          marginBottom: undefined,
          marginLeft: undefined,
          marginRight: undefined
        }
      });
    }
  },
  mounted() {
    this.containerId = this.makeId(8);
    if (this.imgArray.length == 0) {
      this.imgArray.push({
        src: "",
        alt: "",
        width: "100px",
        height: "100px",
        longdesc: "",
        id: this.makeId(7),
        class: "",
        margin: {
          marginTop: undefined,
          marginBottom: undefined,
          marginLeft: undefined,
          marginRight: undefined
        }
      });
    }
  }
};
</script>