<template>
    <v-flex>
        <div>
            hello this is dqFormBuilder
            <input v-model="sample" type="text">
        </div>
        <v-btn @click="submit" >
            Submit
        </v-btn>
            <!-- {{myData}} -->
    </v-flex>
</template>

<script>
import h from '@/helper'
import Templates from '@/templates'
export default {
    mixins: [h],
    props: ['paneIndex', 'submitHandler'],
    data: () => ({
        sample: undefined
    }),
    created() {
        this.h = this
    },
    methods: {
        submit() {
            this.submitHandler(this.sample)
        }
    }
}
</script>