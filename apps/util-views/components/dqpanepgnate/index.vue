<template>
    <div>
        <div style="background:var(--deftheme-dark-primary); color:white;" class="pad125" >
            <span class="padleft025" >Scroll Pane Into View</span>
        </div>
        <div class="pad125" >
            <v-flex flexwrap >
                <v-card 
                    @click="scrollTo(item.paneConfig.paneName,itemIndex,item.paneConfig.pos)" 
                    class="marginright050 margintop050 padtop050 padbottom050" hover 
                    v-for="(item,itemIndex) in $store.state.pane" 
                    :key="itemIndex"  outlined >
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <span  class="padleft125 padright125 pointer" v-on="on">
                                {{itemIndex}}
                            </span>
                        </template>
                        <span>pane # {{itemIndex}} | {{item.paneConfig.paneName}}</span>
                    </v-tooltip>
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
        scrollTo(id,paneIndex) {
            const targetId = `${paneIndex}-${id}`
            const targetEl = document.getElementById(targetId)
            

            setTimeout(() => {
                const scrollValue = Math.round(targetEl.left)
                targetEl.scrollIntoView({
                    behavior: "smooth",
                    inline: "center"
                })
            }, 10);

        }
    }
}
</script>