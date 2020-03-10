<template>
  <div style="width: 400px" class="pad050">
    <div class="pad050 padbottom125 backgrounderr err marginbottom050 borderRad4">
      There are staged changes that is not saved in the server database. Discard change and
      all of the items that you staged will be erased that cannot be recovered.
    </div>
    <div class="flex flexend">
      <div class="marginright050">
        <button
          @click="discard"
          class="pad050 pointer buttonreset darkprimary margin050 borderRad4"
        >Discard changes</button>
      </div>
      <button @click="save" class="pad050 pointer buttonreset darkprimary margin050 borderRad4">Save changes</button>
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
      this.$store.commit("pages/save_stage", {
        path: this.$store.state.pages.cur_path
      });
    }
  }
};
</script>