<template>
    <v-fle></v-fle>
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