<template>
  <div
    v-dq-disable-horizontal-scrolling
    id="dq-main"
    class="fullheight-percent fullwidth relative flex flexcenter"
  >
    <transition name="fade">
      <div v-if="isReady" id="dq-main-w" class="absolute fullwidth flex fullheight-percent pad125">
        <div
          v-for="(panes,pane_index) in $store.state.pane_system.pane_index_list"
          :key="`p-${pane_index}`"
          role="pane-host"
          class="fullheight-percent flex"
          :style="{minWidth: width_handler(config != undefined,config,pane_index), maxWidth: width_handler(config != undefined,config,pane_index)}"
        >
          <!-- pane -->
          <div
            :style="{boxShadow:'0px 0px 10px 1px gray',borderRadius: '5px',background:'rgb(233, 239, 243)'}"
            :id="`${panes}`"
            class="fullheight-percent flex flexcol flex1"
          >
            {{ani(`pane-${pane_index}-${panes} `)}}
            <!-- id use to be: pane-${pane_index}-${panes} -->
            <!-- <debug :data="{config_state,paneSytem:$store.state.pane_system,ModalFn}"></debug> -->

            <!-- pane head -->
            <div v-if="isReady">
              {{init_head($store.state.pane_system.pane_index_config_list)}}
              <!-- pane head and controls -->
              <div v-if="config[pane_index]" class="flex fullwidth flexcol">
                <div
                  v-if="config[pane_index].head_visibility"
                  :style="{background:config[pane_index].pane_head_bg_color, borderTopLeftRadius: '5px',borderTopRightRadius: '5px'}"
                  class="flex spacebetween fullwidth pad050"
                >
                  <div
                    class="fullwidth relative padleft050"
                    :style="{ color:config[pane_index].pane_head_title_color}"
                  >
                    <strong style="word-wrap: break-word">{{config[pane_index].title}}</strong>
                  </div>
                  <div class="flex">
                    <!-- <i
                    :style="{color:config[pane_index].pane_head_title_color}"
                    v-if="config[pane_index].maximizable"
                    class="pointer far fa-window-maximize padright025"
                    @click="$store.dispatch('pane_system/maximize',config[pane_index].comp)"
                    ></i>-->
                    <i
                      @click="paneSettings"
                      :style="{color:config[pane_index].pane_head_title_color}"
                      class="fas fa-cog padright050 pointer"
                    ></i>
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
            <div style="background:white;" class="fullheight-percent flex flexcol relative">
              <div
                :data="$store.state.pane_system.pane_data_list[pane_index]"
                :theme="$store.state.theme"
                :store="$store.state"
                :my_pane_index="pane_index"
                :my_pane="config[pane_index]"
                :is="panes"
                @SetPaneModal="PaneModalHandler"
              ></div>
              <!-- Pane Modal -->
              <div
                id="dq-pane-modal-host"
                v-if="config[pane_index] && ModalFn[pane_index][config[pane_index].title].modal"
                class="absolute fullwidth fullheight-percent flex flexcenter"
              >
                <div style="border-top-left-radius:5px;border-top-right-radius:5px;border:1px solid white;">
                  <div
                    class="DqModalContainer"
                    :style="{width: ModalFn[pane_index][config[pane_index].title].width}"
                    :id="`DqModalContainer-${pane_index}`"
                  >
                    <!-- modal head -->
                    <div
                      v-if="ModalFn[pane_index][config[pane_index].title].header"
                      style="background: rgb(48, 51, 64);color:white;border-top-left-radius:5px;border-top-right-radius:5px;"
                      class="flex spacebetween flexcenter pad050"
                    >
                      <strong
                        class="padleft050"
                      >{{ModalFn[pane_index][config[pane_index].title].title}}</strong>
                      <i
                        v-if="ModalFn[pane_index][config[pane_index].title].CanBeClose"
                        @click="$emit('UnSetPaneModal',{
                        pane_index,
                        pane_name: config[pane_index].title
                        })"
                        class="fas fa-times padright025 pointer"
                      ></i>
                    </div>
                    <div
                      :style="{background: ModalFn[pane_index][config[pane_index].title].background ? ModalFn[pane_index][config[pane_index].title].background : 'white'}"
                      class="pad125"
                    >
                      <div :is="ModalFn[pane_index][config[pane_index].title].modal"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pad050"></div>
        </div>
      </div>
    </transition>
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
import Office from "@/components/admin_sections/office/office.vue";

/**
 * Pages
 */
