<template>
  <div id="mongbeans-host">
    <div class="flex">
      <span class="pad050">
        <strong>Key</strong>
      </span>
      <span
        :style="{maxWidth: $store.state.mongbeans.curr_width + 'px', minWidth: $store.state.mongbeans.curr_width + 'px' }"
        class="pad050"
      >
        <strong>Value</strong>
      </span>
      <span
        :style="{maxWidth: $store.state.mongbeans.curr_width + 'px', minWidth: $store.state.mongbeans.curr_width + 'px' }"
        class="pad050 flex flexcenter"
      >
        <strong>Type</strong>
      </span>
    </div>
    <mongbeans :inputData="inputData"/>
  </div>
</template>

<script>
import mongbeans from "./mongbeans.vue";
export default {
  props: ["inputData"],
  components: {
    mongbeans
  }
};
</script>

<style>
#mongbeans-host > div > span:nth-child(1) {
  flex: 1;
}
#mongbeans-host > div > span:nth-child(1) > strong {
  padding-left: 20px;
}
#mongbeans-host > div > span:nth-child(2) {
  flex: 1;
}
#mongbeans-host > div > span:nth-child(3) {
  flex: 1;
}
#mongbeans-host > div > span > strong{
  color: var(--dark-1)
}
</style>
