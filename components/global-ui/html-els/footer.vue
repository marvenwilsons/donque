<template>
    <footer>
        <slot></slot>
        <div
        v-for="(html_el,html_el_i) in els"
        :key="html_el_i"
        :is="html_el.tag"
        :els="html_el.els"
        :style="html_el.inlineStyle"
        :class="html_el.classList"
        >{{html_el.innerText}}</div>
    </footer>
</template>

<script>
export default {
    name: 'html_footer',
    props: ["els"]
}
</script>

<style>

</style>
