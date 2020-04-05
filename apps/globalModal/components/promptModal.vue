<template>
    <main >
    <div style="background:var(--deftheme-dark-primary); color:white;" class="pad050" >
        <span class="padleft025" >Prompt</span>
    </div>
    <div class="pad050 borderRad4" >
        <div class="pad025">
            <div class="padbottom025">
                {{data.label}}
            </div>
            <v-flex class="borderRad4 marginbottom050" >
                <input 
                    :placeholder="data.placeholder" id="modalStringPrompt" 
                    v-model="inp"
                    style="border: 4px solid #e9eff3;background:#e9eff3;" 
                    class="pad050 fullwidth borderRad4" type="text">
            </v-flex>
            <v-flex v-if="data.err" >
                <div class="backgrounderr pad025 fullwidth borderRad4 err padleft050" >error: {{data.err}}</div>
            </v-flex>
            <v-flex class="flexend margintop050 pad025">
                <button @click="answerPending(inp)" class="defbtn buttonreset marginright050">
                    Submit
                </button>
                <button @click="answerPending(false)" class="defbtn buttonreset">
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
        inp: null
    }),
    created() {
        this.h = this
    },
    mounted() {
        document.getElementById('modalStringPrompt').focus()
    }
}
</script>