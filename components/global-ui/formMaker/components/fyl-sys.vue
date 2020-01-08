<template>
  <div>
    <!-- files added -->
    <div class="pad050 marginbottom025" style="border:1px dashed lightgray;border-radius:4px;">
      <div
        v-for="(files,file_index) in 0"
        :key="file_index"
        class="pad050 pointer margintop050 flex spacebetween"
        style="background:lightgray; border-radius:4px; "
      >
        <div>users/photos/john doe/12523451nhdf2.jpg</div>
        <div> <i class="fa fa-times marginright050"></i></div>
      </div>
      <div class="flex flexcenter dqbtnbg" v-if="files.length == 0">No {{name}}(s) yet</div>
    </div>
    <!-- add files -->
    <div class="flex flexcenter margintop050">
      <button class="buttonreset pad050 dqbtnbg borderRad4">Add new {{name}}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String
  },
  data: () => ({
      files: []
  })
};
</script>