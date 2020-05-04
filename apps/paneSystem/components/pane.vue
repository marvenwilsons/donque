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
            <!-- pane modal -->
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
                    <div style="background: var(--deftheme-dark-primary);color:white;" class="pad125" >
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
                    <v-flex style="background:whitesmoke;" pad125 flexcol borderRad4 >
                        <!-- modal Error -->
                        <div
                            v-if="$store.state.pane[paneIndex].paneConfig.modal.modalErr" 
                            class="backgrounderr err borderRad4 pad050 marginbottom125" >
                            {{$store.state.pane[paneIndex].paneConfig.modal.modalErr}}
                        </div>
                        <!-- modal Info -->
                        <div
                            v-if="$store.state.pane[paneIndex].paneConfig.modal.modalInfo" 
                            class="backgroundinfo borderRad4 pad050 marginbottom125" >
                            {{$store.state.pane[paneIndex].paneConfig.modal.modalInfo}}
                        </div>
                        <!-- custom modals -->
                        <div 
                            v-if="!['logWarn','logErr','logInfo','logPrompt'].includes($store.state.pane[paneIndex].paneConfig.modal.modalBody)"
                            :is="$store.state.pane[paneIndex].paneConfig.modal.modalBody" 
                            :myConfig="$store.state.pane[paneIndex].paneConfig.modal.modalConfig" 
                            :paneIndex="paneIndex" 
                            :submitHandler="onModalData">
                        </div>
                        <!-- logs -->
                        <div
                            v-if="['logWarn','logErr','logInfo'].includes($store.state.pane[paneIndex].paneConfig.modal.modalBody)"
                            >
                            <div 
                                :class="['pad050', 'borderRad4',
                                        $store.state.pane[paneIndex].paneConfig.modal.modalBody == 'logErr' && 'backgrounderr',
                                        $store.state.pane[paneIndex].paneConfig.modal.modalBody == 'logInfo' && 'backgroundinfo',
                                        $store.state.pane[paneIndex].paneConfig.modal.modalBody == 'logWarn' && 'backgroundwarn',
                                    ]" 
                                >
                                <div class="pad025" >
                                    {{$store.state.pane[paneIndex].paneConfig.modal.modalConfig.msg}}
                                </div>
                            </div>
                            <v-flex margintop125 flexend>
                                <v-btn @click="$store.state.pane[paneIndex].paneConfig.modal.modalConfig.fn" color="primary" >continue</v-btn>
                            </v-flex>
                        </div>
                        <!-- panePrompt -->
                        <div
                            v-if="$store.state.pane[paneIndex].paneConfig.modal.modalBody === 'logPrompt'"
                        >
                            <div v-if="$store.state.pane[paneIndex].paneConfig.modal.modalConfig.type === 'string' || $store.state.pane[paneIndex].paneConfig.modal.modalConfig.type === 'number' " >
                                <v-text-field
                                    v-model="logPromptData"
                                    dense
                                    :label="$store.state.pane[paneIndex].paneConfig.modal.modalHeader"
                                    outlined
                                    :loading="$store.state.pane[paneIndex].paneConfig.modal.modalErr ? false : isLoading"
                                />
                            </div>
                            <div v-if="$store.state.pane[paneIndex].paneConfig.modal.modalConfig.type === 'select' " >
                                <v-select
                                    v-model="logPromptData"
                                    dense
                                    :items="$store.state.pane[paneIndex].paneConfig.modal.modalConfig.value"
                                    :label="$store.state.pane[paneIndex].paneConfig.modal.modalHeader"
                                    outlined
                                ></v-select>
                            </div>
                            <div v-if="$store.state.pane[paneIndex].paneConfig.modal.modalConfig.type === 'multiselect' " >
                                <v-combobox
                                    chips
                                    v-model="logPromptData"
                                    :items="$store.state.pane[paneIndex].paneConfig.modal.modalConfig.value"
                                    :label="$store.state.pane[paneIndex].paneConfig.modal.modalHeade"
                                    multiple
                                ></v-combobox>
                            </div>
                            <div v-if="$store.state.pane[paneIndex].paneConfig.modal.modalConfig.type === 'password' " >
                                this is log prompt
                            </div>
                            <v-flex flexend >
                                <v-btn 
                                    color="primary" 
                                    @click="paneModalCb"
                                    :loading="$store.state.pane[paneIndex].paneConfig.modal.modalErr ? false : isLoading"
                                    >
                                    submit</v-btn>
                            </v-flex>
                        </div>

                    </v-flex>
                </main>
            </v-flex>
            <!-- pane body -->
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

export default {
    mixins: [h],
    props: ['myData','paneIndex'],
    created() {
        this.h = this
    },
    data:() => ({
        logPromptData: undefined,
        isLoading: false
    }),
    computed: {
        paneModal() {
            return this.$store.state.pane[this.paneIndex].paneConfig.modal
        }
    },
    watch: {
        paneModal() {
            this.isLoading = false
            try {
                this.logPromptData = this.$store.state.pane[this.paneIndex].paneConfig.modal.modalConfig.defaultValue
            }catch(err) {} 
        },
        logPromptData() {
            this.isLoading = false
            this.$store.commit('paneModalUpdate', {
                paneIndex: this.paneIndex,
                payload: {
                    key: 'modalErr',
                    value: undefined
                }
            })
        }
    },
    mounted() {
        this.normyDep(this.paneIndex,this)
    },
    methods: {
        onModalData(data) {
            const { paneMethods, modalMethods, dWinMethods} =  this.normyDep(this.paneIndex,this)
            this.$store.state.pane[this.paneIndex].paneConfig.modal.onModalData(data,paneMethods,modalMethods,dWinMethods)
        },
        paneModalCb() {
            this.isLoading = true
            if(this.$store.state.pane[this.paneIndex].paneConfig.modal.modalConfig.type === 'number'){
                this.logPromptData = parseInt(this.logPromptData)
            }

            this.$store.state.pane[this.paneIndex].paneConfig.modal.modalConfig.fn(this.logPromptData)
        }
    }
}
</script>