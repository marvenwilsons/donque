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
export default {
    components: {
        globalModal,
        appSideBar
    }
}
</script>


<style>
@import url("@/assets/dq-css/dq-fw-0.3.css");
@import url("@/assets/dq-css/normalize.css");
@import url("@/assets/dq-css/dq-theme-default.css");


</style>