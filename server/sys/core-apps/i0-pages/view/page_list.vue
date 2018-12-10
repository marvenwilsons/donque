<template>
  <div id="i0-page-list" class="flex">
    <div id="dq-page-list" class="flex flexcol f1">
      <div>
        search here
      </div>
      <div>
        list here
      </div>
      <sender :component="'pagesDetails'"        :position="1" > home </sender>
    </div>
  </div>
</template>

<script>
import sender from '@/server/sys/core-apps/pane-system/module/component-sender.vue'
export default {
  data() {
    return {};
  },
  methods: {
    send(comp, pos) {
        console.log('tes')
      this.$store.commit("addComponent", { comp, pos });
    }
  },
  components:{
    sender
  },
  mounted() {
    // this.$axios.get("/dq?command=pageList");
  }
};
</script>

<style>
#i0-page-list{
  min-width: 400px;
}
</style>


