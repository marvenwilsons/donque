<template>
  <div v-if="isReady">
    <div class="mong-items pad025" v-for="(val,index) in inputData" :key="index">
      <!-- string case-->
      <div
        v-if="gettype(val) === 'string'"
        class="flex c-items2 margintop025 marginright025 "
      >
        <span class="mongbeans-key">{{index}}:</span>
        <span class="mongbeans-val-ind  flex">
          <span class="mongbeans-val-con ">"{{val}}"</span>
        </span>
        <span class="mongbeans-type-ind ">String</span>
      </div>
      <!-- obj case -->
      <div v-if="gettype(val) === 'obj' || gettype(val) === 'array'">
        <!-- object case expand -->
        <div class="flex  margin025">
          <span
            v-if="!openId[index]"
            @click="expand({isOpen: true, type: 'obj', val,index})"
            class="pointer mongbeans-expand-btn flex flexcenter"
          >&#43;</span>
          <span
            v-if="openId[index]"
            @click="expand({isOpen: false, type: 'obj', val,index})"
            class="pointer mongbeans-expand-btn flex flexcenter"
          >-</span>
          <span class="mongbeans-key">{{index}}</span>
          <span class="mongbeans-val-ind  flex">
            <span v-if="val != null" class="mongbeans-val-con ">{{`${Object.keys(val).length} fields`}}</span>
          </span>
          <span class="mongbeans-type-ind ">Object</span>
        </div>
        <div v-if="openId[index]" class="c-items">
          <mongbeans :inputData="val"/>
        </div>
      </div>
      <!-- array case -->
      <!-- number case -->
    </div>
  </div>
</template>

<script>
export default {
  name: "mongbeans",
  props: ["inputData"],
  data() {
    return {
      isOpen: false,
      isReady: true,
      openId: {}
    };
  },
  methods: {
    expand(data) {
      if (!this.openId[data.index]) {
        this.openId[data.index] = true;
        this.refresh();
      } else if (this.openId[data.index]) {
        this.openId[data.index] = false;
        this.refresh();
      }

      if (data.isOpen) {
        this.$store.dispatch("populateMongBeans", data);
      } else {
        this.$store.dispatch("trimMongBeansArray", data);
      }

      // this.$store.dispatch('incExpandedCount')
    },
    refresh() {
      this.isReady = false;
      this.isReady = true;
    },
    gettype(v) {
      let finalType = undefined;
      if (typeof v === "object") {
        finalType = Array.isArray(v) ? "array" : "obj";
      } else if (
        typeof v === "string" ||
        typeof v === "number" ||
        typeof v === "boolean"
      ) {
        finalType = typeof v;
      }
      return finalType;
    }
  },
  created() {}
};
</script>

<style>
.c-items {
  padding-left: 20px;
}
.c-items2 {
  margin-left: 20px;
}
.type-ind-str {
  color: white;
  border-radius: 2px;
  min-width: 15px;
}

.type-ind-obj {
  border-radius: 2px;
}
.mongbeans-val-ind {
  flex: 7;
  justify-content: flex-end;
}
.mongbeans-type-ind {
  flex: 1;
  justify-content: flex-end;
  min-width: 100px;
}
.mongbeans-key{
  display: flex;
}
.mongbeans-val-con {
  flex-basis: 600px;
  max-width: 500px;
  word-wrap: break-word;
}
.mongbeans-expand-btn {
  margin-right: 3px;
  margin-left: 3px;
  margin-top: 2px;
  padding-right: 2px;
  padding-left: 2px;
  font-weight: 600;
  min-width: 15px;
  border-radius: 2px;
  border: 1px solid white;
  max-height: 15px;
  background-color: var(--hover-blue);
  color: white;
}
.mong-items:hover{
  background-color: var(--hover-blue);
  color: white;
  cursor: pointer;
  transition: 0.3s;
}
</style>
