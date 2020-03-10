<template>
  <section>
    <slot></slot>
    <div
      v-show="latest_el_data"
      v-for="(html_el,html_el_i) in new_Els ? new_Els : els"
      :key="html_el_i"
      :is="html_el.tag"
      :els="html_el.els"
      :style="html_el.inlineStyle"
      v-dq-event-handler
      v-dq-prop="html_el"
    >
      {{latest_el_data ? get_prop(html_el.properties,html_el) : ''}}
      {{latest_el_data ? is_dynamic(html_el.properties.text_content) ? html_el.properties.text_content : get_textContent(html_el.properties.text_content,html_el_i) : '' }}
    </div>
  </section>
</template>

<script>
import loopIndexMixin from './loop-index-mixin'
export default {
  name: "html_section",
  mixins: [loopIndexMixin],
  props: ["els"],
};
</script>

<style>
</style>
