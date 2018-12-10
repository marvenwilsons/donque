<template>
  <main class="fullheight-percent">
    <div id="docker-heading" class="flex flexcol">
      <div>
        fav icon here
      </div>
      <div>
        usergroup@marven
      </div>
    </div>
    <div>
      <ul>
        <li @click="send('dashboard',0)" class="light-text">Dashboard</li>
        <li @click="send('app',0)" class="light-text">App</li>
        <li @click="send('pages',0)" class="light-text">Pages</li>
        <li @click="send('collection',0)" class="light-text">Collection</li>
        <li @click="send('components',0)" class="light-text">Components</li>
        <li @click="send('databases',0)" class="light-text">Database</li>
        <li @click="send('files',0)" class="light-text">Files</li>
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
    send(comp, pos, width) {
      this.$store.commit("addComponent", { comp, pos, width });
    }
  }
};
</script>


<style scoped>
main {
  min-width: 200px;
}
.light-text{
    padding-left: calc(var(--fontSize)*1.25);
    cursor: pointer;
}
#docker-heading{
  padding-top: calc(var(--fontSize)*1.25);
  padding-bottom: calc(var(--fontSize)*1.25);
}
#docker-heading > div{
  text-align: center;
}
</style>
