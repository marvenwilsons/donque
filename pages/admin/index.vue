<template>
    <main class="borderred" >
        <section class="">top</section>
        <section class="">
            <section>
                <docker></docker>
            </section>
            <section>
                <mainWindow></mainWindow>
            </section>
        </section>
    </main>
</template>
<script>
// parent
import main_window from '@/server/sys/core-apps/main-window/view/main-window.vue'
import docker      from '@/server/sys/core-apps/docker/view/docker.vue'

export default {
    data(){
        return{

        }
    },
    components: {
        mainWindow: main_window,
        docker
    },
    layout: 'admin'
}
</script>

<style scoped>
main{
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}
</style>
