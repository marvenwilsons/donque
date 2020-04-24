<template>
    <v-flex flexcol >
        <div 
            style="background: var(--deftheme-dark-primary); color:white;"
            class="pad125" >
                <v-flex spacebetween >
                    <div>
                        {{myData.paneName}}
                    </div>
                    <div v-if="myData.isClosable" >
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
                <div v-if="componentConfig" :myConfig="componentConfig" :paneIndex="paneIndex" :is="myData.paneView" :myData="myData.paneData.data" ></div>
            </v-flex>
        </v-flex>
    </v-flex>
</template>

<script>
import h from '@/helper'
import templates from '@/templates'

export default {
    mixins: [h],
    props: ['myData','paneIndex'],
    created() {
        this.h = this
    },
    data: () => ({
        componentConfig: null
    }),
    methods: {

    },
    mounted() {
        const p = this.myData.paneData
        const helper = {
            runCompiledTask : this.runCompiledTask,
            getCompiledTask : this.getCompiledTask,
            paneSettings: this.paneSettings,
            paneModal : this.paneModal,
            paneAdd : this.paneAdd,
            paneGetView: this.paneGetView
        }
        const deserializeViews = new Function('return ' + p.views)()
        const {paneOnLoad,component,componentConfig} = 
        deserializeViews(p.data,helper,null/**TODO: import utils here */,templates)
        this.viewFilter = deserializeViews
        paneOnLoad()
        this.$store.commit('paneSwitchView', {
            paneIndex: this.paneIndex,
            paneView: component
        })
        this.componentConfig = componentConfig
    }
}
</script>