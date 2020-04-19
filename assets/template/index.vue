<template>
    <v-flex>
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
        this.paneSettings({
            paneWidth: '400px',
            paneName: 'Pages',
            isClosable: true
        })
    }
}
</script>