<template>
    <main class="modalShadow" >
        <div style="background:var(--deftheme-dark-primary); color:white;" class="pad125" >
            <span class="padleft025" >log info</span>
        </div>
        <div class="pad050 borderRad4" >
            <div class="pad025">
                <v-flex class="borderRad4 marginbottom050" >
                    <v-flex class="pad050 borderRad4 backgroundinfo " >
                        {{data.msg}}
                    </v-flex>
                </v-flex>
                <v-flex class="flexend margintop050 pad025">
                    <button @click="closeGlobalModal()" class="defbtn buttonreset ">
                        close
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
    }
}
</script>