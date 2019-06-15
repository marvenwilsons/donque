<template>
  <div class="fullheight-percent fullwidth relative flex">
    <div v-if="isReady" id="dq-main-w" class="absolute fullwidth flex fullheight-percent">
      <div
        v-for="(panes,pane_index) in $store.state.pane_system.pane_index_list"
        :key="`p-${pane_index}`"
        role="pane-host"
        class="fullheight-percent"
        :style="{ minWidth: width_handler(config != undefined,config,pane_index), maxWidth: width_handler(config != undefined,config,pane_index), ...$store.state.theme.pane_host_style}"
      >
        <!-- pane -->
        <div class="fullheight-percent">
          <!-- pane head -->
          <div v-if="isReady">
            {{init_head($store.state.pane_system.pane_index_config_list)}}
            <!-- pane head and controls -->
            <div v-if="config[pane_index]" class="flex fullwidth">
              <div
                v-if="config[pane_index].head_visibility"
                :style="{background:config[pane_index].pane_head_bg_color}"
                class="flex spacebetween fullwidth pad025"
              >
                <div :style="{ color:config[pane_index].pane_head_title_color}">
                  <strong>{{config[pane_index].title}}</strong>
                </div>
                <div>
                  <i
                    :style="{color:config[pane_index].pane_head_title_color}"
                    v-if="config[pane_index].maximizable"
                    class="pointer far fa-window-maximize padright025"
                    @click="$store.dispatch('pane_system/maximize')"
                  ></i>
                  <i
                    :style="{color:config[pane_index].pane_head_title_color}"
                    v-if="config[pane_index].closable"
                    class="pointer fas fa-times padright025"
                    @click="$store.dispatch('pane_system/close')"
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <!-- pane body -->
          <div>
            <div :my_pane_index="pane_index" :is="panes"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Administration
 */
import Administration from "@/components/admin_sections/administration/admin.vue"; // admin options list
import Addnewapplicationadmin from "@/components/admin_sections/administration/addNewAdminForm.vue"; // add new application admin from
// add new application admin from
// add new database admin form
// database admin list
// current live admins
// current blocked admins
// lost password request list

/**
 * Pages
 */
import Pages from "@/components/admin_sections/pages/page.vue"; // page list
// page details and struture

//
import Dashboard from "@/components/admin_sections/dashboard/dashboard.vue";
import Components from "@/components/admin_sections/components/components.vue";
import Collections from "@/components/admin_sections/collections/collections.vue";
import Messages from "@/components/admin_sections/messages/messages.vue";
import Todos from "@/components/admin_sections/todos/todos.vue";
import Profile from "@/components/admin_sections/profile/profile.vue";
import Files from "@/components/admin_sections/files/files.vue";
import Plugins from "@/components/admin_sections/plugins/plugins.vue";
import Settings from "@/components/admin_sections/settings/settings.vue";
import Marketplace from "@/components/admin_sections/marketplace/marketplace.vue";
import Database from "@/components/admin_sections/database/database.vue";
import Console from "@/components/admin_sections/console/console.vue";
import Task from "@/components/admin_sections/task/task.vue";

//
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isReady: false,
      config_copy: undefined
    };
  },
  methods: {
    init_head(arg) {
      this.config_copy = arg;
    },
    width_handler(arg, config, index) {
      if (arg) {
        console.log(index);
        if (config[index] === undefined) {
          return "300px";
        }else {
          return config[index].pane_width
        }
      } else {
        return "300px";
      }
    }
  },
  components: {
    Dashboard,
    /**
     * administartion
     */
    Administration,
    Addnewapplicationadmin, // this is a form

    /**
     * pages
     */
    Pages,
    Components,
    Collections,
    Messages,
    Todos,
    Profile,
    Plugins,
    Settings,
    Marketplace,
    Database,
    Console,
    Files,
    Task
  },
  computed: {
    ...mapGetters({
      config_state: "pane_system/config_state"
    }),
    config() {
      return this.config_copy;
    }
  },
  watch: {
    config_state(n, o) {
      this.isReady = true;
    }
  }
};
</script>

<style>
#dq-main-w {
  overflow-y: hidden;
}
</style>
