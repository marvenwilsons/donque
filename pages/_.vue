<template>
    <v-app>
        <v-flex>
            hello
        </v-flex>
    </v-app>
</template>

<script>
import h from '@/helper'

export default {
    mixins: [h],
    data: () => ({

    }),
    created() {
        this.h = this
    },
    mounted() {
        this.newTask([
            {
                taskName: 'ask',
                taskPayload: {
                    question: 'are you sure you want to continue?',
                    truthy: 'yes continue',
                    falsey: 'no cancel'
                }
            },
            function(taskResult) {
                if(taskResult == true) {
                    return {
                        taskName: 'ask',
                         taskPayload: {
                            question: 'are you really sure you want to continue?',
                            truthy: 'yes continue',
                            falsey: 'no cancel'
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