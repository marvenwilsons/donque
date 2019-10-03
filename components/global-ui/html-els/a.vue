<template>
    <a :href="true">
        <slot></slot>
        <div
        v-for="(html_el,html_el_i) in els"
        :key="html_el_i"
        :is="html_el.tag"
        :style="html_el.inlineStyle"
        v-dq-prop="html_el"
        >{{html_el.properties.text_content}}</div>
    </a>
</template>

<script>
export default {
    props: ['els']

}
</script>

<style>

</style>
