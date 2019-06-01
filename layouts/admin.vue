<template>
  <div class="fullheight-VH relative" style="overflow:hidden">
    <div class="absolute  fullwidth fullheight-percent relative flex flexcol">
      <!-- modal container-->
      <div
        v-if="$store.state.modal.visibility"
        class="absolute bgblue fullwidth fullheight-percent flex flexcenter"
      >modal</div>
      <!-- nuxt -->
      <div class="borderred">head</div>
      <div style="flex:1"  class="flex fullwidth borderred">
        <nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("modal/set_visibility", false);

    // check localstorage for auth token
    console.log(localStorage.getItem('auth'))
  }
};
</script>

<style>
.bgblue {
  background: blue;
}
</style>
