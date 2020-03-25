<template>
 <a @click="refresh" href="">{{els}}</a>
</template>

<script>
export default {
  props: ["els"],
  methods: {
    refresh() {
      window.location.reload()
    }
  }
}
</script>

<style>

</style>