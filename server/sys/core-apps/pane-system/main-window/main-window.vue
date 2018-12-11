<template>
  <div id="dynamic-pane" class="flex">
    <div
      :style="normalizeStyle(null,$store.state.comp.arr[index].headWidth)"
      id="box-shad"
      class="flex flexcol"
      v-for="(item, index) in ComponentsArray"
      :key="index"
    >
      <span
        id="pane_head"
        v-if="$store.state.comp.arr[index].name != 'dashboard'"
        class="flex spacebetween"
        :style="normalizeStyle($store.state.comp.arr[index].headColor,null)"
      >
        <!-- {{index}} - {{$store.state.comp.arr[index].headColor}} - {{$store.state.comp.arr[index]}} -->
        <div>{{ $store.state.comp.arr[index].headName.charAt(0).toUpperCase() + $store.state.comp.arr[index].headName.slice(1) }}</div>
        <div v-if="$store.state.comp.arr[index].closable" @click="close_pane(index)" class="pointer">&#10006;</div>
      </span>
      <div class="flex" v-bind:index="index" :is="ComponentsArray[index].name"></div>
    </div>
  </div>
</template>

<script>
// shell
import shell from "@/server/sys/core-apps/i0-shell/view/shell.vue";

// pagesboxboxbox
import pages from "@/server/sys/core-apps/i0-pages/view/page_list.vue";
import pagesDetails from "@/server/sys/core-apps/i0-pages/view/page-detail.vue";
import collections from "@/server/sys/core-apps/i0-collection/collection-list.vue";


export default {
  data() {
    return {
      ComponentsArray: this.$store.state.comp.arr,
      stylesArray: undefined
    };
  },
  methods: {
    close_pane(index) {
      this.$store.commit("close_pane", index);
    },
    normalizeStyle(color, width) {
      if(color != null){
        return {
          'background-color':color
        }
      }

      if(width != null){
        if(width == '100%'){
          return {
            flex:1
          }
        }else{
          return {
            'max-width': width
          }
        }
      }
    }
  },
  components: {
    shell,

    // pages
    pages,
    pagesDetails,

    collections
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
#box-shad {
  box-shadow: 0px 2px 5px 1px rgba(128, 128, 128, 0.328);
  border: 1px solid rgba(128, 128, 128, 0.233);
  flex: 1;
}
#pane_head {
  padding: calc(var(--fontSize) * 0.25);
  /* background-color: #4CC49D;; */
}
</style>
