<template>
    <main style="background:darkgray" class="fullwidth" >
        <v-flex fullwidth >
            <debug :data="{
                queue: $store.state.queue
            }" />
        </v-flex>
    </main>
</template>

<script>
import h from '@/helper'
import debug from '@/apps/debug/index'

export default {
    mixins: [h],
    data: () => ({

    }),
    created() {
        this.h = this
    },
    components: {
        debug
    },
    mounted() {
        this.newTask([
            {
                type1: {
                    taskName: 'ask',
                    taskParam: {
                        question: 'are you sure you want to continue?',
                        truthy: 'yes continue',
                        falsey: 'no cancel'
                    }
                }
            },
            {
                type2: function(taskResult) {
                    if(taskResult == true) {
                        return {
                            taskName: 'ask',
                            taskParam: {
                                question: 'are you really sure you want to continue?',
                                truthy: 'yes continue',
                                falsey: 'no cancel'
                            }
                        }
                    }
                }
            }
        ])
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