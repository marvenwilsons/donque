<template>
    <div id="dq-center-wrapper" class="flex f1 relative parent-wrapper fullwidth " >
        <div class="flex flexcol f1">
            <div id="dq-head" class="">
                <dqhead></dqhead>
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
import main_window from '@/server/sys/core-apps/pane-system/main-window/main-window.vue'
import docker      from '@/server/sys/core-apps/pane-system/docker/docker.vue'
import notify      from '@/server/sys/core-apps/notify/view/notify.vue'
import dqhead      from '@/server/sys/core-apps/dq-head/view/dq-head.vue'

export default {
    data(){
        return{

        }
    },
    components: {
        mainWindow: main_window,
        docker,
        notify,
        dqhead
    },
    layout: 'admin'
}
</script>

<style>
@import url('@/server/sys/admin assets/css/normalize.css');
@import url('@/server/sys/admin assets/css/tana 0.2.css');

#dq-head{
    /* border: 1px solid red; */
    background-color: #eeeeee;
}
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
#dq-center-wrapper{
    /* border: 5px solid red; */
    width: 100vw;
    overflow: hidden;
}
</style>
