<template>
    <v-flex>
        this is page
        <pre>
            {{myData}}
        </pre>
    </v-flex>
</template>

<script>
import h from '@/helper'
import Templates from '@/templates'
export default {
    mixins: [h],
    props: ['myData','paneIndex'],
    created() {
        this.h = this
    },
    data: () => ({

    }),
    mounted() {
        console.log('hello world! this is pageContent')
    }
}
</script>