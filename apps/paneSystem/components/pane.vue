<template>
    <v-flex flexcol >
        <div 
            style="background: var(--deftheme-dark-primary); color:white;"
            class="pad125" >
                <v-flex spacebetween >
                    <div style="color:whitsmoke" >
                        {{$store.state.pane[paneIndex].paneConfig.paneName}}
                    </div>
                    <div v-if="$store.state.pane[paneIndex].paneConfig.isClosable" >
                        <span 
                            @click="closePane"
                            class="pointer"
                            style="color:white; font-weight:100" >
                            	&#x2716;
                        </span>
                    </div>
                </v-flex>
        </div>
        <v-flex flex1 relative >
            <v-flex absolute flexcenter fullwidth fullheight-percent >
                <main v-if="myData.modalBody"  style="min-width:50%;border: 1px solid rgba(54, 54, 54, 0.096);" class="borderRad4 modalShadow" >
                    <div style="background: var(--deftheme-dark-primary);color:white;" class="pad050" >
                        <v-flex spacebetween>
                            <span>Header</span>
                            <span 
                                class="pointer"
                                style="color:white; font-weight:100" >
                                    &#x2716;
                            </span>
                        </v-flex>
                    </div>
                    <v-flex>
                        body
                    </v-flex>
                </main>
            </v-flex>
            <v-flex>
                <!-- {{$store.state.pane[paneIndex]}} -->
                <div 
                    :id="$store.state.pane[paneIndex].paneConfig.paneName" 
                    :myConfig="$store.state.pane[paneIndex].componentConfig" 
                    :paneIndex="paneIndex" 
                    :is="$store.state.pane[paneIndex].paneConfig.paneView" 
                    :myData="$store.state.pane[paneIndex].paneConfig.paneData" >
                </div>
            </v-flex>
        </v-flex>
    </v-flex>
</template>

<script>
import h from '@/helper'
import templates from '@/templates'
import utils from '@/utils'

export default {
    mixins: [h],
    props: ['myData','paneIndex'],
    created() {
        this.h = this
    },
    beforeMount() {
        console.log('> beforeMount')
        try {
            this.getServiceView(this.myData.paneConfig.paneData)
        } catch(err) {
            console.error('pane beforeMount error in pane.vue \n', err)
            return
        }
    }
}
</script>