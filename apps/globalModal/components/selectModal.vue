<template>
    <main class="modalShadow" >
        <div style="background:var(--deftheme-dark-primary); color:white;" class="pad125" >
            <span class="padleft025" >Select</span>
        </div>
        <div class="pad050 borderRad4" >
            <div class="pad025">
                <v-flex class="marginbottom050 margintop125 flexcol" >
                    <v-select
                        dense
                        v-model="inp"
                        :items="data.options"
                        :label="data.label"
                        persistent-hint
                        outlined
                        :disabled="isLoading"
                    ></v-select>
                    <loading @progressMethod="extractProgressMethod" />
                </v-flex>
                <v-flex v-if="data.err" >
                    <div class="backgrounderr pad025 fullwidth borderRad4 err padleft050" >error: {{data.err}}</div>
                </v-flex>
                <v-flex class="flexend pad025">
                    <v-btn 
                        color="primary" 
                        @click="data.onCancel()" 
                        :disabled="isLoading"
                        class="marginright125 ">
                        Cancel
                    </v-btn>
                    <v-btn  
                        color="primary" 
                        @click="data.onSubmit(inp,progressMethod,data.closeModal), isLoading = true"
                        :loading="isLoading"
                        >
                        Submit
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
        inp: null,
        isLoading: false,
        progressMethod: undefined
    }),
    created() {
        this.h = this
    },
    mounted() {
        if(this.data.defaultValue) {
            this.inp = this.data.defaultValue
        }
    },
    methods: {
        extractProgressMethod(method) {
            this.progressMethod = method
        }
    }
}
</script>