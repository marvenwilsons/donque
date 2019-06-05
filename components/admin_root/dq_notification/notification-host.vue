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
    <main class="relative flex" id="notify_host_tiles">
      <div        
        v-if="notification_list.length"
        class=" flex flexcol absolute fullwidth"
      >
        <!-- notification tile -->
        <div
          class="notfy_items pointer pad050 flex padleft125 marginright125"
          @mouseover="mouse_over(`notif-${e}`)"
          @mouseleave="mouse_leave(`notif-${e}`)"
          v-for="(i,e) in notification_list"
          :id="`notif-${e}`"
          :key="`notify-tile-${e}`"
        >
          <!-- title and desc -->
          <div style="flex:9">
            <div>
              <strong>title here</strong>
            </div>
            <div>quick description here like the quick brown ...</div>
          </div>
          <!-- close btn -->
          <div style="flex:1" class="flex flexcenter pointer">
            <i :style="{color: $store.state.theme.notify_tile_close_btn_color}" class="fas fa-times"></i>
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
      msover: false,
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
  },
  methods: {
    mouse_over(id) {
      this.msover = true
          // :style="{background: msover ? 'green' : $store.state.theme.notify_tile_body_bg_color}"
      const el = document.getElementById(id)
      el.style.background = this.$store.state.theme.notify_tile_body_bg_hover_color
    },
    mouse_leave(id) {
      this.msover = false
      const el = document.getElementById(id)
      el.style.background = this.$store.state.theme.notify_tile_body_bg_color
    }
  },
  mounted() {
    const tile = document.getElementsByClassName("notfy_items")
    for(let i = 0; i < tile.length; i++){
      tile[i].style.background = this.$store.state.theme.notify_tile_body_bg_color
      tile[i].style.transition = '0.2s'
      tile[i].style['border-radius'] = this.$store.state.theme.notify_tile_border_radios
      tile[i].style.border = `2px solid ${this.$store.state.theme.notify_tile_border_color}`
    }
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
