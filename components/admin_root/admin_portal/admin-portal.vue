<template>
  <div class="fullwidth flex">
    <!-- docker -->
    <div
      :style="{
        flex:1, 
        minWidth:200+'px',
        background:$store.state.theme.docker_bg_color,
        color: $store.state.theme.docker_text_color
        }"
    >docker</div>

    <!-- main window -->
    <div
      :style="{flex: 9, background: $store.state.theme.main_bg_color}"
      class="relative"
    >
      main window
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

export default {
  components: {
    notify
  }
};
</script>

<style>
#dq_notification_parent{
    box-shadow: 2px 2px 15px 1px #393e4244;
}
</style>