import Pages from "@/components/admin_sections/pages/page.vue"; // page list
import PageSelected from "@/components/admin_sections/pages/page-selected/page-selected.vue"; // page details and struture

//
import Dashboard from "@/components/admin_sections/dashboard/dashboard.vue";
import Components from "@/components/admin_sections/components/components.vue";

// Collections
import Collections from "@/components/admin_sections/collections/collections.vue";
import CollectionsAddEntry from "@/components/admin_sections/collections/add_entry.vue";
import CollectionsViewAll from "@/components/admin_sections/collections/view_all.vue";
import CollectionsCategories from "@/components/admin_sections/collections/categories.vue";
import CollectionsSubCategories from "@/components/admin_sections/collections/sub_categories.vue";
import ViewCatItems from "@/components/admin_sections/collections/categories/view_cat_items.vue";

//
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
import { TweenMax, TimelineLite, TweenLite } from "gsap";

export default {
  props: ["ModalContent", "ModalFn"],
  data() {
    return {
      isReady: false,
      config_copy: undefined,
      comps: {},
      scroll_val: 0,
      scroll_val_temp: 0,
      main_w: undefined,
      max_scroll: 333,
      latest_id: undefined
    };
  },
  methods: {
    PaneModalHandler(value) {
      this.$emit("insertModal", value);
    },
    UnSetPaneModal() {
      this.$emit("UnSetPaneModal");
    },
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
    ani(id) {},
    paneSettings() {
      /**
       * Opens up pane modal, with tabs,
       * the tabs are --> | Raw Data | VDS | Properties | Change UI-Host
       * VDS
       * VDS - Valid Data Structure, explains the correct input in order for the pane to work correctly
       * VDS - ex. "An array of objects, the object must this properties, a. b. c. d."
       *
       * Properties
       * "Pane Id", "UI-host", "Pane width", "Pane name", "Pane set by"
       *
       */
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
    Office,

    /**
     * pages
     */
    Pages,
    PageSelected,

    //
    Components,

    // Collections
    Collections,
    CollectionsAddEntry,
    CollectionsViewAll,
    CollectionsCategories,
    CollectionsSubCategories,
    ViewCatItems,

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
      config_state: "pane_system/config_state",
      pane_list_state: "pane_system/list_state"
    }),
    config() {
      return this.config_copy;
    },
    get_horizontal_scrolling() {
      return this.$store.state.pane_system.horizontal_scrolling;
    },
    get_scroll_val() {
      return this.scroll_val;
    }
  },
  watch: {
    config_state(n, o) {
      this.isReady = true;
    },
    get_scroll_val(current, old) {
      if (this.get_horizontal_scrolling) {
        if (current >= this.max_scroll) {
          if (this.scroll_val_temp) {
            this.scroll_val = this.scroll_val_temp;
            this.scroll_val_temp = 0;
          } else {
            this.scroll_val = this.max_scroll;
          }
        } else if (current < 20) {
          if (this.scroll_val_temp) {
            this.scroll_val = this.scroll_val_temp;
            this.scroll_val_temp = 0;
          } else {
            this.scroll_val = 0;
          }
        }
        this.main_w.scrollLeft = current;
      } else {
        this.scroll_val_temp = current;
      }
    },
    pane_list_state(current, old) {
      setTimeout(() => {
        const latest_pane = current[current.length - 1];
        const n = document.getElementById(latest_pane);
        if (n) {
          // TweenMax.fromTo(n, 0.3, { opacity: "0" }, { opacity: "1" });
        }
      }, 0);
    }
  },

  updated() {
    const element = document.getElementById("dq-main-w");

    const max_scroll = element.scrollWidth - element.clientWidth;
    if (max_scroll) {
      this.max_scroll = max_scroll;
    }
  },
  mounted() {
    window.addEventListener("wheel", e => {
      if (e.deltaY > 0) {
        this.scroll_val += 70;
      } else {
        this.scroll_val -= 70;
      }
    });

    setTimeout(() => {
      this.main_w = document.getElementById("dq-main-w");
    }, 0);
  }
};
</script>

<style>
#dq-main-w {
  overflow: scroll hidden;
}
.DqModalContainer {
  box-shadow: 0px 0px 10px 5px rgba(48, 51, 64, 0.144);
  opacity: 0;
}
#dq-pane-modal-host {
  z-index: 999;
  background-color: rgba(91, 95, 110, 0.034);
  border-radius: 5px;
}
</style>
