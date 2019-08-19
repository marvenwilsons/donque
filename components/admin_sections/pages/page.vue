<template>
  <div v-if="ready" class="flex1 flex flexcol">
    <div class="flex1" v-if="data">
      <div class="fullheight-percent" v-if="data.ui === 'page_selected' && ui_index === my_pane_index">
        <pageSel :data="$store.state.pane_system.pane_index_config_list[my_pane_index].title"></pageSel>
      </div>
    </div>
    <div v-if="ui === 'page'" class="fullheight-percent relative">
      <!--  -->
      <div
        v-if="create_route"
        class="flex flexcol absolute fullwidth fullheight-percent"
        style="z-index: 100; background:white;"
      >
        <div :style="{...theme.modal_host_style}" class="flex flexcol margin125">
          <div
            :style="{background:theme.pane_head_bg_color}"
            class="pad050 flex flexcenter spacebetween"
          >
            <strong>Create new page</strong>
            <i @click="create_route = false" class="pointer fas fa-times padright025"></i>
          </div>
          <div class="fullwidth pad125">
            <strong>Name of the new page:</strong>
            <div>
              <input v-model="route_name" class="fullwidth pad025" type="text" />
            </div>
            <div v-if="err" style="color:#ae1100" class="pad025">{{err}}</div>
            <div class="padtop125 flex flexend pointer">
              <!-- <div class="">Create new page</div> -->
              <button
                :style="{...theme.modal_button_style}"
                @click="sumbit"
                class="buttonreset pad050"
              >Create new page</button>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="pad125">
        <div class="flex flexcenter padtop125 padbottom125">
          <div class="flex1 padright025">
            <strong>search:</strong>
          </div>
          <div class="flex7">
            <input class="pad025 flex fullwidth" type="text" />
          </div>
          <div class="flex1">
            <i class="fas fa-search padleft025 pointer"></i>
            <i @click="create_route = true" class="fas fa-plus pointer"></i>
          </div>
        </div>
      </div>
      <div class="fullheight-percent relative" style="overflow:auto;">
        <div class="absolute fullwidth fullheight-percent">
          <!-- loop -->
          <div
            class="pointer margin050 pad050 flex dq-page-item-host"
            v-for="(page,p_index) in pages"
            :key="`dq-page-list-${p_index}-${page.name}`"
            :id="`dq-page-${p_index}`"
            :style="setStyle( active === `dq-page-${p_index}` || cur_actv == `dq-page-${p_index}`)"
            @mouseover="active = `dq-page-${p_index}`"
            @mouseleave="cur_actv != `dq-page-${p_index}` && (active = undefined)"
          >
            <!-- data -->
            <div class="flex1">
              <small class="flex spacebetween">
                <span class="flex1">
                  <Strong>{{p_index}}</Strong>
                </span>
                <!-- click -->
                <span
                  @click="
                    cur_actv = `dq-page-${p_index}`,
                    $store.dispatch('pane_system/open',{name: 'pages', index: my_pane_index, data: {page,root: p_index, ui: 'page'}, data_index: p_index})"
                  class="underlinehover flex flexend"
                >sub pages - {{Object.keys(page).length}}</span>
                <span
                  :class="[cur_actv == `dq-page-${p_index}` && 'underline' , 'underlinehover', 'flex' ,'padleft125' ,'flexend']"
                >route settings</span>
                <!-- click -->
                <span
                  @click="
                    cur_actv = `dq-page-${p_index}`,
                    $store.dispatch('pane_system/open',{name: 'pages', index: my_pane_index, data: {page,root: p_index, ui:'page_selected'}, data_index: p_index})"
                  :class="[cur_actv == `dq-page-${p_index}` && 'underline' , 'underlinehover', 'flex' ,'padleft125' ,'flexend']"
                >open</span>
                <!--  -->
              </small>
            </div>
          </div>
          <!-- end -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import page_sel from "./page-selected/page-selected.vue";
import { mapGetters } from "vuex";

