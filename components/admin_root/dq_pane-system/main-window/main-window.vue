<template>
  <div class="fullheight-percent fullwidth relative flex flexcenter">
    <div v-if="isReady" id="dq-main-w" class="absolute fullwidth flex fullheight-percent pad125">
      <div
        v-for="(panes,pane_index) in $store.state.pane_system.pane_index_list"
        :key="`p-${pane_index}`"
        role="pane-host"
        class="fullheight-percent  flex"
        :style="{minWidth: width_handler(config != undefined,config,pane_index), maxWidth: width_handler(config != undefined,config,pane_index)}"
      >
        <!-- pane -->
        <div
        :style="{boxShadow:'0px 0px 1px 1px lightgray',borderRadius: '5px',...$store.state.theme.pane_host_style}"
         :id="`pane-${pane_index}-${panes}`" class="fullheight-percent flex flexcol flex1">
          {{ani(`pane-${pane_index}-${panes}`)}}
          <!-- pane head -->
          <div v-if="isReady">
            {{init_head($store.state.pane_system.pane_index_config_list)}}
            <!-- pane head and controls -->
            <div v-if="config[pane_index]" class="flex fullwidth flexcol">
              <!-- {{config[pane_index].title}} -->
              <!-- {{config[pane_index]}} -->
              <div
                v-if="config[pane_index].head_visibility"
                :style="{background:config[pane_index].pane_head_bg_color, borderRadius: '5px 5px 0px 0px'}"
                class="flex spacebetween fullwidth pad050"
              >
                <div class="fullwidth relative padleft050" :style="{ color:config[pane_index].pane_head_title_color}">
                  <strong style="word-wrap: break-word">{{config[pane_index].title}}</strong>
                </div>
                <div>
                  <!-- <i
                    :style="{color:config[pane_index].pane_head_title_color}"
                    v-if="config[pane_index].maximizable"
                    class="pointer far fa-window-maximize padright025"
                    @click="$store.dispatch('pane_system/maximize',config[pane_index].comp)"
                  ></i>-->
                  <i
                    :style="{color:config[pane_index].pane_head_title_color}"
                    v-if="config[pane_index].closable"
                    class="pointer fas fa-times padright025"
                    @click="$store.dispatch('pane_system/close',pane_index)"
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <!-- pane body -->
          <div class="fullheight-percent flex flexcol">
            <div
              :data="$store.state.pane_system.pane_data_obj[panes]"
              :theme="$store.state.theme"
              :store="$store.state"
              :my_pane_index="pane_index"
              :is="panes"
            ></div>
          </div>
        </div>
        <div class="pad050"></div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Administration
 */
import Administration from "@/components/admin_sections/administration/admin.vue"; // admin options list
import Addnewapplicationadmin from "@/components/admin_sections/administration/addNewAdminForm.vue"; // add new application admin from]
import Addnewdatabaseadmin from "@/components/admin_sections/administration/add-new-db-admin/add_new_db_admin.vue"; // add new database admin form
import Applicationadminlist from "@/components/admin_sections/administration/app-admin-list/app_admin_list.vue"; // database admin list
import Currentliveadmins from "@/components/admin_sections/administration/cur-live-admins/cur_live_admins"; // current live admins
import Databaseadminlist from "@/components/admin_sections/administration/db-admin-list/db_admin_list.vue"; // database admin list
import Currentblockedadmins from "@/components/admin_sections/administration/cur-blocked-admins/cur_blocked_admins.vue"; // current blocked admins
import Lostpasswordrequest from "@/components/admin_sections/administration/lost-pass-req/lost-pass-req.vue"; // lost password request list
import Createnewteam from "@/components/admin_sections/administration/team-create/create-team.vue"; // crate team form
import Displayallteams from "@/components/admin_sections/administration/team-list/team-list.vue"; // team list
import Createcustomroles from "@/components/admin_sections/administration/roles-create/roles-create.vue"; // roles create
import Displayallroles from "@/components/admin_sections/administration/roles-list/roles-list.vue";

/**
 * Pages
 */
import Pages from "@/components/admin_sections/pages/page.vue"; // page list
import PageSelected from "@/components/admin_sections/pages/page-selected/page-selected.vue"; // page details and struture

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
import Console from "@/components/admin_sections/console//view/console.vue";
import Task from "@/components/admin_sections/task/task.vue";

//
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isReady: false,
      config_copy: undefined,
      comps: {}
    };
  },
  methods: {
    init_head(arg) {
      this.config_copy = arg;
    },
    width_handler(arg, config, index) {
      if (arg) {
        if (config[index] === undefined) {
          return "300px";
        } else {
          return config[index].pane_width;
        }
      } else {
        return "300px";
      }
    },
    ani(id) {
      // console.log(id)
    }
  },
  components: {
    Dashboard,
    /**
     * administartion
     */
    Administration,
    Addnewapplicationadmin, // this is a form
    Addnewdatabaseadmin,
    Applicationadminlist,
    Currentliveadmins,
    Databaseadminlist,
    Currentblockedadmins,
    Lostpasswordrequest,
    Createnewteam,
    Displayallteams,
    Createcustomroles,
    Displayallroles,

    /**
     * pages
     */
    Pages,
    PageSelected,

    //
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
