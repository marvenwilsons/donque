<template>
  <div  style="overflow-x: scroll;" class="flex fullheight-percent flex1 relative">
    <div id="dqfileSysCon" class="absolute flex fullheight-percent">
      <!--  -->
      <div
        v-for="(filePaneContents, fp_index) in panes"
        :key="fp_index"
        style="width:250px;"
        class="fullheight-percent"
      >
        <div style="overflow-y: scroll;" @select="select" :is="'filePane'" :files="panes[fp_index]"></div>
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
import filePane from "./filePane";
import scrollMixIn from "./scroll-mixn"

export default {
  mixins: [scrollMixIn],
  data: () => ({
    panes: []
  }),
  components: {
    filePane
  },
  updated() {
    const element = document.getElementById("dqfileSysCon");

    const max_scroll = element.scrollWidth - element.clientWidth;
    if (max_scroll) {
      this.max_scroll = max_scroll;
    }
  },
  methods: {
    select(val) {
      // Objective: call server, and get the contents of the selected dir or file
      this.panes.push([
        {
          type: "dir",
          name: "Audio",
          addrs: "root"
        },
        {
          type: "dir",
          name: "Video",
          addrs: "root"
        },
        {
          type: "dir",
          name: "Images",
          addrs: "root"
        },
        {
          type: "dir",
          name: "Documents",
          addrs: "root"
        },
        {
          type: "file",
          name: "test.mp4",
          addrs: "root"
        }
      ]);
    }
  },
  mounted() {
    this.panes.push([
      {
        type: "dir",
        name: "Audio",
        addrs: "root"
      },
      {
        type: "dir",
        name: "Video",
        addrs: "root"
      },
      {
        type: "dir",
        name: "Images",
        addrs: "root"
      },
      {
        type: "dir",
        name: "Documents",
        addrs: "root"
      }
    ]);
  }
};
</script>

<style>
</style>