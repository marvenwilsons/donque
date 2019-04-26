<template>
  <div>
    <!-- {{inputData}} -->
    <div>
      <span @click="expand" class="pointer">+</span>
      <span>{{inputData['key']}}</span>
      <span>[{{inputData['val'].length}} elements]</span>
      <span>Array</span>
    </div>
    <div v-if="isOpen">
      <div v-for="(val,index) in inputData['val']" :key="index" class="borderred arr-items">
        <div :is="gettype(val) === 'object' ? 'obj' : gettype(val)" v-bind:inputData="{val, key:index, from: 'Array'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import array_comp from "./arr-view.vue";
import str_comp from "./str-view.vue";
import obj_comp from "./obj-view.vue"

export default {
  props: ["inputData"],
  data() {
    return {
      isOpen: false
    };
  },
  components: {
    array: array_comp,
    string: str_comp,
    obj: obj_comp
  },
  methods: {
    expand() {
      this.isOpen = !this.isOpen;
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
  }
};
</script>

<style>
.arr-items {
  margin-left: 25px;
}
</style>
