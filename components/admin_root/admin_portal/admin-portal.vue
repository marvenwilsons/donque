<template>
  <div v-if="$store.state.dashboard_data.dashboard_ready" class="fullwidth flex">
    <!-- docker -->
    <div
      :style="{
        flex:1, 
        minWidth:180+'px',
        maxWidth:180+'px',
        }"
        v-dq-theme:docker="['background','color']"
    ><docker/></div>

    <!-- main window -->
    <div
      :style="{flex: 15, background: $store.state.theme.main_bg_color}"
      class="relative"
    >
      <mainWindow/>
    </div>

    <!-- notification -->
    <div class="relative">
      <div
        id="dq_notification_parent"
        style="width:450px; left:-450px; background:whitesmoke;"
        class="absolute fullheight-percent flex fullwidth flexcol"
      >
        <div class="flex flexcol fullheight-percent">
          <notify
            :bgColor="$store.state.theme.notify_bg_color"
            :textColor="$store.state.theme.notify_text_color"
          />
        </div>
      </div>
    </div>

    <!--  -->
  </div>
</template>

<script>
import notify from "@/components/admin_root/dq_notification/notify.vue";
import docker from "@/components/admin_root/dq_pane-system/docker/docker.vue"
import main_window from "@/components/admin_root/dq_pane-system/main-window/main-window.vue"

export default {
  components: {
    notify,
    docker,
    mainWindow: main_window
  }
};
</script>

<style>
#dq_notification_parent{
    box-shadow: 2px 2px 15px 1px #393e4244;
}
</style>
