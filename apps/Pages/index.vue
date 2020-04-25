<template>
    <v-flex style="overflow-y: scroll" relative >
        this is page
        <v-flex style="overflow-y: scroll" >
            <div class="absolute" >
                <pre>
                    {{myData}}
                </pre>
            </div>
        </v-flex>
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
        // console.log('hello world! this is pageContent')
    }
}
</script>