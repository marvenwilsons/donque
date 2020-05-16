// uniview is used when you have an array of data, but each item in array is not
// the same type and data structure, uniview is greate when you have an array of data
// that does not follow a schema.

// uniview can also be used with a schema based data. 
<template>
    <v-flex v-if="univiewDataSet" style="overflow-y:scroll;" relative >
        <div class="absolute fullwidth " >
            <v-flex flexwrap :class="[flexDirection]" >
                <div class="flex" :style="{margin: myConfig.uniview.itemMargin}" v-for="(item,itemIndex) in univiewDataSet" :key="itemIndex" >
                    <div
                        :myData="actions.syspane.getServiceView(item).paneConfig.paneData"
                        :myConfig="actions.syspane.getServiceView(item).componentConfig"
                        :is="actions.syspane.getServiceView(item).paneConfig.paneViews[actions.syspane.getServiceView(item).paneConfig.defaultPaneView]" >
                    </div>
                </div> 
            </v-flex>    
        </div>       
    </v-flex>
</template>

<script>
import h from '@/helper'
import Templates from '@/templates'
import 'vue-json-viewer/style.css'

export default {
    mixins: [h],
    props:['myData','myConfig'],
    created() {
        this.h = this
    },
    data: () => ({
        t: undefined,
        univiewDataSet: undefined,
        flexDirection: undefined
    }),
    mounted() {
        if(!Array.isArray(this.myData)) {
            this.systemError('Invalid Uniview dataSet type, it should be an array')
        } else {
            this.univiewDataSet = this.myData

            if(this.myConfig.uniview) {
                if(this.myConfig.uniview.flexDirection) {
                    if(this.myConfig.uniview.flexDirection == 'col') {
                        this.flexDirection = 'flexcol'
                    }
                }
            }
        }
    }
}
</script>