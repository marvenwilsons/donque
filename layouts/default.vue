<template>
  <div class="borderred">
    <header>test</header>
    <div class="flex flexcenter">
      {{$store.state.app.data.msg}}
    </div>
    <main>
      <nuxt />
    </main>
    <footer>footer</footer>
  </div>
</template>

<script>
export default {
  mounted() {}
};
</script>



<style scoped>
@import url("@/assets/dq-css/normalize.css");
</style>
