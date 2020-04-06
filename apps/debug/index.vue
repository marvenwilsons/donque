<template>
  <div class="bordergray flex flexcol relative margin125" >
   <div style="color:white;" class="pointer ">
     <div @click="collapse = !collapse" class="bgblue pad025">{{!collapse ? 'expand': 'collapse'}}</div>
   </div>
   <div v-if="collapse" style="overflow-y: hidden; min-height:400px;" class="flex1 relative">
    <div style="height:100%;" class="flex fullwidth fullheight-percent absolute">
      <div
        style="max-width:300px;min-width:250px;"
        class="bordergray flex flexcol"
        v-for="(entries, entries_key) in data"
        :key="`deubug-${entries_key}`"
      >
        <div class="bgblue pad025" style="color:white;">
          <strong>{{entries_key}}</strong> -
          {{Array.isArray(entries) ? 'Array' : typeof entries}}
        </div>
        <div style="background:whitesmoke;" class="bordergray flex1 debugwin">
          <pre>{{entries == undefined ? 'undefined' : entries}}</pre>
        </div>
        <div style="background:lightgray;">
          Length: {{entries && Array.isArray(entries) ? entries.length : entries ? Object.keys(entries).length : 'NaN'  }}
        </div>
      </div>
    </div>
   </div>

  </div>
</template>

<script>
export default {
  props: ["data"],
  data: () => ({
    collapse: true,
  }),
  watch: {
    data(current,prev) {
      // console.log(current)
    }
  }
};
</script>

 <style>
.debugwin {
  overflow: auto;
  max-width: 300px;
}
.bordergray {
  border: 1px solid rgba(128, 128, 128, 0.76);
}
</style>