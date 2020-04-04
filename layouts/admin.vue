<template>
    <div class="flexcenter flex relative" style="height:100vh; overflow:hidden;" >
        <globalModal/>
        <v-flex class="absolute fullwidth fullheight-percent" >
            <appSideBar/>
            <v-flex pad125 >
                
                <nuxt />
            </v-flex>
        </v-flex>
    </div>
</template>

<script>
import globalModal from '@/apps/globalModal/index'
import appSideBar from '@/apps/appSideBar/index'
import {mapGetters} from 'vuex'
export default {
    components: {
        globalModal,
        appSideBar
    },
    computed: {
        ...mapGetters(['queueAnswersArray'])
    },
    watch: {
        queueAnswersArray: {
            deep: true,
            handler(newData,oldData) {
                if(oldData == undefined) {
                    /**
                     * It means new task has been added and needed to be proccessed
                     * if the pointer is in 0 execute the first index of queue array
                     */
                    this.$store.commit('executeQueue')
                } else if(oldData != undefined) {
                    if(oldData && newData != undefined){
                        this.$store.commit('executeQueue')
                    }                    
                }
            }
        }
    }
}
</script>


<style>
@import url("@/assets/dq-css/dq-fw-0.3.css");
@import url("@/assets/dq-css/normalize.css");
@import url("@/assets/dq-css/dq-theme-default.css");
</style>