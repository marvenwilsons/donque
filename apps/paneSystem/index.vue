<template>
    <v-flex id="dq-host-container" style="overflow-y:auto;background:#7fccff;"  relative >
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
        <div  class="absolute fullheight-percent borderred" style="display:inline-block;" >
            <v-flex id="dq-main-w" fullheight-percent borderred >
                <v-flex
                margin050 
                v-for="(pane,index) in $store.state.pane" 
                :key="`${index}${index + 10}${index + 30}`" 
                :style="{maxWidth: pane.paneConfig.paneWidth, minWidth: pane.paneConfig.paneWidth}">
                    <pane 
                            :style="{background:'#f7f9fc',borderRadius:'4px', overflow: 'hidden', maxWidth: pane.paneWidth, minWidth: pane.paneWidth}" 
                            class="paneShadow marginright050" 
                            :myData="pane"
                            :paneIndex="index"
                        >
                    </pane>
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
    }
}
</script>