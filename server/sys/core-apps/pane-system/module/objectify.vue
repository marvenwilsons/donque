<template>
  <div>
    <table v-if="isReady" id="dq-objtfy-table" class="objtotbl">
      <tr>
        <th class="objtfy-th">key</th>
        <th class="objtfy-th">value</th>
        <th class="objtfy-th">type</th>
      </tr>
      <tr class="mytr mytrtxt" v-for="(keys,str_index) in dataStringSet" :key="str_index">
        <td>{{Object.keys(keys)[0]}}</td>
        <td>{{keys[Object.keys(keys)[0]] === '' ? `null` : `"${keys[Object.keys(keys)[0]]}"`}}</td>
        <td>{{gettype(keys[Object.keys(keys)[0]])}}</td>
      </tr>
      <objtfyObjView
        class="mytr mytrtxt"
        v-for="(obj_keys,obj_index) in dataObjSet"
        :key="`${obj_index}-${obj_keys}-obj`"
        v-bind:inputData="dataObjSet"
      />
    </table>
  </div>
</template>

<script>
import objtfyArrView from "./objectify-array-view.vue";
import objtfyObjView from "./objectify-object-view.vue";
import objtfyStrView from "./objectify-str-view.vue";

export default {
  props: ["inputData"],
  data() {
    return {
      keys: undefined,
      values: undefined,
      types: undefined,
      currentSelected: undefined,
      isReady: false,
      rawData: this.inputData,
      dataStringSet: [],
      dataObjSet: []
    };
  },
  components: {
    objtfyArrView,
    objtfyObjView
  },
  watch: {
    inputData(o, n) {
      console.log("it changed!");
      const arr = [];
      this.rawData = this.inputData;
      // key
      Object.keys(this.rawData).map(e => {
        arr.push({ [e]: this.rawData[e] });
      });

      this.keys = arr;
    }
  },
  methods: {
    insert(value, index) {
      console.log("inserted");
      console.log(value);
      console.log(index);

      if (this.gettype(value) === "array") {
        this.keys.splice(index + 1, 0, ...value);
      } else if (this.gettype(value) === "object") {
        Object.keys(value).map(e => {
          this.keys.splice(index + 1, 0, { [e]: value[e] });
        });
      }
    },
    getfields(v) {
      // console.log("get fields");
      if (v === null) {
        return "null";
      } else {
        return `${Object.keys(v).length} fields`;
      }
    },
    gettype(v) {
      let finalType = undefined;
      if (typeof v === "object") {
        finalType = Array.isArray(v) ? "array" : "object";
      } else if (typeof v === "string" || typeof v === "number") {
        finalType = typeof v;
      }

      return finalType;
    }
  },
  mounted() {
    this.isReady = true;
    const arr = [];

    // key
    Object.keys(this.rawData).map(e => {
      // arr.push({ [e]: this.rawData[e] });
      if (this.gettype(this.rawData[e]) === "string") {
        this.dataStringSet.push({ [e]: this.rawData[e] });
      } else if (this.gettype(this.rawData[e]) === "object") {
        this.dataObjSet.push({ [e]: this.rawData[e] });
      }
    });
  }
};
</script>

<style scoped>
.objtfy-th {
  flex: 1;
}
</style>
