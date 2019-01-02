<template>
  <div id="dynamic-pane" class="flex">
    <div
      :style="normalizeStyle(null,$store.state.comp.arr[index].headWidth)"
      class="flex flexcol box-shad"
      v-for="(item, index) in ComponentsArray"
      :key="index"
    >
      <span
        id="pane_head"
        v-if="$store.state.comp.arr[index].name != 'dashboard'"
        class="flex spacebetween"
        :style="normalizeStyle($store.state.comp.arr[index].headColor,null)"
      >
        <div
          style="color:white"
        >{{ $store.state.comp.arr[index].headName.charAt(0).toUpperCase() + $store.state.comp.arr[index].headName.slice(1)}}</div>
        <div
          style="color:white"
          v-if="$store.state.comp.arr[index].closable"
          @click="close_pane(index)"
          class="pointer"
        >&#10006;</div>
      </span>
      <div class="flex" v-bind:index="index" :is="ComponentsArray[index].name"></div>
    </div>
  </div>
</template>

<script>
// shell
import shell from "@/server/sys/core-apps/i0-shell/view/shell.vue";

// pages
import pages from "@/server/sys/core-apps/i0-pages/view/page_list.vue";
import pagesDetails from "@/server/sys/core-apps/i0-pages/view/page-detail.vue";

//
import collections from "@/server/sys/core-apps/i0-collection/collections.vue";
import components from "@/server/sys/core-apps/i0-components/components.vue";
import database from "@/server/sys/core-apps/i0-database/database.vue";
import files from "@/server/sys/core-apps/i0-files/files.vue";
import marketplace from "@/server/sys/core-apps/i0-marketplace/marketplace.vue";
import plugins from "@/server/sys/core-apps/i0-plugins/plugins.vue";
import app from "@/server/sys/core-apps/i0-app/app.vue";
import dashboard from '@/server/sys/core-apps/i0-dashboard/dashboard.vue'

export default {
  data() {
    return {
      ComponentsArray: this.$store.state.comp.arr,
      stylesArray: undefined
    };
  },
  methods: {
    close_pane(index) {
      // this.$store.commit("close_pane", index);
      this.$store.dispatch('close_pane',{
        component:'dashboard',
        position: index
      })
      // console.log(this.$store)
    },
    normalizeStyle(color, width) {
      if (color != null) {
        return {
          "background-color": color
        };
      }

      if (width != null) {
        if (width == "100%") {
          return {
            flex: 1
          };
        } else {
          return {
            "max-width": width
          };
        }
      }
    }
  },
  watch: {
    ComponentsArray(newVal, oldVal) {
      // console.log(location.href = this.$store.state.comp.currentUrl)
      // console.log(this.$route);
    }
  },
  components: {
    shell,

    // pages
    pages,
    pagesDetails,

    collections,
    components,
    database,
    files,
    marketplace,
    plugins,
    app,
    dashboard
  },
  mouted() {}
};
</script>

<style>
#dynamic-pane {
  border-left: 1px solid rgba(128, 128, 128, 0.328);
  box-shadow: 2px 2px 5px 1px rgba(128, 128, 128, 0.328);
  padding: calc(var(--fontSize) * 0.25);
  /* border: 5px solid teal; */
  flex: 1;
}
#dynamic-pane > * {
  overflow: hidden;
}
.box-shad {
  box-shadow: 0px 2px 5px 1px rgba(128, 128, 128, 0.328);
  border: 1px solid rgba(128, 128, 128, 0.233);
  flex: 1;
  background-color: white;
  overflow: hidden;
  transition: 0.2s;
}
#pane_head {
  padding: calc(var(--fontSize) * 0.25);
}
</style>
