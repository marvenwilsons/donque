<template>
    <main v-if="isReady" class="borderred" >
        test
    </main>
</template>

<script>
import h from '@/helper'
import Templates from '@/templates'
export default {
    mixins: [h],
    props: ['fields','behavior','appearance'],
    data: () => ({
        sample: undefined,
        isReady: false
    }),
    created() {
        this.h = this
    },
    mounted() {
        this.isReady = true
        console.log('test', this.getFieldItems())
        
    },
    computed: {
        behaviorProperties() {
            return {
                // fieldRenderingMode
                fieldRenderingMode: (() => {
                    if(this.behavior && this.behavior.fieldRenderingMode != undefined) {
                        const fieldRenderingMode = ['default','useNext']
                        const isValidMode = fieldRenderingMode.includes(this.behavior.fieldRenderingMode)
                        if(isValidMode) {
                            return this.behavior.fieldRenderingMode
                        } else {
                            this.systemError(`FormBuilder Error: Invalid fieldRenderingMode value: ${this.behavior.fieldRenderingMode}`)
                        }
                    } else {
                        return 'default'
                    }
                })(),
                // showSubmitButtonOnComplete
                showSubmitButtonOnComplete: (() => {
                    if(this.behavior && typeof this.behavior.showSubmitButtonOnComplete) {
                        if(typeof this.behavior.showSubmitButtonOnComplete != 'boolean') {
                            this.systemError('FormBuilder Error: Invalid "showSubmitButtonOnComplete" value, it should be true or false')
                        } else if(typeof this.behavior.showSubmitButtonOnComplete == 'boolean'){
                            return this.behavior.showSubmitButtonOnComplete 
                        } else {
                            return true
                        }
                    } else {
                        return false
                    }
                })(),
                // useGrouping
                useGrouping: (() => {
                    if(this.behavior) {
                        const useGrouping = this.behavior.useGrouping 
                        if(this.behavior && typeof useGrouping != 'boolean') {
                            this.systemError('FormBuilder Error: Invalid "useGrouping" value, it should be true or false')
                        } else if(typeof useGrouping == 'boolean'){
                            if(useGrouping == false) {
                                return false
                            } else {
                                if(!this.behavior.groups) {
                                    this.systemError('FormBuilder Error: useGrouping is set to true but couldnt find groups')
                                } else {
                                    return true
                                }
                            }
                        } else {
                            return false
                        }
                    } else {
                        return false
                    }
                    
                })(),
                // collapsableGroup
                collapsableGroup: (() => {
                    if(this.behavior) {
                        const collapsableGroup = this.behavior.collapsableGroup
                        if(this.behavior && collapsableGroup) {
                            if(typeof collapsableGroup != 'boolean') {
                                this.systemError('FormBuilder Error: Invalid collapsableGroup value it should be true or false')
                            } else if (typeof collapsableGroup == 'boolean'){
                                return collapsableGroup
                            } else {
                                true
                            }
                        } else {
                            return true
                        }
                    } else {
                        return true
                    }
                })()
                
            } 
        },
        appearanceProperties() {
            return {
                hostContainerCss: (() => {
                    if(this.appearance) {
                        return this.appearance.hostContainerCss
                    } else {
                        return {}
                    }
                })(),
                hostContainerClasses: (() => {
                    if(this.appearance) {
                        return this.appearance.hostContainerClasses
                    } else {
                        return []
                    }
                })(),
                fieldElementCss: (() => {
                    if(this.appearance) {
                        return this.appearance.fieldElementCss
                    } else {
                        return {}
                    }
                })(),
                fieldElementClasses: (() => {
                    if(this.appearance) {
                        return this.appearance.fieldElementClasses
                    } else {
                        return []
                    }
                })()
            }
        }
    },
    methods: {
        getFieldItems() {
            const isValidField = (fieldItem, cb) => {
                const fieldTypes = ['string', 'select', 'range', ' number', 'switch' , 'multiselect', 'textarea']
                
                // validated fieldLbale
                if(fieldItem.fieldLabel == undefined) {
                    this.systemError(`FormBuilder Error: fieldLabel is undefined`)
                } else {
                    cb({
                        fieldLabel: `${fieldItem.fieldLabel}`
                    })
                }
                
                //type
                if(fieldTypes.includes(fieldItem.fieldtype) == false) {
                    this.systemError(`FormBuilder Error: Invalid type ${fieldItem.fieldtype}`)
                } else {
                    cb({
                        fieldtype: fieldItem.fieldtype
                    })
                }

                // fieldDescription
                if(fieldTypes.fieldDescription) {
                    cb({
                        fieldDescription: fieldTypes.fieldDescription
                    })
                } else {
                    switch(fieldItem.fieldtype) {
                        case 'string':
                            cb({
                                fieldDescription: `Input ${fieldItem.fieldLabel}`
                            })
                        break
                        case 'select' || 'multiselect':
                            cb({
                                fieldDescription: `Select an option for ${fieldItem.fieldLabel}`
                            })
                        break
                        case 'number':
                            cb({
                                fieldDescription: `Input a number for ${fieldItem.fieldLabel}`
                            })
                        break
                    }
                }

                if(fieldItem.fieldId){
                    cb({
                        fieldId: fieldItem.fieldId
                    })
                }
                //onLoad
                if(typeof fieldItem.onLoad == 'function') {
                    // element,schema,prevInput,error
                    cb({
                        onLoad: fieldItem.onLoad
                    })
                } else {
                    this.systemError('FormBuilder Error: onLoad should be a function')
                }
                //onInput
                if(fieldItem.onInput) {
                    if(typeof fieldItem.onInput == 'function') {
                        // element,schema,prevInput,error
                        cb({
                            onInput: fieldItem.onInput
                        })
                    } else {
                        this.systemError('FormBuilder Error: onLoad should be a function')
                    }
                }
            }

            let finalFieldObject = {
                fieldLabel: undefined,
                fieldtype: undefined, // select, range, number, switch, multiselect, textarea
                fieldDescription: undefined,
                fieldId: undefined,
                onLoad: undefined,
                onInput: undefined
            }

            let fields = []

            if(this.fields != undefined) {
                if(this.fields.length != 0) {
                    this.fields.map((e,i) => {
                        fields.push({})
                        isValidField(e, (fieldObject) => {
                            for(var item in fieldObject) {
                                fields[i][item] = fieldObject[Object.keys(fieldObject)[0]]
                            }
                        })
                    })
                }
            }

            return fields
        },
        submit() {
            this.submitHandler(this.sample)
        },
        getFieldItem(index) {
            // getFieldItem(index)
        },
        insertBelow(schemaObject) {
        },
        pushNew(schemaObject) {
        },
        replace() {
            // replace(<index||'fieldLabel'>, objectSchema)
        },
        delete() {
            // delete(<index||'fieldLabel'>)
        }
    }
}
</script>