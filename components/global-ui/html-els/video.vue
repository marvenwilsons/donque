<template>
  <video :src="vid == undefined ? '#' : require(`@/public/media/video/${vid}`)"></video>
</template>

<script>
export default {
  data: () => ({
    vid: undefined
  }),
  mounted() {
    var videolist = document.getElementsByTagName("video");
    for (let video of videolist) {
      this.vid = video.getAttribute("data-vid");
    }
  }
};
</script>

<style>
</style>
