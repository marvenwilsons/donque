<template>
    <div>
        Messages here
    </div>
</template>

<script>
export default {
    beforeCreate(){
        this.$store.commit('pane_system/set_pane_config', {
            title: 'Messages',
        })
    }
}
</script>

<style>

</style>
