<template>
  <div class="borderred fullwidth flex">
    <div class="borderred" style="flex:1; min-width:200px;">docker</div>
    <div style="flex: 9" class="borderred relative">main window</div>
    <div class="relative">
      <div
        v-if="$store.state.notification_pane.isOpen"
        style="width:350px; left:-350px; background:whitesmoke;"
        class="absolute fullheight-percent pad025 flex fullwidth flexcol"
      >
        <div class="flex flexcol fullheight-percent" >
          <notify/>
        </div>
      </div>
    </div>
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
</style>
