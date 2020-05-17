<template>
    <div>
        <div style="background:var(--deftheme-dark-primary); color:white;" class="pad125" >
            <span class="padleft025" >Scroll To Pane</span>
        </div>
        <div class="pad125" >
            <v-flex flexwrap >
                <v-card 
                    @click="scrollTo" 
                    class="marginright050 margintop050" hover 
                    v-for="(item,itemIndex) in $store.state.pane" 
                    :key="itemIndex"  outlined >
                    <div class="pad050 padleft125 padright125 pointer" >
                        {{itemIndex}}
                    </div>
                </v-card>
            </v-flex>
            <v-flex flexend margintop125>
                <v-btn @click="closeGlobalModal()" color="primary" >done</v-btn>
            </v-flex>
        </div>
    </div>
</template>

<script>
import h from '@/helper'

export default {
    mixins: [h],
    props: {
        data: Object
    },
    created() {
        this.h = this
    },
    methods: {
        scrollTo() {
            console.log('scroll to')
            const paneContainer = document.getElementById('dq-main-w')
            const paneContainerWidth = paneContainer.offsetWidth
            const hostContainer = document.getElementById('dq-host-container')
            const hostContainerWidth = hostContainer.offsetWidth
            console.log(paneContainerWidth)
            hostContainer.scrollTo({ top: 0, left: 230, behavior: 'smooth' })
        }
    }
}
</script>