<template>
  <section role="admin-page" id="dq-parent-wrapper" :class="[$store.state.modal.visibility && 'blur', 'flex ','relative']">
    <header><dqhead/></header>
    <section id="dq-content-wrapper" class="flex">
      <nav><docker/></nav>
      <main id="dq-work-room" class="flex" ><main-window/></main>
      <aside> <notify v-if="$store.state.notificationPane.isOpen" :mode="$store.state.notificationPane.mode" /> </aside>
    </section>
  </section>
</template>
<script>
// parent
import main_window from "@/server/sys/core-apps/pane-system/main-window/main-window.vue";
import docker from "@/server/sys/core-apps/pane-system/docker/docker.vue";
import notify from "@/server/sys/core-apps/i0-notification/notify.vue";
import dqhead from "@/server/sys/core-apps/dq-head/view/dq-head.vue";
import spinner from "@/server/sys/core-apps/pane-system/module/spinner-1.vue";

export default {
  data() {
    return {};
  },
  components: {
    mainWindow: main_window,
    docker,
    notify,
    dqhead,
    main_window,
    spinner
  },
  layout: "admin"
};
</script>

<style>
@import url("@/server/sys/admin assets/css/normalize.css");
@import url("@/server/sys/admin assets/css/tana 0.2.css");

#dq-parent-wrapper {
  flex-wrap: wrap;
  flex: 1;
  align-items: stretch;
  flex-flow: column wrap;
}
.blur{
  filter: blur(10px)
}
#dq-content-wrapper {
  flex: 1;
}
#dq-work-room{
  background-color: var(--blue-3);
}
header {
  /* border: 1px solid red; */
  background-color: var(--blue-1);
  /* background-color: var(--dark-2); */
}
main {
  /* border: 5px solid brown; */
  flex: 9;
}
nav {
  background-color: var(--blue-3);
  /* border: 4px solid green; */
  flex: 1;
}
/* aside { */
  /* border: 1px solid hotpink; */
/* } */

</style>
