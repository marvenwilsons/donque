<template>
  <div>
    <section v-for="(secs,secs_index) in data" :key="`sec-${secs_index}`">
      <div 
      :is="el['tag']" 
      v-for="(el,el_i) in secs['els']"
      :key="`${secs_index}-${el_i}`"
      
      :els="el.els"
      :style="el.inlineStyle"
      v-dq-prop="el"
      >{{el.properties.text_content}} </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: "default",
  name: "public_portal",
  props: ["data"],
};
</script>

<style>
</style>
