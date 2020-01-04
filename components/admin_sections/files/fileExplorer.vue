<template>
  <div id="dqfileSysCon" style="overflow-x: scroll;" class="flex fullheight-percent flex1 relative">
    <div class="absolute flex fullheight-percent">
      <!--  -->
      <div
        v-for="(filePaneContents, fp_index) in panes"
        :key="fp_index"
        style="min-width:250px;"
        class="fullheight-percent"
      >
        <div
          style="overflow-y: scroll;"
          @select="select"
          :is="'filePane'"
          :pane_index="fp_index"
          :files="panes[fp_index]"
        ></div>
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
import filePane from "./filePane";
import scrollMixIn from "./scroll-mixn";
import paneSystem from "./pane-system-mixin";

export default {
  mixins: [scrollMixIn, paneSystem],
  data: () => ({}),
  components: {
    filePane
  },
  methods: {
    select(val) {
      // Objective: call server, and get the contents of the selected dir or file
      if (val.type == "file") {
        // this.panes.push(val)
        this.pane_start(val,val.pane_index);
      } else {
        console.log('server data')
        const serverData = [
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
          },
          {
            type: "file",
            name: "test.png",
            addrs: "root"
          }
        ];

        this.pane_start(serverData,val.pane_index);

      }
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