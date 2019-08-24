<template>
  <div class="fullwidth pad125">
    <div :style="{border: `1px solid ${$store.state.theme.global.border_color}`}">
      <div
        :style="{
          background:`${$store.state.theme.global.secondary_bg_color}`,
          }"
        class="pad050 spacebetween flex st-viz-bnnr"
      >
        <strong>Notes</strong>
      </div>
      <div class="pad125">
        <textarea
          v-model="textarea_val"
          id="dq-page-addnote"
          style="resize: vertical"
          name="custom_Style"
          class="pad050 fullwidth"
          rows="10"
        ></textarea>
        <div @click="save_to_stage" class="flex flexend margintop050 pointer">stage changes</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea_val: undefined
    };
  },
  props: ["data"],
  methods: {
    save_to_stage() {
      this.$store.dispatch("pages/addrs_finder_mutator", {
        uid: `${this.data.index}--${this.data.uid}`,
        fn: locator => {
          this.$store.commit("pages/update_section", {
            desc: `added note to element - addrs: ${locator.join(
              " > "
            )}`,
            locator,
            scoped_variable: this.textarea_val,
            exec_on_prop: function(prop,tag,scoped_variable,obj) {
              obj.notes = scoped_variable
            }
          });
        }
      });
    }
  },
  mounted() {
    const textarea = document.getElementById("dq-page-addnote");
    textarea.focus();
  }
};
</script>