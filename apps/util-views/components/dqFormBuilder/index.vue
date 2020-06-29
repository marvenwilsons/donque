<template>
    <main v-if="isReady" class="borderred" >
        test
        <pre>
            {{behaviorProperties}}
        </pre>
    </main>
</template>

<script>
import h from '@/helper'
import Templates from '@/templates'
export default {
    mixins: [h],
    props: ['schema','behavior','appearance'],
    data: () => ({
        sample: undefined,
        isReady: false
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
                })()
                
            } 
        }
    },
    methods: {
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