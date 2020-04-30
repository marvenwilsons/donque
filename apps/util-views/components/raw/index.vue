<template>
    <v-flex >
        <code class="fullwidth" >
            {{myData}}
        </code>
    </v-flex>
</template>

<script>
import h from '@/helper'
import Templates from '@/templates'
export default {
    mixins: [h],
    props:['myData'],
    created() {
        this.h = this
    },
    data: () => ({

    }),
    methods: {

    }
}
</script>