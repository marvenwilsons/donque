<template>
  <div>
    <div>Select an option</div>
    <!-- <div  >&#8674;</div> -->
    <div class="flex">
      <select
        @keyup.enter="selection"
        v-model="selected"
        name
        id="cli-select"
        :size="val.length"
      >
        <option v-for="(items,key) in val" :key="key">
          <div :id="items.replace(' ','-')">{{items}}</div>
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import arrayList from "./arrayList.vue";
import prompt from "./prompt.vue";
import selection from "./selection.vue";
import tableObject from "./tableObject.vue";
import err from "./err.vue";

export default {
  props: ["val","selfClass"],
  data() {
    return {
      default_selected: 0,
      selected: undefined,
      current_selected: undefined
    };
  },
  methods: {
    selection() {
      this.current_selected = this.selected.replace(/[^a-zA-Z0-9]/g, " ");
      let sel_Val = `${this.current_selected.trim().replace(" ", "-")}`;
      console.log(this.val)
      this.$axios.$post("/dq/dqcli", {
        data: `use ${this.selfClass} selectColor ${sel_Val}`,
        nested_mode: false,
        token: this.token
      }).then((res) => {
        console.log(res)
      })
    }
  },
  mounted() {
    console.log(this.selfClass)
    console.log(this.$parent.user_input)
    document.getElementById("cli-select").focus();
    this.$parent._data.input_visible = false;
  }
};
</script>

<style>
.show {
  display: block;
}
.hide {
  display: none !important;
}
.cli-output-option-select-items {
  margin-left: 10px;
}
#cli-select {
  overflow: auto;
  min-width: 100%;
  background: none;
  color: white;
  outline: none;
  border: none;
  margin-top: calc(var(--fontSize) * 1.25);
}
</style>


