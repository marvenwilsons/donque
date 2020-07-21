<template>
    <div>
        <div 
            v-for="(gName,gIndex) in groups" :key="gIndex" >
            <div
                v-if="!useOfNext"
                :style="{...appearanceProperties.hostContainerCss}" :class="[...appearanceProperties.hostContainerClasses]" 
            >
                <div class="flex flexcol" >
                    <h6 style="color: #333;" >
                        {{gName}}
                    </h6>
                    <p class="v-pa-2 s3 text-xs-left grey--text text--darken-1"  >
                        {{details[gName]}}
                    </p>
                </div>
                <div 
                    v-for="(item, item_idex) in fieldItems" 
                    :key="item_idex" >
                    <div v-if="item.group == gName" class="flex flexcol">
                        <el 
                            ref="el"
                            :elementProperty="item"
                            :formMethods="formMethods"
                            :appearanceProperties="appearanceProperties"
                        />
                    </div>
                </div>
            </div>
            <!--  -->
            <div
                v-if="useOfNext == true && gIndex == currentGroupdDisplayed"
                :style="{...appearanceProperties.hostContainerCss}" :class="[...appearanceProperties.hostContainerClasses]" 
            >
                <div class="flex flexcol" >
                    <h6 style="color: #333;" >
                        {{gName}}
                    </h6>
                    <p class="v-pa-2 s3 text-xs-left grey--text text--darken-1"  >
                        {{details[gName]}}
                    </p>
                </div>
                <div 
                    v-for="(item, item_idex) in fieldItems" 
                    :key="item_idex" >
                    <div v-if="item.group == gName" class="flex flexcol">
                        <el 
                            ref="el"
                            :elementProperty="item"
                            :formMethods="formMethods"
                            :appearanceProperties="appearanceProperties"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showNextBtn && useOfNext" class="padtop125 flex flexend" >
            <v-btn :loading="isLoading" @click="execNext" color="primary" >
                next
            </v-btn>
        </div>
        <div v-if="showSubmitBtn == true" class="padtop125 flex flexend" >
            <v-btn :loading="isLoading" @click="getElementValue" color="primary" >
                submit
            </v-btn>
        </div>
    </div>
</template>

<script>
import element from '../components/element'
export default {
    props: ['behaviorProperties','fieldItems','appearanceProperties','formMethods'],
    components: {
        el: element
    },
    data: () => ({
        isLoading: false,
        groups: undefined,
        details: undefined,
        currentGroupdDisplayed: undefined,
        useOfNext: false,
        showSubmitBtn: true,
        showNextBtn: true
    }),
    mounted() {
        this.groups = this.behaviorProperties.groups
        this.details = this.behaviorProperties.groupDetails
        this.useOfNext = this.behaviorProperties.useOfNext
        if(this.behaviorProperties.useOfNext == true) {
            this.currentGroupdDisplayed = 0
            this.showSubmitBtn = false
        }
    },
    methods: {
        execNext() {
            let o = {}

            this.$refs.el.map(e => {
                o[e._data.elementLabel] = e._data.inputValue
            })
            this.$emit('onNextForm',{
                data: o,
                formMethods: this.formMethods,
                submitMethods: {
                    setLoading: this.setLoading,
                    next: this.nextForm
                }
            })
        },
        nextForm() {
            const currentGroup = this.groups[this.currentGroupdDisplayed]
            const getErrors = this.formMethods[currentGroup].map(e => {
                
                return e.hasError
            })
            const doesNotHaveErrors = getErrors.every(e => e === false)
            if(doesNotHaveErrors) {
                this.currentGroupdDisplayed = this.currentGroupdDisplayed + 1
                if(this.currentGroupdDisplayed == this.groups.length - 1) {
                    this.showNextBtn = false
                    this.showSubmitBtn = true
                }
            }
        },
        setLoading(arg) {
            this.isLoading = arg
        },
        getElementValue() {
            let o = {}

            this.$refs.el.map(e => {
                o[e._data.elementLabel] = e._data.inputValue
            })

            if(this.useOfNext && this.groups.length != 0 && this.showSubmitBtn == false) {
                this.$emit('onNextForm',{
                    data: o,
                    formMethods: this.formMethods,
                    submitMethods: {
                        setLoading: this.setLoading,
                        next: this.nextForm
                    }
                })
            } else {
                const fieldItems = this.formMethods.getFieldItems()
                let dat = {}
                fieldItems.map(e => {
                    const fieldLabel = e.fieldLabel
                    dat[fieldLabel] = this.formMethods[fieldLabel].value
                })

                this.$emit('onSubmit',{
                    data: dat,
                    formMethods: this.formMethods,
                    submitMethods: {
                        setLoading: this.setLoading
                    }
                })
            }   
            
        }
    }
}
</script>