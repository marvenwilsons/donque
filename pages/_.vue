<template>
    <main style="background:darkgray" class="fullwidth" >
        <v-flex fullwidth   fullheight-percent >
            <debug :data="{
                QUESTIONS: $store.state.queue,
                queueConfig: {
                    queueExecType: $store.state.queueExecType,
                    pointer: $store.state.queuePointer,
                    currentAnswer: $store.state.queueCurrentTaskAnswer,
                    queueState: $store.state.queueState,
                    loop: $store.state.queueOnLoop,
                    static: $store.state.queueStatic
                },
                ANSWERS: $store.state.queueAnswersArray,
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
        this.runCompiledTask([
            {
                taskName: 'prompt',
                taskParam: {
                    type: 'string',
                    placeholder: 'password',
                    label: 'Type your full name',
                }
            },
            {
                taskName: 'closeModal',
                taskParam: {}
            },
            {
                taskName: 'exec',
                taskParam: (data) => {
                    console.log('this is the current data', data)
                    if(data === '$dcore.system.closeModal') {
                        return {
                            taskName: 'done',
                            taskParam: {}
                        }
                    } else {
                        // validate
                        return new Promise((resolve,reject) => {
                            setTimeout(() => {
                                console.log('done validating')
                                resolve( {
                                    taskName: 'resetTask',
                                    taskParam: {
                                        resetBackTo: 0,
                                        injectOrModifyProp: {
                                            err: `${data} is not a valid name`
                                        }
                                    }
                                })
                            }, 100);
                        })
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