<template>
    <div>
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
            />
        </div>
    </div>
</template>

<script>
import h from '@/helper'
import Templates from '@/templates'
import 'vue-json-viewer/style.css'
import item from './item'

export default {
    mixins: [h],
    props:['myData','myConfig'],
    created() {
        this.h = this
    },
    data: () => ({
        navs: [
            {
                name: 'Page Services',
                items: [
                    {
                        name: 'Page Pool',
                        itemIcon: 'mdi-poll',
                        additionalContent: [
                            {
                                type: 'text',
                                title: 'Description',
                                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsum aspernatur modi aliquam, expedita in distinctio enim. Officiis, ullam amet. Quia quam totam commodi aspernatur, illo facere. Porro, excepturi enim?'
                            },
                            {
                                type: 'events',
                                title: 'Other Services',
                                body: [
                                    {
                                        title: 'Click and you will be directed to a dq service this is a verly long tile like super long',
                                        eventName: 'myEvent'
                                    },
                                    {
                                        title: 'Click and you will be directed to a dq service',
                                        eventName: 'myEvent'
                                    },
                                    {
                                        title: 'Click and you will be directed to a dq service this is a verly long tile like super long',
                                        eventName: 'myEvent'
                                    },
                                    {
                                        title: 'Click and you will be directed to a dq service',
                                        eventName: 'myEvent'
                                    }
                                ]
                            },
                            {
                                type: 'events',
                                title: 'Tutorials',
                                body: [
                                    {
                                        title: 'Click and you will be directed to a dq service this is a verly long tile like super long',
                                        eventName: 'myEvent'
                                    },
                                    {
                                        title: 'Click and you will be directed to a dq service',
                                        eventName: 'myEvent'
                                    },
                                    {
                                        title: 'Click and you will be directed to a dq service this is a verly long tile like super long',
                                        eventName: 'myEvent'
                                    },
                                    {
                                        title: 'Click and you will be directed to a dq service',
                                        eventName: 'myEvent'
                                    }
                                ]
                            },
                        ],
                        events: ['View', "Create", "Edit"]
                    },
                    {
                        name: 'Page Layouts',
                        itemIcon: 'mdi-border-all',
                        additionalContent: undefined,
                        events: ['View My Layouts','Download Page Layouts']
                    },
                    {
                        name: 'Color Palletes',
                        itemIcon: 'mdi-grain',
                        additionalContent: undefined,
                        events: []
                    },
                ]
            },
        ],
        
    }),
    mounted() {
        // console.log(this.myData)
    },
    components: {
        item
    }
}
</script>