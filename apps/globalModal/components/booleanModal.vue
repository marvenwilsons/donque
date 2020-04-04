<template>
    <div  >
        <v-flex class="backgroundinfo pad125 marginbottom050" >
            {{data.question}}
        </v-flex>
        <v-flex class="flexend" >
            <button @click="submitAnswser(true)" class="defbtn marginright050 buttonreset">
                {{data.truthy}}
            </button>
            <button @click="submitAnswser(false)" class="defbtn buttonreset">
                {{data.falsey}}
            </button>
        </v-flex>
    </div>
</template>

<script>
import h from '@/helper'

export default {
    mixins: [h],
    props: {
        data: Object
    },
    created() {
        this.h = this
    },
    methods: {
        submitAnswser(value) {
            this.answerPending(value)
        }
    }
}
</script>