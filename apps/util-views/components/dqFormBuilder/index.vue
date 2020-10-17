<template>
    <main v-if="isReady">
        <div 
            v-if="behaviorProperties.useGrouping == true" 
            :is="'groupsLayout'"
            :behaviorProperties="behaviorProperties"
            :appearanceProperties="appearanceProperties"
            :fieldItems="getFieldItems()"
            @onSubmit="submit"
            @onNextForm="onNextForm"
            :formMethods="{
                insertGroup,
                hideGroup,
                insertBelow,
                pushNew,
                replace,
                remove,
                ...getFormItems(),
                ...getGroups(),
                getFieldItems
            }"
            >
        </div>
        <div 
            v-if="behaviorProperties.useGrouping == false" :is="'defaultLayout'" 
            :behaviorProperties="behaviorProperties"
            :appearanceProperties="appearanceProperties"
            :fieldItems="getFieldItems()"
            :style="appearanceProperties.hostContainerCss"
            :class="appearanceProperties.hostContainerClasses"
            @onSubmit="submit"
            @onNextForm="onNextForm"
            :formMethods="{
                insertGroup,
                hideGroup,
                insertBelow,
                pushNew,
                replace,
                remove,
                ...getFormItems(),
                ...getGroups(),
                getFieldItems
            }"
            >
        </div>
    </main>
</template>

<script>
import h from '@/helper'
import Templates from '@/templates'
import defaultLayout from './layouts/default'
import groupsLayout from './layouts/group'

export default {
    mixins: [h],
    props: ['fields','behavior','appearance'],
    components: {
        defaultLayout,
        groupsLayout
    },
    data: () => ({
        sample: undefined,
        isReady: false,
        allFormData: undefined,
        checkList: ['selected and disabled','Option A']
    }),
    created() {
        this.h = this
    },
    mounted() {
        this.isReady = true
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
                })(),
                // groups
                groups: (() => {
                    if(this.behavior) {
                        if(this.behavior && this.behavior.useGrouping  == true) {
                            if(this.behavior.groups.length != 0) {
                                return this.behavior.groups
                            } else { 
                                this.systemError('FormBuilder Error: groups cannot be an empty array')
                            }
                        }
                    }
                })(),
                // group details
                groupDetails: (() => {
                    if(this.behavior) {
                        if(this.behavior && this.behavior.useGrouping  == true) {
                            if(this.behavior.groups.length != 0) {
                                return this.behavior.groupDetails
                            } else { 
                                this.systemError('FormBuilder Error: groups cannot be an empty array')
                            }
                        }
                    }
                })(),
                useOfNext: (() => {
                    if(this.behavior) {
                        if(this.behavior.useOfNext == true) {
                            return this.behavior.useOfNext
                        }
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
        submit(dat) {
            this.$emit('onSubmit', dat)
        },
        onNextForm(dat) {
            this.$emit('onNextForm',dat)
        },
        getFieldItems() {
            const isValidField = (fieldItem, cb) => {
                const fieldTypes = ['string', 'password', 'select', 'range', 'number', 'switch' , 'multiselect', 'textarea']
                
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
                    if(fieldItem.fieldtype == 'multiselect') {
                        if(fieldItem.dataSet == undefined || Array.isArray(fieldItem.dataSet) == false) {
                            this.systemError(`formBuilder Error: multiselect (${fieldItem.fieldLabel}) dataSet property cannot be undefiend or empty array or not an array`)
                        }

                        if(fieldItem.defaultValue) {
                            if(Array.isArray(fieldItem.defaultValue) == false) {
                                this.systemError(`formBuilder Error: multiselect (${fieldItem.fieldLabel}) defaultValue property should be a type of array`)
                            }
                        }
                    }

                    cb({
                        fieldtype: fieldItem.fieldtype
                    })
                }

                // fieldDescription
                if(fieldItem.fieldDetails) {
                    cb({
                        fieldDetails: fieldItem.fieldDetails
                    })
                } else {
                    switch(fieldItem.fieldtype) {
                        case 'string':
                            cb({
                                fieldDetails: `Input ${fieldItem.fieldLabel}`
                            })
                        break
                        case 'select' || 'multiselect':
                            cb({
                                fieldDetails: `Select an option for ${fieldItem.fieldLabel}`
                            })
                        break
                        case 'number':
                            cb({
                                fieldDetails: `Input a number for ${fieldItem.fieldLabel}`
                            })
                        break
                        
                    }
                }

                if(fieldItem.fieldId){
                    cb({
                        fieldId: fieldItem.fieldId
                    })
                }

                if(fieldItem.dataSet) {
                    cb({
                        dataSet: fieldItem.dataSet
                    })
                }

                if(fieldItem.defaultValue) {
                    cb({
                        defaultValue: fieldItem.defaultValue
                    })
                }

                if(fieldItem.group) {
                    if(typeof fieldItem.group != 'string') {
                        this.systemError('formBuilder Error: Invalid group value type')
                    } else {
                        cb({
                            group: fieldItem.group
                        })
                    }
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
                fieldDetails: undefined,
                fieldId: undefined,
                defaultValue: undefined,
                dataSet: undefined,
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
        getGroups() {
            let o = []
            if(this.behavior) {
                if(this.behavior.groups != undefined) {
                    if(this.behavior.groups.length != 0) {
                        this.behavior.groups.map(e => {
                            o[e] = []
                        })
                        this.fields.map(e => {
                            if(e.group) {
                                o[e.group].push({
                                    ...e,
                                    hasError: false
                                })
                            }
                        })
                        return o
                    } else {
                        return []
                    }
                }
            }
            
            
        },
        getFormItems() {
            const items = this.getFieldItems()
            let finalObject = {}
            items.map(e => {
                const fieldLabel = e.fieldLabel
                finalObject[fieldLabel] = e
            })

            return finalObject
        },
        insertGroup() {

        },
        hideGroup() {

        },
        insertBelow(schemaObject) {
        },
        pushNew(schemaObject) {
        },
        replace(fieldLabelIndex) {
            // replace(<index||'fieldLabel'>, objectSchema)
        },
        remove(fieldLabelIndex) {
            // delete(<index||'fieldLabel'>)
        }
    }
}
</script>