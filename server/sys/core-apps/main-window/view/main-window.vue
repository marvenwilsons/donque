<template>
  <div id="dynamic-pane" class="flex">
    <div class="flex f1 flexcol box-shad relative borderred" v-for="(item, index) in ComponentsArray" :key="index">
      <span id="pane_head" v-if="$store.state.comp.arr[index] != 'dashboard'" class="flex spacebetween">
        <div>{{ $store.state.comp.arr[index].charAt(0).toUpperCase() + $store.state.comp.arr[index].slice(1) }}</div>
        {{$store.state.comp}}
        <!-- <div>{{ $store.state.comp.paneTitle != undefined ? $store.state.comp.paneTitle : 'not assigned'}}</div> -->
        <div @click="close_pane(index)" class="pointer">&#10006;</div>
      </span>
      <div class v-bind:index="index" :is="ComponentsArray[index]"></div>
    </div>
  </div>
</template>

<script>
import shell from '@/server/sys/core-apps/shell/view/shell.vue'
import pages from '@/server/sys/core-apps/pages/view/page_list.vue'

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
      pages
  }
};
</script>

<style>
#dynamic-pane{
  border-left: 1px solid rgba(128, 128, 128, 0.328);
  box-shadow: 2px 2px 20px 1px rgba(128, 128, 128, 0.328);
  padding: calc(var(--fontSize)*1.25);
}
</style>
