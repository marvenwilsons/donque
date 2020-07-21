<template>
    <v-flex style="overflow-x : scroll" relative flexcol flexcenter flexstart  >
        <div class="absolute padbottom125" >
            <formBuilder
            @onSubmit="sumbit"
            @onNextForm="onNextForm"
            @onChange="() => {}"
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
            :behavior="{
                useGrouping: true,
                groups: ['Group 1','Group 2'],
                groupDetails: {
                    'Group 1' : 'This is group 1 details, this a sample text description',
                },
                showSubmitButtonOnComplete: true,
                useOfNext: true
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
    methods: {
        onNextForm({data,formMethods,submitMethods}) {
            if(data.username == undefined) {
                formMethods.username.error('username is a required field')
            } else {
                submitMethods.setLoading(true)
                setTimeout(() => {
                    submitMethods.setLoading(false)
                    submitMethods.next()
                }, 2000);
            }
        },
        sumbit({data,formMethods,submitMethods}) {
            if(data.username == undefined) {
                formMethods.username.error('username is a required field')
            } else {
                console.log('submitting to server')
                submitMethods.setLoading(true)
                setTimeout(() => {
                    console.log(data)
                    submitMethods.setLoading(false)
                }, 2000);
            }
        }
    },
    mounted() {
        // console.log('hello world! this is pageContent')
        this.fields = [
            {
                fieldLabel: 'username',
                fieldtype: 'string', // select, range, number, switch, multiselect, textarea
                fieldDetails: 'type your username',
                fieldId: '',
                defaultValue: '',
                dataSet: {},
                group: 'Group 1',
                // events
                onLoad: (element,form,error) => {
                },
                onInput: (element,form,error) => {
                    // validation
                    element.value == 'foo' ? error('this is an error') : element.removeError()
                    // hide
                    element.value == 'hide' && element.hide()
                    // addClass
                    element.value == 'borderred' ? element.addClass(element.value) : element.removeClass('borderred')
                    // mutate an input
                    form.password.setFieldDetails(`Set password for ${element.value}`)
                }                    
            },
            {
                fieldLabel: 'password',
                fieldtype: 'password', // select, range, number, switch, multiselect, textarea
                fieldDetails: 'Type your password',
                fieldId: '',
                dataSet: {},
                group: 'Group 1',
                onLoad: (element,form,error) => {
                    // console.log('this is form', form)
                },
                onInput: (element,form,error) => {
                    const username = form.username.value
                    // console.log(username, element.value)
                    // if(username == 'baz' && element.value == 'bar') {
                    //     form.Visitors.show()
                    //     form['Test Details'].show()
                    //     form['Allow Buffering Fragments'].show()
                    //     form['Value in numbers'].show()
                    //     form.Range.show()
                    // } else {
                    //     form.Visitors.hide()
                    //     form['Test Details'].hide()
                    //     form['Allow Buffering Fragments'].hide()
                    //     form['Value in numbers'].hide()
                    //     form.Range.hide()
                    // }
                }                    
            },
            {
                fieldLabel: 'Desc',
                fieldtype: 'textarea', // select, range, number, switch, multiselect, textarea
                fieldDetails: 'Type your description',
                fieldId: '',
                dataSet: {},
                group: 'Group 1',
                onLoad: (element,form,error) => {
                    // console.log('this is form', form)
                },
                onInput: (element,form,error) => {
                    
                }                    
            },
            {
                fieldLabel: 'Visitors',
                fieldtype: 'multiselect', // select, range, number, switch, multiselect, textarea
                fieldDetails: 'this is description',
                fieldId: '',
                defaultValue: ['foo'],
                dataSet: ['foo','bar'],
                // events
                onLoad: (element,form,error) => {
                    // element.hide()
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
                group: 'Group 2',
                // events
                onLoad: (element,form,error) => {
                    // element.hide()
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
                    // element.hide()
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
                group: 'Group 2',
                // events
                onLoad: (element,form,error) => {
                    // element.hide()
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
                group: 'Group 2',
                // events
                onLoad: (element,form,error) => {
                    // element.hide()
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
                group: 'Group 2',
                // events
                onLoad: (element,form,error) => {
                    // element.hide()
                },
                onInput: (element,form,error) => {
                    // console.log(element.value)
                    // if(element.value == 30) {
                    //     error('error!')
                    // } else {
                    //     element.removeError()
                    // }
                }                    
            },
        ]
    }
}
</script>