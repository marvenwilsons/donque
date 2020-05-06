<template>
    <v-flex flexcol >
        <div>
            <main style="background:darkgray" class="fullwidth" >
                <v-flex fullwidth   fullheight-percent >
                    <!-- <debug 
                        :data=" $store.state.pane"
                    /> -->
                    <!-- <debug 
                        :data="{
                            paneSystem: $store.state.pane
                        }"
                    /> -->
                    <debug 
                        :data="{
                            queue: $store.state.queue,
                            pointer: $store.state.queuePointer
                        }"
                    />
                </v-flex>
            </main>
        </div>
        <div :is="$store.state.app['app-current-view']" ></div>

    </v-flex>
</template>

<script>
import h from '@/helper'
import debug from '@/apps/debug/index'
import paneSystem from '@/apps/paneSystem/index'

export default {
    mixins: [h],
    created() {
        this.h = this
    },
    components: {
        debug,
        paneSystem
    },
    mounted() {

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