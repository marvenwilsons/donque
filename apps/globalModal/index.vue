<template>
    <div v-if="$store.state.globalModalState" style="z-index:100;" 
        class="absolute fullwidth fullheight-percent flex flexcol flexcenter" >
        <div style="background:white;min-width:400px;" >
            <div style="background:var(--deftheme-dark-primary)" class="pad025" >
                Header
            </div>
            <div  class=" pad050 borerRad4" >
                <div class="margin025" >
                    Modal
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import h from '@/helper'
export default {
    mixins: [h],
    props: {
        myData: Object
    },
    created() {
        this.h = this
    },
    data: () => ({

    }),
}
</script>