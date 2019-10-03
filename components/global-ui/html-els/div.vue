<template>
  <div>
    <slot></slot>
    <div
      v-for="(html_el,html_el_i) in els"
      :key="html_el_i"
      :is="html_el.tag"
      :els="html_el.els"
      :style="html_el.inlineStyle"
      v-dq-prop="html_el"
    >{{html_el.properties.text_content}}</div>
  </div>
</template>

<script>
export default {
  name: "html_div",
  props: ["els"]
};
</script>

<style>
</style>
