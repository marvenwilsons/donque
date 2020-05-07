<template>
    <v-app class="flexcenter flex relative" style="height:100vh; overflow:hidden;" >
        <globalModal/>
        <v-content>
            <v-flex class="absolute fullwidth fullheight-percent" >
                <appSideBar/>
                <v-flex > 
                    <v-flex flexcol>
                        <div :style="{maxHeight: '50%', height: $store.state.dWinTop.winConfig.height}" v-if="$store.state.dWinTop" >
                            <v-flex relative fullheight-percent >
                                <div :myData="$store.state.dWinTop.data" :myConfig="$store.state.dWinTop.viewConfig" :is="$store.state.dWinTop.winView" ></div>
                            </v-flex>
                        </div>          
                        <nuxt />
                    </v-flex>
                </v-flex>
                <v-flex v-if="false"  style="background:var(--deftheme-dark-primary); z-index:100; max-width:500px; border-left:2px solid whitesmoke;" >
                        <!-- TODO: implement this view -->
                </v-flex>
            </v-flex>
        </v-content>
    </v-app>
</template>

<script>
import globalModal from '@/apps/globalModal/index'
import appSideBar from '@/apps/appSideBar/index'
import Templates from '@/templates'
import controlpanel from '@/apps/controlpanel/controlpanel'
import h from '@/helper'

import {mapGetters} from 'vuex'
export default {
    mixins: [h],
    components: {
        globalModal,
        appSideBar
    },
    computed: {
        ...mapGetters(['queueAnswersArray','queueState', 'queueArray','queuePointer'])
    },
    created() {
        this.h = this
        const { onAdminLoad } = controlpanel(this)
        onAdminLoad()
    },
    mounted() {
        const { onAdminMount } = controlpanel(this)
        onAdminMount()
    },
    watch: {
        // init
        queueArray(curState,prevState) {
            // console.log('> queue state change detected')
            if(this.$store.state.queueState == 'end') {
                // console.log('yes it ended')
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
                // console.log('> processing queue items')
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
                // console.log('> queue pointer change detected executing item:', curState)
                this.$store.commit('executeQueue')
            }
        },
        queueAnswersArray: {
            deep: true,
            handler(curState, prevState) {

                if(this.$store.state.queueState != 'end') {
                    if(curState.latestArrayState[this.$store.state.queuePointer].answer == '--done--') {
                        if(this.$store.state.queuePointer == curState.latestArrayState.length - 1 || this.$store.state.queueState == 'init end') {
                            // console.log('Init ending')
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
                            // console.log('> queue answers change detected')
                            if(curState.latestArrayState[this.$store.state.queuePointer].answer != null) {
                                this.$store.commit('stateController', {
                                    key:"queuePointer",
                                    value: this.$store.state.queuePointer + 1
                                })
                            }
                        }
                    }

                    
                } else {
                    if(this.$store.state.queuePointer == null && this.$store.state.queueState == 'end') {
                        // console.log('> reseting queue state')
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