<template>
  <li :id="component.id" @click="send" class="light-text">
    <slot></slot>
  </li>
</template>

<script>
export default {
  props: ["position", "component"],
  data() {
    return {
      isActive: undefined
    };
  },
  methods: {
    send() {
      // document.getElementById(this.component.id).className += ' active'
      // console.log(document.getElementById(this.component.id).className += ' active')
      this.$store.commit("addComponent", {
        component: this.component,
        position: this.position
      });
    }
  },
  mounted() {}
};
</script>

<style>
.light-text {
  /* padding-left: calc(var(--fontSize) * 1.25); */
  cursor: pointer;
}
</style>

