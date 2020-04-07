<template>
    <div class="flexcenter flex relative" style="height:100vh; overflow:hidden;" >
        <globalModal/>
        <v-flex class="absolute fullwidth fullheight-percent" >
            <appSideBar/>
            <v-flex pad125 >                
                <nuxt />
            </v-flex>
        </v-flex>
    </div>
</template>

<script>
import globalModal from '@/apps/globalModal/index'
import appSideBar from '@/apps/appSideBar/index'
import {mapGetters} from 'vuex'
export default {
    components: {
        globalModal,
        appSideBar
    },
    computed: {
        ...mapGetters(['queueAnswersArray','queueState', 'queueArray','queuePointer'])
    },
    watch: {
        // init
        queueArray(curState,prevState) {
            console.log('> queue state change detected')
            if(this.$store.state.queueState == 'end') {
                console.log('yes it ended')
                this.$store.commit('stateController', {
                    key: 'queueAnswersArray',
                    value: null
                })
                this.$store.commit('stateController', {
                    key: 'queuePointer',
                    value: null
                })
            }else if(prevState != 'end' || prevState != 'pause') {
                this.$store.commit('stateController', {
                    key: 'queueState',
                    value: 'running'
                })
            }
        },
        // execution
        queueState(curState,prevState) {
            if(curState == 'running' && prevState == null) {
                console.log('> processing queue items')
                this.$store.commit('stateController', {
                    key:"queuePointer",
                    value: 0
                })
            }
        },
        // next move
        queuePointer(curState,prevState){
            // execute item and wait for response
            // response writting is in helper.js answerpending method
            if(this.$store.state.queueState != null && this.$store.state.queueState != 'end') {
                console.log('> queue pointer change detected executing item:', curState)
                this.$store.commit('executeQueue')
            }
        },
        queueAnswersArray: {
            deep: true,
            handler(curState, prevState) {

                if(this.$store.state.queueState != 'end') {
                    if(curState.latestArrayState[this.$store.state.queuePointer].answer == '--done--') {
                        if(this.$store.state.queuePointer == curState.latestArrayState.length - 1 || this.$store.state.queueState == 'init end') {
                            console.log('Init ending')
                            // done
                            this.$store.commit('stateController', {
                                key: 'queueState',
                                value: 'end'
                            })
                            this.$store.commit('stateController', {
                                key: 'queue',
                                value: []
                            })
                        } else {
                            console.log('> queue answers change detected')
                            this.$store.commit('stateController', {
                                key:"queuePointer",
                                value: this.$store.state.queuePointer + 1
                            })
                        }
                    }

                    
                } else {
                    if(this.$store.state.queuePointer == null && this.$store.state.queueState == 'end') {
                        console.log('> reseting queue state')
                        this.$store.commit('stateController', {
                            key: 'queueState',
                            value: null
                        })
                    }
                }
            }
        }
    }
}
</script>


<style>
@import url("@/assets/dq-css/dq-fw-0.3.css");
@import url("@/assets/dq-css/normalize.css");
@import url("@/assets/dq-css/dq-theme-default.css");
</style>