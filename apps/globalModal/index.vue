<template>
    <div v-if="$store.state.globalModalState" style="z-index:100;" 
        class="absolute fullwidth fullheight-percent flex flexcol flexcenter" >
        <div class="borderRad4 modalShadow" style="background:white;min-width:400px;" >
            <div style="max-width:400px;"  class=" borerRad4" >
                <div >
                    <booleanModal 
                        v-if="$store.state.globalModalContentType == 'boolean'" 
                        :data="$store.state.globalModalContent"
                    />
                    <promptModal 
                        v-if="$store.state.globalModalContentType == 'prompt'" 
                        :data="$store.state.globalModalContent"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import h from '@/helper'
import booleanModal from './components/booleanModal'
import promptModal from './components/promptModal'
export default {
    mixins: [h],
    props: {
        myData: Object
    },
    created() {
        this.h = this
    },
    components: {
        booleanModal,
        promptModal
    }
}
</script>