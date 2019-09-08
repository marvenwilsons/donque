<template>
    <h4>
        <slot></slot>
        <div
        v-for="(html_el,html_el_i) in els"
        :key="html_el_i"
        :is="html_el.tag"
        :els="html_el.els"
        :style="html_el.inlineStyle"
        :class="html_el.classList"
        >{{html_el.properties.text_content}}</div>
    </h4>
</template>

<script>
export default {
    name: 'html_h4',
    props: ["els"]
}
</script>

<style>

</style>
