<template>
  <main class="borderred fullheight-percent">
    <div>
      <ul>
        <li @click="send('dashboard',0)" class="light-text">Dashboard</li>
        <li @click="send('app',0)" class="light-text">App</li>
        <li @click="send('pages',0)" class="light-text">Pages</li>
        <li @click="send('collection',0)" class="light-text">Collection</li>
        <li @click="send('components',0)" class="light-text">Components</li>
        <li @click="send('databases',0)" class="light-text">Database</li>
        <li @click="send('media',0)" class="light-text">Media</li>
        <li @click="send('plugins',0)" class="light-text">Plugins</li>
        <li @click="send('marketplace',0)" class="light-text">Marketplace</li>
        <li @click="send('shell',0)" class="light-text">shell</li>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  methods: {
    send(comp, pos) {
      this.$store.commit("addComponent", { comp, pos });
    }
  }
};
</script>


<style scoped>
main {
  min-width: 200px;
}
</style>
