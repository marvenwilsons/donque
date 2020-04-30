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
            <v-flex
                v-if="$store.state.pane[paneIndex].paneConfig.modal.modalBody != undefined"  
                style="z-index:900" absolute flexcenter fullwidth fullheight-percent >
                <main 
                    
                    :style="{
                            width: $store.state.pane[paneIndex].paneConfig.modal.modalWidth ? 
                                $store.state.pane[paneIndex].paneConfig.modal.modalWidth : '70%',
                            border: `1px solid rgba(54, 54, 54, 0.096)`,
                            maxHeight: '90%'
                        }" 
                    class="borderRad4 modalShadow" >
                    <div style="background: var(--deftheme-dark-primary);color:white;" class="pad050" >
                        <v-flex spacebetween>
                            <span>{{$store.state.pane[paneIndex].paneConfig.modal.modalHeader}}</span>
                            <span
                                v-if="$store.state.pane[paneIndex].paneConfig.modal.isClosable"
                                @click="closePaneModal(paneIndex)"
                                class="pointer"
                                style="color:white; font-weight:100" >
                                    &#x2716;
                            </span>
                        </v-flex>
                    </div>
                    <v-flex pad125 flexcol >
                        <div
                            v-if="$store.state.pane[paneIndex].paneConfig.modal.modalErr" 
                            class="backgrounderr err borderRad4 pad050 marginbottom125" >
                            {{$store.state.pane[paneIndex].paneConfig.modal.modalErr}}
                        </div>
                        <div
                            v-if="$store.state.pane[paneIndex].paneConfig.modal.modalInfo" 
                            class="backgroundinfo borderRad4 pad050 marginbottom125" >
                            {{$store.state.pane[paneIndex].paneConfig.modal.modalInfo}}
                        </div>
                        <div 
                            :is="$store.state.pane[paneIndex].paneConfig.modal.modalBody" 
                            :myConfig="$store.state.pane[paneIndex].paneConfig.modal.modalConfig" 
                            :paneIndex="paneIndex" 
                            :submitHandler="onModalData">
                        </div>
                    </v-flex>
                </main>
            </v-flex>
            <v-flex>
                <div 
                    :id="$store.state.pane[paneIndex].paneConfig.paneName" 
                    :myConfig="$store.state.pane[paneIndex].componentConfig" 
                    :paneIndex="paneIndex" 
                    :is="$store.state.pane[paneIndex].paneConfig.paneViews[$store.state.pane[paneIndex].paneConfig.defaultPaneView]" 
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

const modalMethods = {
    closePaneModal: function(scope,paneIndex) {
        scope.$store.commit('paneModalUpdate', {
            paneIndex,
            payload: 'closeModal'
        })
    },    
}

export default {
    mixins: [h],
    props: ['myData','paneIndex'],
    created() {
        this.h = this
    },
    mounted() {
        this.paneOnLoad(this.paneIndex)
    },
    methods: {
        onModalData(data) {
            return ((paneIndex,scope) => {
                return this.$store.state.pane[this.paneIndex].paneConfig.modal.onModalData(data,{
                    closePaneModal: function() {
                        scope.$store.commit('paneModalUpdate', {
                            paneIndex,
                            payload: 'closeModal'
                        })
                    },
                    appendErrorMsg: function(msg) {
                        scope.$store.commit('paneModalUpdate', {
                            paneIndex,
                            payload: {
                                key: 'modalErr',
                                value: msg
                            }
                        })
                        scope.$store.commit('paneModalUpdate', {
                            paneIndex,
                            payload: {
                                key: 'modalInfo',
                                value: undefined
                            }
                        })
                    },
                    appendInfoMsg: function(msg) {
                        scope.$store.commit('paneModalUpdate', {
                            paneIndex,
                            payload: {
                                key: 'modalErr',
                                value: undefined
                            }
                        })
                        scope.$store.commit('paneModalUpdate', {
                            paneIndex,
                            payload: {
                                key: 'modalInfo',
                                value: msg
                            }
                        })
                    },
                    updateProps: function({key,value}) {
                        scope.$store.commit('paneModalUpdate', {
                            paneIndex,
                            payload: {
                                key,
                                value
                            }
                        })
                    },
                    appendView: function({viewName,componentConfig}) {

                    },
                    logError: this.logError,
                    logInfo: this.logInfo
                })
            })(this.paneIndex,this)
        }
    }
}
</script>