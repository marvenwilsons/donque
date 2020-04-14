<template>
    <v-flex>
        this is files
    </v-flex>
</template>

<script>
import h from '@/helper'
import Templates from '@/templates'
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
    mounted() {
        this.paneSettings({
            paneWidth: '95%',
            paneName: 'Files',
            isClosable: true
        })
    }
}
</script>