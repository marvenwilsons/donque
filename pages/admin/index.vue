<template>
    <div class="relative  fullheight-VH fullwidth " >
        <div class="fullheight-percent">
            <div class="">
                top
            </div>
            <div class="p flex fullheight borderred">
                <div>
                    <docker></docker>
                </div>
                <div class="f1">
                    <main-window></main-window>
                </div>
                <div class="relative">
                    <div class="absolute">
                        notify
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// parent
import main_window from '@/server/sys/core-apps/main-window/view/main-window.vue'
import docker      from '@/server/sys/core-apps/docker/view/docker.vue'
import notify      from '@/server/sys/core-apps/notify/view/notify.vue'

export default {
    data(){
        return{

        }
    },
    components: {
        mainWindow: main_window,
        docker,
        notify
    },
    layout: 'admin'
}
</script>

<style scoped>
.fullheight{
    min-height: 97.2%;
}
.fl{
    height: 100%;
}
.wrap{
    flex-wrap: wrap;
}
.f1{
    flex: 1;
}
.p{
    overflow-x: hidden;
}
</style>
