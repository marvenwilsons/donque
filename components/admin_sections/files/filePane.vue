<template>
  <div @click.right.prevent="() => {/** silence */}" class="fullheight-percent">
    <div v-if="Array.isArray(files)" class="fullheight-percent">
      <!-- if directory is empty -->
      <div class="flex fullheight-percent flexcenter flexcol" v-if="files.length == 0">
        <i class="far fa-folder-open fio thumic"></i>
        <h5 style="color:gray;">Empty Folder</h5>
        <!-- actions -->
        <div  v-if="typeof filter == 'undefined'" class="flex flexcol">
          <span
            @click="createFileModal"
            class="dirActions pad025 flex flexcenter pointer"
          >Create File</span>
          <span @click="addFolderModal" class="dirActions pad025 flex flexcenter pointer">Add Folder</span>
          <span class="dirActions pad025 flex flexcenter pointer">Upload File / Folder</span>
        </div>
      </div>
      <!-- individual files or directories -->
      <div class="pointer" v-for="(contents,content_index) in files" :key="content_index">
        <div
          :style="{background: selected ? selected.name == contents.name && selected.type == contents.type ? 'rgba(211, 211, 211, 0.397)' : '' : ''}"
          class="pad025 flex spacebetween indvfls"
        >
          <div class="flex7" @click="select(contents), selected = contents">
            <i v-if="contents.type == 'dir'" class="fas fa-folder marginleft025 dir"></i>
            <i
              v-if="contents.type == 'file' && getFileIcon(contents.name) == 'img'"
              class="far fa-image marginleft025 fio"
            ></i>
            <i
              v-if="contents.type == 'file' && getFileIcon(contents.name) == 'video'"
              class="fas fa-video marginleft025 fio"
            ></i>
            <i
              v-if="contents.type == 'file' && getFileIcon(contents.name) == 'audio'"
              class="fas fa-music marginleft025 fio"
            ></i>
            <span class="marginleft025">{{contents.name}}</span>
          </div>
          <div class="flex1 flex flexcenter ">
            <div  v-if="typeof filter == 'undefined'" class="flex1 flex flexend ">
              <i class="fas fa-ellipsis-h fio"></i>
            </div>
            <div class=" flex1 flex flexend">
              <i v-if="contents.type == 'dir'" class="fas fa-caret-right marginright025 fio"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- view pane -->
    <div
      style="width:400px;"
      class="flex flexcol flexcenter fullheight-percent"
      v-if="Array.isArray(files) == false"
    >
      <!-- if image, image view -->
      <div>
        <div style=" height:250px;width:350px;" v-if="getFileIcon(files.name) == 'img'">
          <img
            style="border:2px solid lightgray;"
            height="22"
            width="150px"
            :src="`/${pathHandler(files.publicPath)}`"
          />
        </div>
      </div>
      <!-- icons -->
      <div>
        <h5 class="flex flexcol" style="color:gray;">
          <div class="flex flexcenter pad125">
            <i v-if="getFileIcon(files.name) == 'video'" class="fas fa-file-video fio thumic"></i>
            <i v-if="getFileIcon(files.name) == 'audio'" class="fas fa-music fio thumic"></i>
            <i v-if="getFileIcon(files.name) == 'img'" class="far fa-image fio thumic"></i>
          </div>
          <span>{{files.name}}</span>
        </h5>
      </div>
      <!-- if filter modal is used -->
      <div v-if="typeof filter != 'undefined'" class="marginbottom125">
        <button
          v-if="filter == 'img' && filterBtnHandler(files.name,filter)"
          style="color:white;"
          class="buttonreset pad050 darkprimary"
        >
          <strong @click="$store.dispatch('file_system/setTempData',files), closeModal()" >Select This Image</strong>
        </button>
        <button
          v-if="filter == 'video' && filterBtnHandler(files.name,filter)"
          style="color:white;"
          class="buttonreset pad050 darkprimary"
        >
          <strong>Select This Video</strong>
        </button>
        <button
          v-if="filter == 'doc' && filterBtnHandler(files.name,filter)"
          style="color:white;"
          class="buttonreset pad050 darkprimary"
        >
          <strong>Select This Document</strong>
        </button>
      </div>
      <!-- properties -->
      <div v-if="typeof filter == 'undefined'">
        <div v-for="(prop,prop_index) in files" :key="prop">
          <div style="margin-left:55px;color:gray;" class="flex flexcenter padleft125">
            <div v-if="prop_index != 'pane_index'" class="flex1 flexend flex marginright025 pad025">
              <strong>{{prop_index}}:</strong>
            </div>
            <div v-if="prop_index != 'pane_index'" class="flex2 pad025">{{prop}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalCreateFile from "./modals/create-file";
import modalCreateFolder from "./modals/create-folder";

export default {
  props: ["files", "pane_index", "filter", 'UnsetPaneModal'],
  data: () => ({
    panes: [],
    selected: undefined
  }),
  methods: {
    pathHandler(path) {
      path = path.replace("static/", "");
      return path;
    },
    closeModal() {
      this.UnsetPaneModal()
    },
    getFileIcon(fileName) {
      const imgs = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
      const video = [".mp4", ".mov"];
      const audio = [".mp3"];
      const doc = [".txt"];

      const ext = `.${fileName.split(".")[1]}`;

      let fileIs = undefined;

      if (imgs.includes(ext.toLowerCase())) {
        fileIs = "img";
      } else if (video.includes(ext.toLowerCase())) {
        fileIs = "video";
      } else if (doc.includes(ext.toLowerCase())) {
        fileIs = "doc";
      } else if (audio.includes(ext.toLowerCase())) {
        fileIs = "audio";
      }

      return fileIs;
    },
    select(contents) {
      contents.pane_index = this.pane_index;
      this.$emit("select", contents);
    },
    filterBtnHandler(fileName, filter) {
      const ext = this.getFileIcon(fileName);
      return ext == filter;
    },
    createFileModal() {
      this.$emit("SetPaneModal", {
        pane_index: 0,
        pane_name: "Files",
        component: modalCreateFile,
        title: "Create file",
        width: "320px",
        CanBeClose: true,
        header: true
      });
    },
    addFolderModal() {
      this.$emit("SetPaneModal", {
        pane_index: 0,
        pane_name: "Files",
        component: modalCreateFolder,
        title: "Add folder",
        width: "320px",
        CanBeClose: true,
        header: true
      });
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
.thumic {
  font-size: 50px;
}
.dirActions {
  color: gray;
}
.dirActions:hover {
  text-decoration: underline;
  transition: 0.3s;
}
</style>