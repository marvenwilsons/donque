<template>
    <div class="relative flex" style="background:white; overflow-y:auto; overflow-x:hidden; min-width:320px;" >
        <div class="absolute fullwidth" >
            <div v-for="(nav, index) in navs" :key="index" >
                <div class="marginleft125 marginright125 margintop125 padtop125" >
                    <strong class="" > 
                        {{nav.name}}
                    </strong>
                    <v-divider></v-divider>
                </div>
                <item
                    v-for="(item,n) in nav.items"
                    :key="n"
                    :itemName="item.name"
                    :itemIcon="item.itemIcon"
                    :additionalContent="item.additionalContent"
                    :itemEvents="item.events"
                    :warning="item.warning"
                    
                    :loading="ll"
                    :removeWarningOn="removeWarningOn"
                    :disabled="disabled"
                    @onEvent="bubbleEvent"
                />
            </div>
        </div>
    </div>
</template>

<script>
import h from '@/helper'
import Templates from '@/templates'
import item from './item'
export default {
    mixins: [h],
    props: ['myData','myConfig', 'paneIndex'],
    created() {
        this.h = this
    },
    data: () => ({
        navs: [],
        ll: false,
        removeWarningOn: undefined,
        disabled: false
    }),
    methods: {
        bubbleEvent(e) {
            this.disabled = true
            this.$emit('onEvent',{
                methods: {
                    loading: this.loading,
                    removeWarning: this.removeWarning
                },
                ...e
            })
        },
        loading(e) {
            this.disabled = true
            this.ll = e
        },
        removeWarning(nav) {
            for(let i = 0; i < this.navs.length;i++) {
                for(let j = 0; j < this.navs[i].items.length; j++) {
                    if(this.navs[i].items[j].name == nav) {
                        this.navs[i].items[j].warning = null
                        this.disabled = true
                        break
                    }
                }
            }
        },
        c(data,fn) {
            const { syspane, syspanemodal, dwin} =  this.normyDep(this.paneIndex,this)
            fn(data,syspane,syspanemodal,dwin)
        }
    },
    watch: {
        myData() {
            this.navs = this.cp(this.myData)
        }
    },
    mounted() {
        this.navs = this.cp(this.myData)
    },
    components: {
        item
    }
}
</script>