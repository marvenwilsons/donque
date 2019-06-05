<template>
  <div class="flex flexcol">
    <div v-if="!notification_list.length" class="flex flexcenter flexcol">
      <div>
        <i style="font-size:30px" class="far fa-bell"></i>
      </div>
      <div class="pad025">
        <strong>no notification</strong>
      </div>
    </div>
    <div>
      <strong>Notifications</strong>
    </div>
    <main class=" relative flex" id="notify_host_tiles">
      <div        
        v-if="notification_list.length"
        class=" flex flexcol absolute fullwidth"
      >
        <!-- notification tile -->
        <div
          class="notfy_items pointer pad050 flex"
          style="border:1px solid gray;"
          v-for="i in notification_list"
          :key="i"
        >
          <!-- title and desc -->
          <div class style="flex:9">
            <div>
              <strong>title here</strong>
            </div>
            <div>quick description here like the quick brown ...</div>
          </div>
          <!-- close btn -->
          <div style="flex:1" class="flex flexcenter pointer">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notification_list: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ]
    };
  }
};
</script>

<style>
.notfy_items {
  margin-top: calc(var(--fontSize) * 0.5);
}
#notify_host_tiles {
  overflow: auto;
  flex:1;
}
</style>
