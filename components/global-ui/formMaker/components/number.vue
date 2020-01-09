<template>
  <div>
    <input
      v-model="text"
      :placeholder="` Enter ${placeholder}`"
      class="pad050 fullwidth borderRad4 dqinp"
      type="number"
    />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
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