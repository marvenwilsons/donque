<template>
    <main class="modalShadow" >
        <div style="background:var(--deftheme-dark-primary); color:white;" class="pad050" >
            <span class="padleft025" >loading</span>
        </div>
        <div class="pad050 borderRad4" >
            <div class="pad025">
                <v-flex class="borderRad4 marginbottom050" >
                    <v-flex class="pad050 borderRad4 backgroundinfo " >
                        {{data.msg}}
                    </v-flex>
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
        setTimeout(() => {
            this.answerPending('--done--')
        }, 100);
    }
}
</script>