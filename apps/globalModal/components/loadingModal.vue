<template>
    <main class="modalShadow" >
        <div style="background:var(--deftheme-dark-primary); color:white;" class="pad050" >
            <span class="padleft025" >loading</span>
        </div>
        <div class="pad050 borderRad4" >
            <div class="pad025">
                <v-flex class="borderRad4 marginbottom050" >
                    <v-flex class="borderRad4 backgroundinfo flexcenter flexstart" >
                        <div style="background: #629af4;" class="pad050">
                            <div style="" class="loader marginright025"></div>
                        </div>
                        <div class="padleft050" >{{data.msg}}</div>
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
        }, 10);
    }
}
</script>

<style>
.loader {
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid lightslategray; /* Blue */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>