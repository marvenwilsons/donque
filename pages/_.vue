<template>
    <main style="background:darkgray" class="fullwidth" >
        <v-flex fullwidth   fullheight-percent >
            <!-- <debug :data="{
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
            }" /> -->
            <debug 
                :data="{
                    'PANE-SYSTEM': {
                        pane: $store.state.pane
                    }
                }"
            />
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
                taskName: 'loginfo',
                taskParam: {
                    msg: 'hello world'
                }
            },
            {
                taskName: 'closeModal',
                taskParam: {}
            },
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