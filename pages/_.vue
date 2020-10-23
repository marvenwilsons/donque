<template>
    <v-flex flexcol >
        <div :is="$store.state.app['app-current-view']" ></div>
    </v-flex>
</template>

<script>
import h from '@/helper'
import paneSystem from '@/apps/paneSystem/index'

export default {
    mixins: [h],
    created() {
        this.h = this
    },
    components: {
        paneSystem
    },
    layout: context => {
        const sysRoutes = [
            '/dqlogin',
            '/dqadmin',
            '/dqinit',
        ]
        if(!sysRoutes.includes(context.route.path)) {
            return 'default'
        } else if(context.route.path == '/dqlogin') {
            return 'login'
        } else if(context.route.path == '/dqadmin') {
            return 'admin'
        }  else if(context.route.path == '/dqinit') {
            return 'init'
        }
    }
}
</script>