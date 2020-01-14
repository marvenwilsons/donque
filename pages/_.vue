<template>
  <div :data="page_data" :is="view"></div>
</template>

<script>
// Admin's Root components
import dq_login from "@/components/admin_root/app_login/dqlogin.vue";
import dq_init from "@/components/admin_root/app_init/dqinit.vue";
import admin_portal from "@/components/admin_root/admin_portal/admin-portal.vue";
import public_portal from "@/components/admin_root/public_portal/public-portal.vue";

import { mapGetters } from "vuex";
import loopMixn from './loop.mixin'
import loopMixn1 from "./loop-mixin1"


export default {
  mixins:[loopMixn1,loopMixn],
  data() {
    return {
      siteTitle: "petroff",
      mounted_data: undefined,
      auth: undefined,
      view: undefined,
      layout: "admin",
    };
  },
  layout: context => {
    console.log("** _.vue layout");
    if (context.route.path === "/admin") {
      return "admin";
    } else if(context.store.state.current_page != undefined) {
      return context.store.state.current_page.layout
    } else if(context.route.path === '/dqlogin') {
      return 'empty'
    } else {
      context.store.commit('set404',true)
    }
  },
  validate({ query, params, store }) {
    // validate if params
    console.log('** _.vue validating route')
    // console.log(params);
    // console.log(query);

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
      actionPointer: "actionPointer",
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
    }
  },
  components: {
    dq_login,
    dq_init,
    admin_portal,
    public_portal
  },
  watch: {
    actionPointer(n, o) {
      console.log('** Executing action pointer')
      const action = this.$store.state.actions[n];

      //
      if (n != undefined) {
        if (action != undefined) {
          switch (action.title) {
            case "saveToLocalStorage":
              console.log("saving to local storage!");
              this.$store.commit("modal/set_modal", {
                head: "Alert",
                body:
                  "saving to localStorage is not yet handled",
                config: {
                  ui_type: "msg",
                  closable: false
                }
              });
              break;
            case "prompt_err":
              this.$store.commit("modal/set_modal", {
                head: "Error",
                body: this.$store.state.messages,
                config: {
                  ui_type: "err",
                  closable: false
                }
              });
              // set modal to err
              break;
            case "prompt_msg":
              // set modal to prompt msg
              this.$store.commit("modal/set_modal", {
                head: "Alert",
                body: this.$store.state.messages,
                config: {
                  ui_type: "msg",
                  closable: false
                }
              });
              break;
            case "prompt_password":
              // prompt modal for password
              this.$store.commit("modal/set_modal", {
                head: "Password is needed for this operation",
                body:{
                  ui: "prompt_password",
                  data: action
                },
                config: {
                  ui_type: "custom",
                  closable: false
                }
              });
              break;
            case "redirect":
              location.href = action.content;
              break;
            case "prompt_credentials":
              alert('prompt credentials')
              break;
          }
        }
      }
    }
  },
  mounted() {
    /**
     * Setting admin data
     */
    console.log("** Mounting _.vue");
    console.log(location.pathname); 
    /**
     * page routing
     */
    this.auth = localStorage.getItem("auth");

    // this code will only execute on after the app is initialized
    // the owner has the capability to change the login link, so it is posible that the login page is
    // not dq login anymore after initialization
    if (
      (this.$store.state.actions[0].title === "redirect" &&
        this.$store.state.actions[0].content === "dqlogin") ||
      location.pathname === "/dqlogin"
    ) {
      return (this.view = "dq_login");
    }
    // this code will only execute if the app is not initialized yet
    // no admin, no app manifest, no database yet
    else if (
      this.$store.state.actions[0].title === "redirect" &&
      this.$store.state.actions[0].content === "__dqinit"
    ) {
      return (this.view = "dq_init");
    }
    // else if auth server admin page
    // check if token exist in localstorage if it does serve the admin page.
    // if admin page is renamed the app needs to be restarted
    else if (this.auth && this.$store.state.current_page == undefined) {
      console.log('admin portal')
      return (this.view = "admin_portal");
    } 
    else if (this.$store.state.current_page) {
      console.log('public portal')
      setTimeout(() => {
        this.ini1()
        setTimeout(() => {
          this.ini2()
        }, 0);
      }, 0);
      return (this.view = "public_portal")
    }
  }
};
</script>

<style>
@import url("@/assets/dq-css/dq-fw-0.3.css");
@import url("@/assets/dq-css/normalize.css");
@import url("@/assets/installed-css/my-custom.css");
</style>
