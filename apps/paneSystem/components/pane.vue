<template>
    <v-flex flexcol >
        <div 
            style="background: var(--deftheme-dark-primary); color:white;"
            class="pad050" >
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
                <div :paneIndex="paneIndex" :is="myData.paneView" ></div>
            </v-flex>
        </v-flex>
    </v-flex>
</template>

<script>
import h from '@/helper'
export default {
    mixins: [h],
    props: {
        myData: Object,
        paneIndex: Number
    },
    created() {
        this.h = this
    },
    data: () => ({

    }),
    methods: {

    }
}
</script>