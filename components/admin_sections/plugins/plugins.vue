<template>
    <div>
        plugins here
    </div>
</template>

<script>
export default {
    beforeCreate(){
        this.$store.commit('pane_system/set_pane_config', {
            title: 'Plugins',
            pane_width: '500px'
        })
    }
}
</script>