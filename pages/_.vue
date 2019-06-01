<template>
  <div :is="view"></div>
</template>

<script>
// Admin's Root components
import dq_login from "@/components/admin_root/app_login/dqlogin.vue";
import dq_init from "@/components/admin_root/app_init/dqinit.vue";
import admin_portal from "@/components/admin_root/admin_portal/admin-portal.vue";
import public_portal from "@/components/admin_root/public_portal/public-portal.vue";

import { mapGetters } from "vuex";

export default {
  
  data() {
    return {
      siteTitle: "petroff",
      mounted_data: undefined,
      auth: undefined,
      view: undefined,
      layout: 'admin'
    };
  },
  layout: (context) => {
    console.log('********* layout')
    if(context.route.path === '/admin'){
      return 'admin'
    }else {
      return 'default'
    }   
    // return this.layou
  },
  validate({ query, params, store }) {
    // validate if params
    console.log(params);
    console.log(query);

    return true;
  },
  head() {
    return {
      title: this.routeEnding,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.routeEnding} page`
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      myActionState: "actionState",
      modalState: "modalState",
      hasErr: "hasErr"
    }),
    route() {
      return this.$route.params.pathMatch;
    },
    routeEnding() {
      const allRoutes = this.$route.params.pathMatch.split("/");
      return allRoutes[allRoutes.length - 1] === ""
        ? this.siteTitle
        : allRoutes[allRoutes.length - 1];
    },
    queryObject() {
      return this.$route.query;
    },
  },
  components: {
    dq_login,
    dq_init,
    admin_portal,
    public_portal
  },
    watch: {
    // myActionState(newActions, oldval) {
    //   console.log('********* myActionState')
    //   if (newActions) {
    //     newActions.map(e => {
    //       console.log(e)
    //       switch (e.title) {
    //         case "saveToLocalStorage":
    //           console.log("saving to local storage!");
    //           break;
    //         case "prompt_err":
    //           this.$store.state.modal.commit('set_visibility', true)
    //           this.$store.state.modal.head = "Error";
    //           this.$store.state.modal.body = universal_modal_disp;
    //           this.$store.state.current_action_title = e.title;
    //           break;
    //         case "prompt_msg":
    //           tthis.$store.state.modal.commit('set_visibility', true)
    //           this.$store.state.modal.head = "System message";
    //           this.$store.state.modal.body = universal_modal_disp;
    //           this.$store.state.current_action_title = e.title;
    //           break;
    //         case "prompt_password":
    //           this.$store.state.modal.commit('set_visibility', true)
    //           this.$store.state.modal.head = "Authentication required";
    //           this.$store.state.modal.body = universal_modal_disp;
    //           this.$store.state.current_action_title = e.title;
    //           break;
    //         case "redirect":
    //           location.href = e.content;
    //           break;
    //         case "prompt_credentials":
    //           break;
    //         case "init_user":
    //           // set user
    //           this.$store.state.admin = e.content;
    //           this.ready = true;
    //           this.$store.state.modal.commit('set_visibility', true)
    //           this.$store.state.spinner = true;
    //           this.$store.state.resources = e.content.resources;

    //           // set resource
    //           setTimeout(() => {
    //             this.$store.state.actions = undefined;
    //             this.$store.state.modal.commit('set_visibility', false)
    //             this.$store.state.spinner = false;
    //           }, 600);
    //           break;
    //       }
    //     });
    //   }
    // },
  },
  mounted() {
    /**
     * Setting admin data
     */
    // this.$store.state.admin = {
    //   adminName: 'marven'
    // }

    /**
     * page routing
     */
    this.auth = localStorage.getItem("auth");

    // this code will only execute on after the app is initialized
    // the owner has the capability to change the login link, so it is posible that the login page is
    // not dq login anymore after initialization
    if (
      this.$store.state.actions[0].title === "redirect" &&
      this.$store.state.actions[0].content === "dqlogin"
    ) {
      return this.view = "dq_login";
    }
    // this code will only execute if the app is not initialized yet
    // no admin, no app manifest, no database yet
    else if (
      this.$store.state.actions[0].title === "redirect" &&
      this.$store.state.actions[0].content === "__dqinit"
    ) {
      return this.view = "dq_init";
    }
    // else if auth server admin page
    // check if token exist in localstorage if it does serve the admin page.
    // if admin page is renamed the app needs to be restarted
    else if (this.auth) {
      return this.view = 'admin_portal'
    }
  }
};
</script>

<style>
@import url("@/assets/dq-css/dq-fw-0.3.css");
@import url('@/assets/dq-css/normalize.css');
</style>
