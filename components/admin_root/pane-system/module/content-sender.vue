<template>
  <li @click="send" class="light-text">
    <slot></slot>
  </li>
</template>

<script>
export default {
  props: ["position", "component"],
  methods: {
    send() {
      this.$store.commit("addComponent", {
        component: this.component,
        position: this.position
      });
    }
  },
  mounted() {

  }
};
</script>

<style>
.light-text {
  /* padding-left: calc(var(--fontSize) * 1.25); */
  cursor: pointer;
}
</style>

