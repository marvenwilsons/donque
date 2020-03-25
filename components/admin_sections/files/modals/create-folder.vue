<template>
  <div>
    <div class="flex flexcol">
      <input placeholder="Folder name" class="fullwidth pad025" type="text" name id="dqCreateFolderInp" />
      <div class="flex flexend margintop050">
        <button class="pad050 buttonreset darkprimary">Create folder</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['path'],
  mounted() {
    document.getElementById('dqCreateFolderInp').focus()
  }
};
</script>

<style>
</style>