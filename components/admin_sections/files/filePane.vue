<template>
  <div class="fullheight-percent">
    <div class="pointer" v-for="(contents,content_index) in files" :key="content_index">
      <div
        :style="{background: selected ? selected.name == contents.name && selected.type == contents.type ? 'rgba(211, 211, 211, 0.397)' : '' : ''}"
        @click="$emit('select', contents), selected = contents"
        class="pad025 flex spacebetween indvfls"
      >
        <div>
          <i v-if="contents.type == 'dir'" class="fas fa-folder marginleft025 dir"></i>
          <i
            v-if="contents.type == 'file' && getFileIcon(contents.name) == 'img'"
            class="fas fa-file-image marginleft025 fio"
          ></i>
          <i
            v-if="contents.type == 'file' && getFileIcon(contents.name) == 'video'"
            class="fas fa-file-video marginleft025 fio"
          ></i>
          <span class="marginleft025">{{contents.name}}</span>
        </div>
        <div>
          <i
            style="color:lightgray"
            v-if="contents.type == 'dir'"
            class="fas fa-caret-right marginright025"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    files: Array
  },
  data: () => ({
    panes: [],
    selected: undefined
  }),
  methods: {
    getFileIcon(fileName) {
      const imgs = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
      const video = [".mp4", ".mov"];
      const doc = [".txt"];

      const ext = `.${fileName.split(".")[1]}`;

      let fileIs = undefined;

      if (imgs.includes(ext.toLowerCase())) {
        fileIs = "img";
      } else if (video.includes(ext.toLowerCase())) {
        fileIs = "video";
      } else if (doc.includes(ext.toLowerCase())) {
        fileIs = "doc";
      }

      return fileIs;
    }
  },
  mounted() {
    this.panes.push(this.filePaneContents);

    window.addEventListener("wheel", e => {
      if (e.deltaY > 0) {
        this.scroll_val += 70;
      } else {
        this.scroll_val -= 70;
      }
    });

    setTimeout(() => {
      this.main_w = document.getElementById("dq-main-w");
    }, 0);
  }
};
</script>

<style>
.fio {
  color: rgba(197, 196, 196, 0.87);
}
.dir {
  color: #03597e8f;
}
.indvfls:hover {
  background: rgba(211, 211, 211, 0.397);
}
</style>