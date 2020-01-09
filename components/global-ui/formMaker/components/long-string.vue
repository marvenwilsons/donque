<template>
  <div>
    <textarea v-model="text" :name="name" class="pad050 dqinp" id cols="91" rows="2"></textarea>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    propkey: String
  },
  data: () => ({
    text: undefined
  }),
  watch: {
    text() {
      this.$emit("onInput", { [this.propkey]: this.text });
    }
  }
};
</script>

<style scoped>
</style>