<template>
    <div>
        page here
    </div>
</template>

<script>
export default {
    beforeCreate() {
        this.$store.commit('pane_system/set_pane_config', {
            title: 'Page list',
            pane_width: '350px'
        })
    }
}
</script>

<style>

</style>
