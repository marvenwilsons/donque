<template>
    <div>
        profile here
    </div>
</template>

<script>
export default {
    beforeCreate(){
        this.$store.commit('pane_system/set_pane_config', {
            title: 'Your profile',
            pane_width: '500px'
        })
    }
}
</script>