<template>
<main >
    <div style="background:var(--deftheme-dark-primary); color:white;" class="pad050" >
        <span class="padleft025" >Confirmation required</span>
    </div>
    <div class="pad050 borderRad4" >
        <div class="pad025">
            <v-flex class="backgroundinfo pad050 borderRad4 marginbottom050" >
                <span class="pad025" >{{data.question}}</span>
            </v-flex>
            <v-flex class="flexend margintop050 pad025">
                <button @click="submitAnswer(true)" class="defbtn marginright050 buttonreset">
                    {{data.truthy}}
                </button>
                <button @click="submitAnswer(false)" class="defbtn buttonreset">
                    {{data.falsey}}
                </button>
            </v-flex>
        </div>
    </div>
</main>
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
        submitAnswer(value) {
            this.answerPending(value)
        }
    }
}
</script>