<template>
  <img :src="img === undefined ? '#' : `media/image/${img}`" />
</template>

<script>
export default {
  data: () => ({
    img: undefined
  }),
  mounted() {
    var imagelist = document.getElementsByTagName("img");
    for (let image of imagelist) {
      this.img = image.getAttribute("data-img");
    }
  }
};
</script>

<style>
</style>
