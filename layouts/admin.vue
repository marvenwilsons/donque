<template>
  <div v-if="isReady" class="fullheight-VH relative" style="overflow:hidden">
    <div class="absolute  fullwidth fullheight-percent relative flex flexcol">
      <!-- modal container-->
      <div
        v-if="$store.state.modal.visibility"
        class="absolute bgblue fullwidth fullheight-percent flex flexcenter"
      >modal</div>
      <!-- nuxt -->
      <div class="borderred"> <dq_heading/> </div>
      <div style="flex:1"  class="flex fullwidth">
        <nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
import dq_heading from '@/components/admin_root/dq_head/dq_heading.vue'

export default {
  data() {
    return {
      isReady: true
    }
  },
  mounted() {
    this.$store.commit("modal/set_visibility", false);

    // check localstorage for auth token
    if(!localStorage.getItem('auth')){
      this.isReady = false
      location.href = 'dqlogin'
    }else {
      this.isReady = true
    }
  },
  components: {
    dq_heading
  }
};
</script>

<style>
.bgblue {
  background: blue;
}
</style>
