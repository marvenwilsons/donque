<template>
  <main v-if="$store.state.app" role="admin-layout" class="flex flexcol">
    <div
      v-if="$store.state.modal.visibility"
      id="dq-modal-holder"
      class="absolute fullwidth fullheight-VH flex flexcenter"
    >
      <div class="dqspc fullwidth fullheight-VH flex flexcenter">
        <div v-if="$store.state.spinner">
          <spinner/>
        </div>
      </div>
      <div v-if="$store.state.spinner == false" id="dq-modal-host" class="flex flexcol absolute">
        <span id="dq-modal-head" class="flex spacebetween">
          <span>
            <strong>{{$store.state.modal.head}}</strong>
          </span>
          <span @click="closeModal" class="light-text">
            <strong>&#10006;</strong>
          </span>
        </span>
        <span id="dq-modal-body" class="flex center">
          <div class="flex flexcenter fullwidth" :is="$store.state.modal.body"></div>
        </span>
      </div>
    </div>
    <nuxt v-if="ready"/>
  </main>
</template>

<script>
import spinner from "@/server/sys/core-apps/pane-system/module/spinner-1.vue";
import universal_modal_disp from "@/server/sys/core-apps/pane-system/module/universal_modal_disp.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      ready: false,
      action: this.$store.state.actions
    };
  },
  methods: {
    closeModal() {
      this.$store.state.modal.visibility = false;
    }
  },
  computed: {
    ...mapGetters({
      myActionState: "actionState",
      modalState: "modalState",
      hasErr: "hasErr"
    })
  },
  components: {
    spinner,
    universal_modal_disp
  },
  watch: {
    myActionState(newActions, oldval) {
      if (newActions) {
        newActions.map(e => {
          switch (e.title) {
            case "saveToLocalStorage":
              console.log("saving to local storage!");
              break;
            case "prompt_err":
              this.$store.state.modal.visibility = true;
              this.$store.state.modal.head = "Error";
              this.$store.state.modal.body = universal_modal_disp;
              this.$store.state.current_action_title = e.title;
              break;
            case "prompt_msg":
              this.$store.state.modal.visibility = true;
              this.$store.state.modal.head = "System message";
              this.$store.state.modal.body = universal_modal_disp;
              this.$store.state.current_action_title = e.title;
              break;
            case "prompt_password":
              this.$store.state.modal.visibility = true;
              this.$store.state.modal.head = "Authentication required";
              this.$store.state.modal.body = universal_modal_disp;
              this.$store.state.current_action_title = e.title;
              break;
            case "redirect":
              location.href = e.content;
              break;
            case "prompt_credentials":
              break;
            case "init_user":
              // set user
              this.$store.state.admin = e.content;
              this.ready = true;
              this.$store.state.modal.visibility = true;
              this.$store.state.spinner = true;
              this.$store.state.resources = e.content.resources;

              // set resource
              setTimeout(() => {
                this.$store.state.actions = undefined;
                this.$store.state.modal.visibility = false;
                this.$store.state.spinner = false;
              }, 600);
              break;
          }
        });
      }
    },
    modalState(modalsOldState, modalsCurrentState) {
      if (
        modalsCurrentState === "modal is close" &&
        !this.$store.state.hasErr
      ) {
        this.$store.dispatch('execAfterTruthy')
      }
    }
  },
  mounted() {
    /**
     * For the docker, it will set up first item highlight
     * to the dashboard
     */

    this.$store.dispatch("firstLoad");
    this.read = true;
    console.log("");
    console.log("** [systemCall]-[admin.vue] initialize admins dashboard");
    this.$store.dispatch("systemCall", {
      command: "initActorsDashboard",
      section: "adminMethods",
      method: "get"
    });

    // only trigger when there is unsaved changes
    // window.onbeforeunload = function() {
    //   localStorage.clear()
    //   return "Changes may not be saved";
    // };
  }
};
</script>


<style>
@import url("@/server/sys/admin assets/css/tana 0.2.css");
@import url("@/server/sys/admin assets/css/normalize.css");

:root {
  --size-1-half: calc(var(--fontSize) * 0.25);
  --size-1-full: calc(var(--fontSize) * 1.25);

  --size-2-half: calc(var(--fontSize) * 1.25);

  /* dark */
  --dark-1: #393e42;
  --dark-2: #5c696f;
  --dark-3: #33383c;

  /* light */
  --light-1: #e0e0e0;

  /* blue */
  --blue-1: #0086c0;
  --blue-2: #86a6bd;
  --blue-3: #e9eff3;
  --blue-4: #f4f7f9;
  --blue-5: #86a6bd3d;
  --blue-text: #2d4455;
  --blue-text-2: #4a6976;

  /* hovers */
  --hover-blue: var(--blue-2);

  /* error color */
  --err: #ae1100;

  /* fonts */
  --oxygen-mono: "Oxygen Mono", monospace;
  --ubunto-mono: "Ubuntu Mono", monospace;
  --inconsolata: "Inconsolata", monospace;
  --lobster: "Lobster", cursive;
  --cuprum: "Cuprum", sans-serif;
  --openSans: "Open Sans", sans-serif;
}
.dq-pane-container-padding {
  padding-top: var(--size-1-half);
  padding-bottom: var(--size-1-half);
  padding-left: var(--size-1-half);
  padding-right: var(--size-1-half);
}
.dqspc {
  /* background: #0086c02d; */
  /* background-color: #393e4223; */
}
#__layout {
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;

  height: 100%;
}
#__layout > main {
  min-height: inherit;
  max-height: inherit;
  position: relative;
  min-width: inherit;
  overflow: hidden;
  flex-flow: row wrap;
  justify-content: center;
}

#dq-modal-holder {
  z-index: 50;
  background-color: #393e426c;
  transition: 0.3s;
}
#dq-modal-host {
  z-index: 150 !important;
  min-width: 450px;
  min-height: 200px;
  background: white;
  /* margin-top: -500px; */
  top: 250px;
  box-shadow: 2px 2px 15px 1px #393e4244;
}
#dq-modal-head {
  padding: var(--size-1-half);
  background-color: var(--blue-1);
  color: white;
}
#dq-modal-body {
  padding: var(--size-1-half);
  flex: 1;
}
</style>
