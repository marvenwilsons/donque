<template>
  <div v-if="$store.state.dashboard_data.dashboard_ready" class="fullwidth flex">
    <!-- docker -->
    <div
      :style="{
        flex:1, 
        minWidth:180+'px',
        maxWidth:180+'px',
        zIndex:2
        }"
      v-dq-theme:docker="['background','color']"
    >
      <docker />
    </div>

    <!-- main window -->
    <div :style="{flex: 15, background: ''}" class="relative">
      <mainWindow
        :ModalContent="ModalContent"
        :ModalFn="ModalsPaneNameArray"
        @insertModal="insertModal"
        @UnSetPaneModal="CloseModal"
      >
      </mainWindow>
    </div>

    <!-- notification -->
    <div class="relative">
      <div
        id="dq_notification_parent"
        style="width:450px; left:-450px; background:whitesmoke;"
        class="absolute fullheight-percent flex fullwidth flexcol"
      >
        <div class="flex flexcol fullheight-percent">
          <notify
            :bgColor="$store.state.theme.notify_bg_color"
            :textColor="$store.state.theme.notify_text_color"
          />
        </div>
      </div>
    </div>

    <!--  -->
  </div>
</template>

<script>
import notify from "@/components/admin_root/dq_notification/notify.vue";
import docker from "@/components/admin_root/dq_pane-system/docker/docker.vue";
import main_window from "@/components/admin_root/dq_pane-system/main-window/main-window.vue";

import { mapGetters } from "vuex";

export default {
  data: () => ({
    ModalComponent: undefined,
    ModalContent: undefined,
    ModalState: undefined,
    ModalsPaneNameArray: undefined
  }),
  computed: {
    ...mapGetters({
      config_state: "pane_system/get_panes",
    })
  },
  watch: {
    config_state(current,old) {
      const nob = current.map(e => {
         return {[e]: {
           modal: undefined,
           width: undefined,
           title: undefined,
           background: undefined,
           header: undefined
         }}
      })
      this.ModalsPaneNameArray = nob
    }
  },
  methods: {
    insertModal(Modal) {
      if (Modal.component) {
        setTimeout(() => {
          this.ModalComponent = Modal.component;
          this.ModalContent = Modal;
          this.ModalState = true;


          // insert modal to
          let ModalIndex = undefined
          this.ModalsPaneNameArray.map((e,i) => {
            if(Object.keys(e)[0] == Modal.pane_name) {
              ModalIndex = i
            }
          })

          this.ModalsPaneNameArray[ModalIndex][Modal.pane_name].modal = Modal.component
          this.ModalsPaneNameArray[ModalIndex][Modal.pane_name].width = Modal.width
          this.ModalsPaneNameArray[ModalIndex][Modal.pane_name].height = Modal.height
          this.ModalsPaneNameArray[ModalIndex][Modal.pane_name].title = Modal.title
          this.ModalsPaneNameArray[ModalIndex][Modal.pane_name].background = Modal.background
          this.ModalsPaneNameArray[ModalIndex][Modal.pane_name].header = Modal.header
          this.ModalsPaneNameArray[ModalIndex][Modal.pane_name].CanBeClose = Modal.CanBeClose
          this.ModalsPaneNameArray[ModalIndex][Modal.pane_name].data = Modal.data

          this.OpenModal(ModalIndex);
        }, 50);
      }
    },
    OpenModal(ModalIndex) {
      setTimeout(() => {
        const el = document.getElementById(`DqModalContainer-${ModalIndex}`);
        TweenMax.fromTo(
          el,
          0.3,
          { opacity: 0, marginTop: "40px", ease: Power2.easeInOut },
          { opacity: 1, marginTop: "0px", ease: Power2.easeInOut }
        );
      }, 0);
    },
    CloseModal({pane_index,pane_name}) {
      setTimeout(() => {
        const el = document.getElementById(`DqModalContainer-${pane_index}`);
        if (el) {
          TweenMax.fromTo(
            el,
            0.3,
            { opacity: 1, marginTop: "0px", ease: Power2.easeInOut },
            { opacity: 0, marginTop: "-40px", ease: Power2.easeInOut }
          );
        }
      }, 0);

      setTimeout(() => {
        this.ModalsPaneNameArray[pane_index][pane_name] = {
           modal: undefined,
           width: undefined,
           title: undefined,
           background: undefined,
           header: undefined
         }
      }, 350);
    }
  },
  components: {
    notify,
    docker,
    // mainWindow: () => import("~/components/admin_root/dq_pane-system/main-window/main-window.vue") // this works
    mainWindow: main_window
  }
};
</script>

<style>
#dq_notification_parent {
  box-shadow: 2px 2px 15px 1px #393e4244;
}
</style>
