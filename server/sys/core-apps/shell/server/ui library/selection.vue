<template>
  <div>
    <div v-if="!response_data">Select an option</div>
    <div class="flex">
      <select
        @keyup.enter="selection"
        v-model="selected"
        name
        id="cli-select"
        :size="val.length"
        v-if="!response_data"
      >
        <option v-for="(items,key) in val" :key="key">
          <div :selected="key == 0 && 'selected'" :id="items.replace(' ','-')">{{items}}</div>
        </option>
      </select>
    </div>

    <div v-if="response_data">
      <div :is="response_data.uitype" :val="response_data.body" ></div>
    </div>
  </div>
</template>

<script>
import arrayList from "./arrayList.vue";
import current_status from "./current_status.vue"
import prompt from "./prompt.vue";
import selection from "./selection.vue";
import tableObject from "./tableObject.vue";
import err from "./err.vue";
import progress from "./progress.vue"
import stacks from "./stacks.vue"
import normal from "./normal.vue"

export default {
  props: ["val", "selfClass"],
  data() {
    return {
      default_selected: 0,
      selected: undefined,
      current_selected: undefined,
      response_data: undefined
    };
  },
  components: {
    arrayList,
    prompt,
    selection,
    tableObject,
    err,
    normal
  },
  methods: {
    selection() {
      this.current_selected = this.selected
      let sel_Val = `${this.current_selected.trim().replace(" ", "-")}`

      this.$axios
        .$post("/dq/dqcli", {
          data: `use ${this.selfClass} selectColor ${sel_Val}`,
          nested_mode: false,
          token: this.token
        })
        .then(res => {
          this.response_data = res.response;
          this.$parent._data.input_visible = true
        })
        .catch(e => {
          this.response_data = e;
          this.$parent._data.input_visible = true
        })
        this.$parent.fucosOn()
    }
  },
  mounted() {
    this.selected = this.val[0]
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


