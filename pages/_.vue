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
                taskName: 'ask',
                taskParam: {
                    question: 'are you sure you want to continue?',
                    truthy: 'yes continue',
                    falsey: 'no cancel'
                }
            },
            {
               taskName: 'closeModal',
               taskParam: {}
            },
            {
                taskName: 'ask',
                taskParam: {
                    question: 'ARE YOU REALLY REALLY REALLY SURE?',
                    truthy: 'yes continue',
                    falsey: 'no cancel'
                }
            },
            {
               taskName: 'closeModal',
               taskParam: {}
            },
            {
                taskName: 'exec',
                taskParam(curentAnswer) {
                    if(curentAnswer)  {
                        return {
                            taskName: 'ask',
                            taskParam: {
                                question: 'HELLO WORLD!',
                                truthy: 'Why Helllo There',
                                falsey: 'GEt OUT!'
                            }
                        }
                    } else {
                        return {
                            taskName: 'ask',
                            taskParam: {
                                question: 'Are you sure you want to cancel transaction?',
                                truthy: 'Yes',
                                falsey: 'No'
                            }
                        }
                    }
                }
            },
            {
               taskName: 'closeModal',
               taskParam: {}
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