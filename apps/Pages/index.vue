<template>
    <v-flex style="overflow-y: scroll" relative flexcol borderred >
        <!-- this is page? -->
        
        <formBuilder
            @onSubmit="() => {}"
            :fields="[
                {
                    // content and properties
                    fieldLabel: 'username',
                    fieldtype: 'string', // select, range, number, switch, multiselect, textarea
                    fieldDescription: '',
                    fieldId: '',
                    // events
                    onLoad: (element,schema,prevInput,error) => {
                        
                    },
                    onInput: (element,schema,prevInput,error) => {}                    
                }
            ]"

        ></formBuilder>
        <!-- <v-flex style="overflow-y: scroll" >
            <div class="absolute" >
                <pre>
                    {{myData}}
                </pre>
            </div>
        </v-flex> -->
    </v-flex>
</template>

<script>
import h from '@/helper'
import Templates from '@/templates'
export default {
    mixins: [h],
    props: ['myData','paneIndex'],
    created() {
        this.h = this
    },
    data: () => ({

    }),
    mounted() {
        // console.log('hello world! this is pageContent')
    }
}
</script>