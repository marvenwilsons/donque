<template>
    <main class="modalShadow" >
        <div style="background:var(--deftheme-dark-primary); color:white;" class="pad125" >
            <span class="padleft025" >Prompt</span>
        </div>
        <div class="pad050 borderRad4" >
            <div class="pad025">
                <v-flex borderRad4 marginbottom050 padtop125 flexcol >
                    <v-text-field
                        v-model="inp"
                        :placeholder="data.placeholder"
                        dense
                        :type="data.type ? data.type : 'string'"
                        :label="data.label"
                        outlined
                     :disabled="isLoading"
                    />
                    <loading @progressMethod="extractProgressMethod" />
                </v-flex>
                <v-flex v-if="data.err" >
                    <div class="backgrounderr pad050 fullwidth borderRad4 err padleft050" >
                        <div class="pad025" >
                            error: {{data.err}}
                        </div>
                    </div>
                </v-flex>
                <v-flex class="flexend margintop050 pad025">
                    <v-btn
                    :loading="isLoading"
                     color="primary" 
                     @click="onSumbit"
                     class="defbtn buttonreset marginright050">
                        Submit
                    </v-btn>
                    <v-btn 
                     :disabled="isLoading"
                    color="primary" @click="data.onCancel ? data.onCancel() : true" class="defbtn buttonreset ">
                        Cancel
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
    methods: {
        onSumbit() {
            this.data.onSubmit(this.inp, this.progressMethod,this.data.closeModal)
            this.isLoading = true
        },
        extractProgressMethod(method) {
            this.progressMethod = method
        }
    },
    mounted() {
        this.inp = this.data.defaultValue
    }
}
</script>