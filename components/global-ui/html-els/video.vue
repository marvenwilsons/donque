<template>
  <video :src="require(`@/public/media/audio/${vid}`)"></video>
</template>

<script>
export default {
  data: () => ({
    vid: "_.mp4"
  }),
  mounted() {
    var audiolist = document.getElementsByTagName("video");
    for (let audio of audiolist) {
      this.aud = audio.getAttribute("data-vid");
    }
  }
};
</script>

<style>
</style>
