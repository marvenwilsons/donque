<template>
  <div class="marginbottom125">
    <span class="dq-editor-els-text-color">
      <i>{{name}}</i>
    </span>
    <input
      v-model="inp"
      type="text"
      class="fullwidth borderRad4 borderNone pad050 margintop025 dq-editor-els-text-color"
    />
  </div>
</template>

<script>
export default {
  props: ["name"],
  data: () => ({
    inp: undefined
  })
};
</script>


<style scoped >
.borderNone {
  border: 1px solid rgba(135, 206, 250, 0.411);
}
.borderNone:active {
  outline: none;
}
.borderNone:focus {
  outline: none;
}
</style>