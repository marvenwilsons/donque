<template>
  <div id="dynamic-pane" class="flex">
    <div class="flex flexcol box-shad relative" v-for="(item, index) in ComponentsArray" :key="index">
      <span id="pane_head" v-if="$store.state.comp.arr[index] != 'dashboard'" class="flex spacebetween">
        <div>{{ $store.state.comp.arr[index].charAt(0).toUpperCase() + $store.state.comp.arr[index].slice(1) }}</div>
        <!-- {{$store.state.comp}} -->
        <!-- <div>{{ $store.state.comp.paneTitle != undefined ? $store.state.comp.paneTitle : 'not assigned'}}</div> -->
        <div @click="close_pane(index)" class="pointer">&#10006;</div>
      </span>
      <div class v-bind:index="index" :is="ComponentsArray[index]"></div>
    </div>
  </div>
</template>

<script>
// shell
import shell from '@/server/sys/core-apps/i0-shell/view/shell.vue'

// pages
import pages        from '@/server/sys/core-apps/i0-pages/view/page_list.vue'
import pagesDetails from '@/server/sys/core-apps/i0-pages/view/page-detail.vue'


export default {
  data() {
    return {
      ComponentsArray: this.$store.state.comp.arr
    };
  },
  methods: {
    close_pane(index) {
      this.$store.commit("close_pane", index);
    }
  },
  components: {
      shell,

      // pages
      pages,
      pagesDetails
  },
  mouted(){
  
  }
};
</script>

<style>
#dynamic-pane{
  border-left: 1px solid rgba(128, 128, 128, 0.328);
  box-shadow: 2px 2px 5px 1px rgba(128, 128, 128, 0.328);
  padding: calc(var(--fontSize)*0.25);
  /* border: 5px solid teal; */
  width: inherit;
}
.box-shad{
  box-shadow: 0px 2px 5px 1px rgba(128, 128, 128, 0.328);
  border: 1px solid rgba(128, 128, 128, 0.233);
}
#pane_head{
  padding: calc(var(--fontSize)*0.25);
  /* background-color: #4CC49D;; */
}
</style>
