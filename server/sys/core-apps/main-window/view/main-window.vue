<template>
  <div class="flex">
    <div class="flex f1 flexcol box-shad relative" v-for="(item, index) in ComponentsArray" :key="index">
      <span id="pane_head" v-if="$store.state.comp.arr[index] != 'dashboard'" class="flex spacebetween">
        <!-- <div>{{ $store.state.comp.arr[index].charAt(0).toUpperCase() + $store.state.comp.arr[index].slice(1) }}</div> -->
        <div>{{ $store.state.comp.paneTitle != undefined ? $store.state.comp.paneTitle : 'not assigned'}}</div>
        <div @click="close_pane(index)" class="pointer">&#10006;</div>
      </span>
      <div class v-bind:index="index" :is="ComponentsArray[index]"></div>
    </div>
  </div>
</template>

<script>
import shell from '@/server/sys/core-apps/shell/view/shell.vue'

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
      shell
  }
};
</script>

<style>
.box-shad{
  border: 6px sold red;
}
</style>
