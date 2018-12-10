<template>
  <div class="borderred flex">
    <div id="dq-page-list" class="flex flexcol f1">hello
      <li @click="send('pages',1)" class="light-text">Pages</li>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    send(comp, pos) {
        console.log('tes')
      this.$store.commit("addComponent", { comp, pos });
    }
  },
  mounted() {
    // this.$axios.get("/dq?command=pageList");
  }
};
</script>

<style>

</style>


