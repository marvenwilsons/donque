<template>
    <main class="modalShadow" >
        <!-- <div style="background:var(--deftheme-dark-primary); color:white;" class="pad125" >
            <span class="padleft025" >loading</span>
        </div> -->
        <div style="border: 2px solid whitesmoke;" class="pad050 borderRad4" >
            <div class="padleft050 padtop050" >
                <div class="padleft025" >
                    {{headerTxt ? headerTxt : 'Please wait ...'}}
                </div>
            </div>
            <div class="pad025">
            <loading @progressMethod="p => progress = p" />
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
        inp: null,
        progress: undefined,
        headerTxt: undefined
    }),
    created() {
        this.h = this
    },
    methods: {
        headerText(txt) {
            this.headerTxt = txt
        }
    },
    mounted() {
        this.data.payload(this.progress,this.headerText,this.data.closeModal)
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
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>