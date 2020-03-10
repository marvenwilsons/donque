<template>
  <div id="dqfileSysCon" style="overflow-x: scroll;" class="flex fullheight-percent flex1 relative">
    <div class="absolute flex fullheight-percent">
      <!--  -->
      <div
        v-for="(filePaneContents, fp_index) in panes"
        :key="fp_index"
        style="min-width:350px;"
        class="fullheight-percent"
      >
        <div
          style="overflow-y: scroll;"
          @select="select"
          @SetPaneModal="SetPaneModal"
          :is="'filePane'"
          :pane_index="fp_index"
          :files="panes[fp_index]"
          :filter="filter"
          :UnsetPaneModal="UnsetPaneModal"
          
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
  props: ["filter", 'UnsetPaneModal'],
  data: () => ({}),
  components: {
    filePane
  },
  methods: {
    SetPaneModal(val) {
      this.$emit('SetPaneModal',val)
    },
    select(val) {
      if (val.type == "file") {
        this.pane_start(val, val.pane_index);
      } else {
        const { type, name, addrs, pane_index } = val;
        //
        let fileAddrs = undefined;
        if (type == "dir") {
          this.$store
            .dispatch("systemCall", {
              command: "getDirContents",
              section: "fileSystem",
              data: {
                addrs: val.addrs,
                name:
                  val.addrs == "root"
                    ? val.name
                    : val.publicPath.replace("static/media", ""),
                type: val.type
              },
              method: "get"
            })
            .then(res => {
              this.pane_start(res.data.dirContents, val.pane_index);
            });
        }
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
      },
      {
        type: "dir",
        name: "Collections",
        addrs: "root"
      }
    ]);
  }
};
</script>

<style>
</style>