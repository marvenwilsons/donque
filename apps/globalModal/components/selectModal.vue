<template>
    <main class="modalShadow" >
        <div style="background:var(--deftheme-dark-primary); color:white;" class="pad050" >
            <span class="padleft025" >Select</span>
        </div>
        <div class="pad050 borderRad4" >
            <div class="pad025">
                <div class="padbottom025">
                    {{data.label}}
                </div>
                <v-flex class="marginbottom050" >
                    <select v-model="inp"  style="border:1px solid lightgray;" class="pad050 fullwidth" >
                        <option v-for="opt in data.options" :key="opt" >
                            {{opt}}
                        </option>
                    </select>
                </v-flex>
                <v-flex v-if="data.err" >
                    <div class="backgrounderr pad025 fullwidth borderRad4 err padleft050" >error: {{data.err}}</div>
                </v-flex>
                <v-flex class="flexend margintop050 pad025">
                    <button @click="answerPending(inp)" class="defbtn buttonreset marginright050">
                        Submit
                    </button>
                    <button @click="answerPending('$dcore.system.closeModal')" class="defbtn buttonreset ">
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
        if(this.data.defaultValue) {
            this.inp = this.data.defaultValue
        }
    }
}
</script>