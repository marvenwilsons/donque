<template>
    <v-flex>
        this is dashboard
        {{$store.state.app['app-admin-sidebar-items']}}
    </v-flex>
</template>

<script>
import h from '@/helper'
import Templates from '@/templates'
export default {
    mixins: [h],
    props: {
        myData: Object,
        paneIndex: Number
    },
    created() {
        this.h = this
    },
    data: () => ({

    }),
    mounted() {
        console.log(this.$store.state.app['app-admin-sidebar-items'])
        this.paneSettings({
            paneWidth: '95%',
            paneName: 'Dashboard',
            isClosable: false
        })
    }
}
</script>