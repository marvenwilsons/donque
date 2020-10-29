<template>
    <div style="background:white;" >
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
                @onEvent="bubbleEvent"
            />
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
        ll: false
    }),
    methods: {
        bubbleEvent(e) {
            this.$emit('onEvent',{
                methods: {
                    loading: this.loading
                },
                ...e
            })
        },
        loading(e) {
            this.ll = e
        },
        c(data,fn) {
            const { syspane, syspanemodal, dwin} =  this.normyDep(this.paneIndex,this)
            fn(data,syspane,syspanemodal,dwin)
        }
    },
    mounted() {
        this.navs = this.myData
        console.log(this.myData)
    },
    components: {
        item
    }
}
</script>