<template>
  <div>
    <slot></slot>
    <div
      v-show="latest_el_data"
      v-for="(html_el,html_el_i) in new_Els ? new_Els : els"
      :key="html_el_i"
      :is="html_el.tag"
      :els="html_el.els"
      :style="html_el.inlineStyle"
      :collection_data="el_data"
      :real_index="html_el_i"
      v-dq-event-handler
      v-dq-prop="html_el"
    >

      {{html_el.properties.text_content}}
    </div>
  </div>
</template>

<script>
import loopIndexMixin from "./loop-index-mixin";
export default {
  name: "html_div",
  mixins: [loopIndexMixin],
  props: ["els", "collection_data", "real_index", "indexed_collection_data"]
};
</script>
