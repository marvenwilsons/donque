<template>
  <div v-if="isReady" class="fullheight-VH relative" style="overflow:hidden">
    <div class="absolute fullwidth fullheight-percent relative flex flexcol">
      <!-- modal container-->
      <div
        v-if="$store.state.modal.visibility"
        class="absolute bgblue fullwidth fullheight-percent flex flexcenter"
      >modal</div>
      <!-- nuxt -->
      <div>
        <heading :bgColor="'blue'" :textColor="'white'" :adminName="$store.state.dashboard_data.admin_name"/>
      </div>
      <div style="flex:1" class="flex fullwidth">
        <nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
import heading from "@/components/admin_root/dq_head/dq_heading.vue";

export default {
  data() {
    return {
      isReady: true
    };
  },
  mounted() {
    this.$store.commit("modal/set_visibility", false);

    if (localStorage.getItem("username")) {
      this.$store.dispatch("dashboard_data/set_admin_data", {
        username: localStorage.getItem("username"),
        token: localStorage.getItem("auth")
      });
    } else {
      location.href = "dqlogin";
    }

    // check localstorage for auth token
    if (!localStorage.getItem("auth")) {
      this.isReady = false;
      location.href = "dqlogin";
    } else {
      this.isReady = true;
    }
  },
  components: {
    heading
  }
};
</script>

<style>
.bgblue {
  background: blue;
}
</style>
