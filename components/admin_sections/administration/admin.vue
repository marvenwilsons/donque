<template>
    <div>
        admin here
    </div>
</template>

<script>
export default {
    beforeCreate(){
        this.$store.commit('pane_system/set_pane_config', {
            target: 'Admin',
            head_visibility: true,
            title: 'Administrative options',
            pane_width: '30%',
        })
    }
}
</script>

<style>

</style>
