<template>
    <v-flex id="dq-host-container" style="overflow-y:auto;background:#7fccff;"  class="relative" >
        <div class="fullwidth" style="position:fixed;" >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 1440 320"
                >
                <path 
                    fill="#0099ff" 
                    fill-opacity="1"
                    d="M0,320L48,304C96,288,192,256,288,229.3C384,203,480,181,576,186.7C672,192,768,224,864,208C960,192,1056,128,1152,138.7C1248,149,1344,235,1392,277.3L1440,320L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
        </div>
        <div :style="{width: isFullWidth ? '100%' : 'initial'}" @keyup.alt.67="clear" tabindex="0"  
            class="absolute fullheight-percent fullwidth" 
            style="display:inline-block;" >
            <v-flex class="flexcol fullheight-percent" :style="{width: isFullWidth ? '100%' : 'initial'}" >
                <v-flex id="dq-main-w" class="relative fullheight-percent padright050" >
                    <v-flex
                    class="margintop050 marginbottom050 marginleft025"
                    v-for="(pane,index) in $store.state.pane" 
                    :key="`${index}${index + 10}${index + 30}`" 
                    :style="{maxWidth: pane.paneConfig.paneWidth, minWidth: pane.paneConfig.paneWidth, zIndex: '100'}">
                        <pane 
                                :style="{
                                    background:'f7f9fc',
                                    borderRadius:'4px', 
                                    overflow: 'hidden', 
                                    maxWidth: pane.paneConfig.paneWidth == '100%' ? fullWidth(true) : pane.paneConfig.paneWidth && fullWidth(false), 
                                    minWidth: pane.paneConfig.paneWidth == '100%' ? fullWidth(true) : pane.paneConfig.paneWidth && fullWidth(false)
                                    }" 
                                class="paneShadow gl" 
                                :myData="pane"
                                :paneIndex="index"
                            >
                        </pane>
                    </v-flex>
                </v-flex>
            </v-flex>
        </div>
    </v-flex>
</template>

<script>
import h from '@/helper'
import pane from './components/pane'
export default {
    mixins: [h],
    props: {
        myData: Object
    },
    components: {
        pane
    },
    created() {
        this.h = this
    },
    data: () => ({
        isFullWidth: false
    }),
    methods: {
        clear() {
            this.actions.sysmodal.spawn({
                modalType: 'custom',
                modalPayload: {
                    view: 'dqpanepgnate'
                }
            })
        },
        fullWidth(w) {
            this.isFullWidth = w
            return '100%'
        }
    }
}
</script>

<style>
.gl {
    /* background-attachment: fixed; */
    background: inherit;
    position: relative;
    background-color: rgba(248, 247, 247, 0.541);  
    backdrop-filter: blur(15px);
}
.gl:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.884);
    filter: blur(10px);
    
}
</style>