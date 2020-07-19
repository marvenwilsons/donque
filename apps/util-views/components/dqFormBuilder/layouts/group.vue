<template>
    <div  >
        <div 
            :style="{...appearanceProperties.hostContainerCss}" :class="[...appearanceProperties.hostContainerClasses]" 
            v-for="(gName,gIndex) in groups" :key="gIndex" >
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
        <div class="pad125 flex flexend" >
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
        details: undefined
    }),
    mounted() {
        this.groups = this.behaviorProperties.groups
        this.details = this.behaviorProperties.groupDetails
    },
    methods: {
        setLoading(arg) {
            this.isLoading = arg
        },
        getElementValue() {
            let o = {}

            this.$refs.el.map(e => {
                o[e._data.elementLabel] = e._data.inputValue
            })

            this.$emit('onSubmit',{
                data: o,
                formMethods: this.formMethods,
                submitMethods: {
                    setLoading: this.setLoading
                }
            })
        }
    }
}
</script>