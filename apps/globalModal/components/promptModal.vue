<template>
    <main >
    <div style="background:var(--deftheme-dark-primary); color:white;" class="pad050" >
        <span class="padleft025" >Prompt</span>
    </div>
    <div class="pad050 borderRad4" >
        <div class="pad025">
            <div class="padbottom025">
                {{data.msg}}
            </div>
            <v-flex class="borderRad4 marginbottom050" >
                <input v-model="inp" style="border: 4px solid #e9eff3;background:#e9eff3;" class="pad050 fullwidth" type="text">
            </v-flex>
            <v-flex class="flexend margintop050 pad025">
                <button @click="submitAnswer(inp)" class="defbtn buttonreset marginright050">
                    Submit
                </button>
                <button @click="submitAnswer(false)" class="defbtn buttonreset">
                    Cancel
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
    data: () => ({
        inp: undefined
    }),
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