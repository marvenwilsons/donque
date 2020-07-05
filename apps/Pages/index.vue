<template>
    <v-flex style="overflow-x : scroll" relative flexcol flexcenter flexstart  >
        <div class="absolute" >
            <formBuilder
            @onSubmit="() => {}"
            :appearance="{
                fieldElementClasses: ['pad125'],
                fieldElementCss: {
                    background:'white',
                },
                hostContainerCss: {
                    width: '550px',
                    background: 'white'
                },
                hostContainerClasses: ['margintop125','pad125','borderRad4']
            }"
            :fields="[
                {
                    // content and properties
                    fieldLabel: 'username',
                    fieldtype: 'string', // select, range, number, switch, multiselect, textarea
                    fieldDetails: 'this is description',
                    fieldId: '',
                    defaultValue: '',
                    dataSet: {},
                    // events
                    onLoad: (element,schema,prevInput,error) => {
                        
                    },
                    onInput: (element,schema,prevInput,error) => {
                        
                    }                    
                },
                {
                    fieldLabel: 'test',
                    fieldtype: 'select',
                    fieldDetails: 'test details',
                    fieldId: '',
                    defaultValue:'',
                    dataSet: ['foo','bar','test'],
                    // events
                    onLoad: (element,schema,prevInput,error) => {
                        
                    },
                    onInput: (element,schema,prevInput,error) => {}                    
                },
                {
                    fieldLabel: 'test',
                    fieldtype: 'switch',
                    fieldDetails: 'This label matches most of the examples in the Material Design documentation.',
                    fieldId: '',
                    defaultValue: true,
                    dataSet: {},
                    // events
                    onLoad: (element,schema,prevInput,error) => {
                        
                    },
                    onInput: (element,schema,prevInput,error) => {}                    
                },
                {
                    fieldLabel: 'test',
                    fieldtype: 'switch',
                    fieldDetails: 'This label matches most of the examples in the Material Design documentation.',
                    fieldId: '',
                    defaultValue: false,
                    dataSet: {},
                    // events
                    onLoad: (element,schema,prevInput,error) => {
                        
                    },
                    onInput: (element,schema,prevInput,error) => {}                    
                },
                {
                    fieldLabel: 'test',
                    fieldtype: 'number',
                    fieldDetails: 'This label matches most of the examples in the Material Design documentation.',
                    fieldId: '',
                    defaultValue: false,
                    dataSet: {},
                    // events
                    onLoad: (element,schema,prevInput,error) => {
                        
                    },
                    onInput: (element,schema,prevInput,error) => {}                    
                },
                
            ]"

        ></formBuilder>
        </div>
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