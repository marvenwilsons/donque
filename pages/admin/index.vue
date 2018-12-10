<template>
    <div class="flex f1 relative parent-wrapper fullwidth " >
        <div class="flex flexcol f1">
            <div class="">
                top
            </div>
            <div class="p flex f1">
                <div>
                    <docker></docker>
                </div>
                 <main-window class="f1"></main-window>
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

<style>
@import url('@/server/sys/admin assets/css/normalize.css');
@import url('@/server/sys/admin assets/css/tana 0.2.css');

.fullheight{
    min-height: inherit;
}
.parent-wrapper{
    /* border: 5px solid green; */
    min-height: inherit;
}
.parent-wrapper > *{
    min-height: inherit;
}
.fl{
    min-height: inherit;
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
