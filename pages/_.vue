<template>
    <main style="background:darkgray" class="fullwidth" >
        <v-flex fullwidth >
            <debug :data="{
                queue: $store.state.queue,
                queueConfig: {
                    queueExecType: $store.state.queueExecType,
                    pointer: $store.state.queuePointer,
                    currentAnswer: $store.state.queueCurrentTaskAnswer
                },
                queueAnswersArray: $store.state.queueAnswersArray
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
        this.createCompiledTask([
            {
                taskName: 'prompt',
                taskParam: {
                    type: 'string',
                    placeholder: 'password',
                    label: 'Type your name',
                }
            },
            {
                taskName: 'exec',
                taskParam: (data) => {
                    if(data == 'marven') {
                        return {
                            taskName: 'ask',
                            taskParam: {
                                question: 'who are you',
                                truthy: 'sumbit',
                                falsey: 'cancel'
                            }
                        }
                    } else {
                        return {
                            taskName: 'goBack',
                            taskParam: {
                                resetTo: 0,
                                injectOrModifyProp: {
                                    err: `${data} is not a valid name`
                                }
                            }
                        }
                    }
                    
                }
            },
            {
                taskName: 'done',
                taskParam: {}
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