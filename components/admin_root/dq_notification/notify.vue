<template>
  <div
    id="dq_notification_pane"
    :style="{background: bgColor, color: textColor }"
    class="flex flexcol fullheight-percent"
  >
    <div class="flex flexend">
      <div @click="$store.commit('logout')" class="pointer pad025">
        <strong class="logout">logout</strong>
      </div>
    </div>
    <div>theme list here</div>
    <div class="flex" style="flex: 1">
      <notif-host class="borderred fullwidth" v-if="!$store.state.notification_pane.isOpen"/>
    </div>
  </div>
</template>

<script>
import { TweenMax, TimelineLite, TweenLite } from "gsap";
import notification_host from './notification-host.vue'
import { mapGetters } from "vuex";

export default {
  props: ["bgColor", "textColor", "notifications", "theme_list"],
  computed: {
    ...mapGetters({
      noti_state: "notification_pane/notification_state"
    })
  },
  watch: {
    noti_state(o, n) {
      if (n) {
        const n = document.getElementById("dq_notification_pane");
        TweenMax.fromTo(n, 0.2, { x: "350" }, { x: "0" });
      } else {
        const n = document.getElementById("dq_notification_pane");
        TweenMax.fromTo(n, 0.1, { x: "0" }, { x: "350" });
      }
    }
  },
  components:{
      notifHost: notification_host
  },
  mounted() {
    const n = document.getElementById("dq_notification_pane");
    TweenMax.fromTo(n, 0.1, { x: "0" }, { x: "350" });
  }
};
</script>

<style>
.logout:hover {
  border-bottom: 1px dashed white;
}
</style>
