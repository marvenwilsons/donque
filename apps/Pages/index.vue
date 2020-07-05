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
            :fields="fields"
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
        fields: undefined
    }),
    mounted() {
        // console.log('hello world! this is pageContent')
        this.fields = [
                   {
                // content and properties
                fieldLabel: 'username',
                fieldtype: 'string', // select, range, number, switch, multiselect, textarea
                fieldDetails: 'this is description',
                fieldId: '',
                defaultValue: 'marvenwilsons',
                dataSet: {},
                // events
                onLoad: (element,form,error) => {
                    console.log('onload', element, form)
                },
                onInput: (element,form,error) => {

                }                    
            },
            {
                // content and properties
                fieldLabel: 'password',
                fieldtype: 'password', // select, range, number, switch, multiselect, textarea
                fieldDetails: 'Type your password',
                fieldId: '',
                defaultValue: 'marvenwilsons',
                dataSet: {},
                // events
                onLoad: (element,form,error) => {
                    console.log('onload', element)
                },
                onInput: (element,form,error) => {

                }                    
            },
            {
                // content and properties
                fieldLabel: 'Visitors',
                fieldtype: 'multiselect', // select, range, number, switch, multiselect, textarea
                fieldDetails: 'this is description',
                fieldId: '',
                defaultValue: ['foo'],
                dataSet: ['foo','bar'],
                // events
                onLoad: (element,form,error) => {
                    console.log('onload', element)
                },
                onInput: (element,form,error) => {

                }                    
            },
            {
                fieldLabel: 'Test Details',
                fieldtype: 'select',
                fieldDetails: 'Select test details',
                fieldId: '',
                defaultValue:'',
                dataSet: ['foo','bar','test'],
                // events
                onLoad: (element,form,error) => {

                },
                onInput: (element,form,error) => {}                    
            },
            {
                fieldLabel: 'Allow Buffering Fragments',
                fieldtype: 'switch',
                fieldDetails: 'This label matches most of the examples in the Material Design documentation.',
                fieldId: '',
                defaultValue: true,
                dataSet: {},
                // events
                onLoad: (element,form,error) => {

                },
                onInput: (element,form,error) => {}                    
            },
            {
                fieldLabel: 'Allow use of slug modes',
                fieldtype: 'switch',
                fieldDetails: 'This label matches most of the examples in the Material Design documentation.',
                fieldId: '',
                defaultValue: false,
                dataSet: {},
                // events
                onLoad: (element,form,error) => {

                },
                onInput: (element,form,error) => {}                    
            },
            {
                fieldLabel: 'Value in numbers',
                fieldtype: 'number',
                fieldDetails: 'This label matches most of the examples in the Material Design documentation.',
                fieldId: '',
                defaultValue: false,
                dataSet: {},
                // events
                onLoad: (element,form,error) => {

                },
                onInput: (element,form,error) => {}                    
            },
            {
                fieldLabel: 'Range',
                fieldtype: 'range',
                fieldDetails: 'This label matches most of the examples in the Material Design documentation.',
                fieldId: '',
                defaultValue: 30,
                dataSet: {},
                // events
                onLoad: (element,form,error) => {

                },
                onInput: (element,form,error) => {}                    
            },
        ]
    }
}
</script>