export default {
  props: ["my_pane_index", "data", "theme", "data_index"],
  data() {
    return {
      ui: "page",
      ready: true,
      ui_index: undefined,
      create_route: false,
      cur_actv: undefined,
      i_active: undefined,
      active: undefined,
      cur_root: undefined,
      err: false,
      route_name: undefined,
      hoverBgColor: this.$store.state.theme.notify_tile_body_bg_hover_color,
      heverBgColor2: this.$store.state.theme.heading_bg_color,
      pages: {}
    };
  },
  components: {
    pageSel: page_sel
  },
  methods: {
    setStyle(c) {
      if (c) {
        return {
          background: this.$store.state.theme.notify_tile_body_bg_hover_color,
          borderLeft: `2px solid ${this.$store.state.theme.heading_bg_color}`,
          border: "2px solid whitesmoke"
        };
      } else {
        return {
          background: this.$store.state.theme.notify_tile_body_bg_color,
          border: "2px solid whitesmoke"
        };
      }
    },
    sumbit() {
      if (this.route_name) {
        if (this.route_name.indexOf(" ") != -1) {
          this.err = "Error: page name cannot have white spaces";
        } else {
          this.err = false;
        }
      } else {
        this.err = "Error: page name is a required";
      }

      if (this.err == false) {
        this.err = false;

        this.$store
          .dispatch("systemCall", {
            command: "createPage",
            section: "pageMethods",
            data: {
              name: this.route_name,
              parent:
                this.$store.state.pane_system.pane_index_config_list[
                  this.my_pane_index
                ].title == "Route list"
                  ? undefined
                  : (() => {
                      if (this.my_pane_index > 1) {
                        return this.$store.state.pane_system.pane_index_config_list[
                          this.my_pane_index
                        ].title
                          .split("/")
                          .join(".");
                      } else {
                        return this.$store.state.pane_system
                          .pane_index_config_list[this.my_pane_index].title;
                      }
                    })()
            },
            method: "post"
          })
          .then(response => {
            // console.log("this is response");
            if (response.status) {
              // this.create_route = false
            } else {
            }
          })
          .catch(err => {
            alert(err)
            console.log(err);
          });
      }
    }
  },
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Route list",
      pane_width: "350px",
      renderOnce: true,
      closable: false
    });
  },
  computed: {
    ...mapGetters({
      pageGetter: "pages/routes"
    })
  },
  watch: {
    pageGetter(n, o) {
      if (
        this.$store.state.pane_system.pane_index_config_list[this.my_pane_index]
          .title == "Route list"
      ) {
        this.pages = n;
      } else {
        //
        const paneTitle = this.$store.state.pane_system.pane_index_config_list[
          this.my_pane_index
        ].title;

        // dive to prop and update pages view
        if (paneTitle.indexOf("/") == -1) {
          this.pages = n[paneTitle];
        } else {
          const titles = paneTitle.split("/");
          let temp = undefined;

          for (var i = 0; i < titles.length; i++) {
            if (temp == undefined) {
              temp = n[titles[i]];
            } else {
              temp = temp[titles[i]];
            }
          }

          this.pages = temp;
        }
      }
    }
  },
  mounted() {
    // set up functions to be executed after modal success
    this.$store.commit("modal/exec_after_msg", () => {
      this.$store.dispatch("pages/get_routes");
      this.create_route = false;
      this.route_name = "";
    });

    // set class css defaults
    this.$store.dispatch("theme/set_class_css_defaults", {
      class: ["dq-page-item-host"],
      css_keys: ["transition"],
      css_values: ["0.2s"]
    });

    // fetch pages on the selectedRoute
    // systemCall getPageListInRoute, pageMethods
    if (this.$store.state.pages.route) {
      // route is not undefined, loacating a sub route
      // get the data passed, locate the key in the store, feed it into the pages object this.pages
      // console.log("locating a sub route");

      if (this.data) {
        // assigning data to sub page
        this.pages = this.data.page;

        this.ui = this.data.ui;
        if (this.data.ui === "page_selected") {
          this.ui_index = this.my_pane_index;
          this.$store.commit("pane_system/alter_pane_config", {
            pane_index: this.my_pane_index,
            alter: {
              pane_width: "100%"
            }
          });
        }

        // altering pane title
        if (this.my_pane_index > 0) {
          let r = [];
          let z = 0;

          this.$store.state.pane_system.pane_index_config_list.map(
            (configObject, configIndex) => {
              if (configIndex > 0 && configIndex != this.my_pane_index) {
                // console.log(configObject.title);
                r.push(configObject.title);
              }

              if (configIndex == this.my_pane_index) {
                r.push(this.data.root);
              }
            }
          );

          if (this.my_pane_index > 2) {
            const t = r;
            r.splice(0, this.my_pane_index - 2);
          }

          this.cur_root = r.join("/");
          this.$store.commit("pane_system/alter_pane_config", {
            pane_index: this.my_pane_index,
            alter: {
              title: r.join("/")
            }
          });
        } else {
          this.$store.commit("pane_system/alter_pane_config", {
            pane_index: this.my_pane_index,
            alter: {
              title: this.data.root
            }
          });
        }
      } else {
        // after the store is been initialized, but pages section
        // somehow got initialized
        this.pages = this.$store.state.pages.route;
      }
    } else {
      // route is undefined fetching all routes
      this.$store.dispatch("pages/get_routes");

      // simulating request
      setTimeout(() => {
        this.pages = this.$store.state.pages.route;
      }, 200);
    }
  }
};
</script>

<style>
.dq-page-item {
  border-radius: 100%;
}
.underlinehover:hover {
  text-decoration: underline;
}
.underline {
  text-decoration: underline;
}
</style>
