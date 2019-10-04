<template>
  <audio :src="aud === undefined ? '#' : require(`@/static/media/audio/${aud}`)"></audio>
</template>

<script>
export default {
  data: () => ({
    aud: undefined,
  }),
  mounted() {
    var audiolist = document.getElementsByTagName("audio");
    for (let audio of audiolist) {
      this.aud = audio.getAttribute("data-aud");
    }
  }
};
</script>

<style>
</style>
