<template>
    <div style="z-index:100;" class="absolute fullwidth fullheight-percent flex flexcenter" >
            MODAL
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
    methods: {

    }
}
</script>