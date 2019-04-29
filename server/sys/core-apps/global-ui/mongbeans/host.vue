<template>
  <div class="flex">
    <div class="fullwidth">
      <div class="borderred pad025">
        <strong>Key</strong>
      </div>
      <mongbeans v-bind:inputData="inputData"/>
    </div>
    <div class="fullwidth">
      <div class="borderred pad025">
        <strong>Value</strong>
      </div>
      <div v-for="(v,v_key) in myMongbeans" :key="v_key">
        <!-- object case -->
        <div v-for="(vv,vv_key) in v.val" :key="vv_key">
          <div
            v-if="gettype(vv) === 'object' && vv != null"
          >{{`{${Object.keys(vv).length} fields}`}}</div>
          <div v-if="vv == null">'null'</div>
          <div v-if="gettype(vv) === 'string'">"{{vv}}"</div>
          <div v-if="gettype(vv) === 'boolean'">{{vv}}</div>
        </div>
      </div>
    </div>
    <!-- type -->
    <div class="fullwidth">
      <div class="borderred pad025">
        <strong>Value</strong>
      </div>
      <div v-for="(v,v_key) in myMongbeans" :key="v_key">
        <!-- object case -->
        <div v-for="(vv,vv_key) in v.val" :key="vv_key">
          <div>{{capitalize(gettype(vv))}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mongbeans from "./mongbeans.vue";
import { mapGetters } from "vuex";

export default {
  props: ["inputData"],
  data() {
    return {
      vals: []
    };
  },
  components: {
    mongbeans
  },
  computed: {
    ...mapGetters({
      myMongbeans: "latestMongbeans",
      myExpandedCount: "getLatestExpandedCount"
    })
  },
  watch: {
    myExpandedCount() {
      // console.log("it changed!");
    }
  },
  mounted() {
    this.$store.dispatch("populateMongBeans", { val: this.inputData });
  },
  methods: {
    expandedData(v) {
      console.log("host loaded");
      this.vals.push(v);
    },
    gettype(v) {
      let finalType = undefined;
      if (typeof v === "object") {
        finalType = Array.isArray(v) ? "array" : "object";
      } else if (typeof v === "string" || typeof v === "number" || typeof v === 'boolean') {
        console.log('boolean')
        finalType = typeof v;
      }
      return finalType;
    },
    capitalize(str) {
      if (typeof str === "string") {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    }
  }
};
</script>

<style>
</style>
