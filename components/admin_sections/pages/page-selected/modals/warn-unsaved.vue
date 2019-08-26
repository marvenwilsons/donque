<template>
  <div style="width: 400px" class="pad050">
    <div class="pad050 padbottom125">
      There are staged changes that is not saved in the server database. Discard change and
      all of the items that you staged will be erased that cannot be recovered.
    </div>
    <div class="flex flexend">
      <span
        @click="discard"
        :style="{...$store.state.theme.modal_button_style}"
        class="pad050 pointer margin050"
      >Discard changes</span>
      <span
        @click="save"
        :style="{...$store.state.theme.modal_button_style}"
        class="pad050 pointer margin050"
      >Save changes</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    discard() {
      this.$store.commit("nextAction");
      this.$store.commit("pages/clear_stage");
    },
    save() {
      this.$store.commit("nextAction");
      this.$store.commit('pages/save_stage',{path: this.$store.state.pages.cur_path})
    }
  }
};
</script>