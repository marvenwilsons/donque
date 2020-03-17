<template>
  <div>
    <span class="flex">
      <span class="flex1 flex flexcenter" >Link To:</span>
      <input v-model="text" class="pad025 fullwidth flex6 dqinp" type="text" />
    </span>
    <div class="flex flexend margintop125">
        <button class="buttonreset pad050 padleft125 padright125 borderRad4">Save</button>
    </div>
  </div>
</template>

<script>
export default {
    data: () => ({
        text: undefined
    })
};
</script>

<style>
</style>