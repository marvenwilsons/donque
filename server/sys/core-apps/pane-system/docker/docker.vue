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
      <docker-items/>
    </div>
  </main>
</template>

<script>
import dockerItems from './docker-items.vue'

export default {
  methods: {
    send(comp, pos, width) {
      this.$store.commit("addComponent", { comp, pos, width });
    }
  },
  components: {
    dockerItems
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
