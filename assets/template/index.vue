<template>
    <v-flex></v-flex>
</template>

<script>
import h from '@/helper'
import Templates from '@/templates'
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