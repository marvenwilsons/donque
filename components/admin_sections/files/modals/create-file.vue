<template>
  <div>
    <div class="flex flexcol">
      <input placeholder="File name" class="fullwidth pad025" type="text" name id="dqCreateFileInp" />
      <div class="flex flexend margintop050">
        <button class="pad050 buttonreset darkprimary">Create file</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['path'],
  mounted() {
    document.getElementById('dqCreateFileInp').focus()
  }
};
</script>

<style>
</style>