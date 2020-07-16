<template>
    <div>
        <div 
            v-for="(item, item_idex) in fieldItems" 
            :key="item_idex" >
            <div class="flex flexcol">
                <el 
                    ref="el"
                    :elementProperty="item"
                    :formMethods="formMethods"
                    :appearanceProperties="appearanceProperties"
                />
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
        isLoading: false
    }),
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