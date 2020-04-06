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
            }else if(prevState != 'end') {
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
        queuePointer(curState){
            console.log('> queue pointer change detected')
            // execute item and wait for response
            // response writting is in helper.js answerpending method
            if(this.$store.state.queueState != null && this.$store.state.queueState != 'end') {
                console.log('> Executing', this.$store.state.queueState)
                this.$store.commit('executeQueue')
            }
        },
        queueAnswersArray: {
            deep: true,
            handler(curState, prevState) {
                console.log('> queue answers change detected')
                // const curAnswer = curState.latestArrayState[curState.latestPointer].answer
                if(prevState.latestPointer != null && this.$store.state.queueState != 'end') {
                    console.log('> updating pointer to ', curState.latestPointer + 1)
                    if(curState.latestArrayState[curState.latestPointer].answer == '--done--') {
                        if( this.$store.state.queuePointer == curState.latestArrayState.length - 1) {
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
                            console.log( this.$store.state.queuePointer,curState.latestArrayState.length)
                            console.log( this.$store.state.queuePointer == curState.latestArrayState.length)
                            this.$store.commit('stateController', {
                                key:"queuePointer",
                                value: curState.latestPointer + 1
                            })
                        }
                    }

                    
                } else {
                    console.log('> reseting queue state')
                    if(this.$store.state.queuePointer == null && this.$store.state.queueState == 'end') {
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