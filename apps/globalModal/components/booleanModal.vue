<template>
<main >
    <div style="background:var(--deftheme-dark-primary); color:white;" class="pad125" >
        <span class="padleft025" >Confirmation required</span>
    </div>
    <div class="pad050 borderRad4" >
        <div class="pad025">
            <v-flex class="backgroundinfo pad050 borderRad4 marginbottom050" >
                <span class="pad025" >{{data.question}}</span>
            </v-flex>
            <loading @progressMethod="p => progress = p" />
            <v-flex class="flexend margintop050 pad025">
                <v-btn
                    :loading="isLoading" 
                    color="primary" 
                    @click="submitAnswer(true)" 
                    class="defbtn marginright050 buttonreset">
                    {{data.truthy}}
                </v-btn>
                <v-btn :disabled="isLoading" color="primary" @click="submitAnswer(false)" class="defbtn buttonreset">
                    {{data.falsey}}
                </v-btn>
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
        progress: undefined,
        isLoading: false
    }),
    created() {
        this.h = this
    },
    methods: {
        submitAnswer(value) {
            this.isLoading = true
            this.data.cb(value,this.progress,this.data.closeModal)
        }
    }
}
</script>