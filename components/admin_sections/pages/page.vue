<template>
  <div class="flex1">
    <div class="fullheight-percent relative">
      <!--  -->
      {{my_pane_index}}
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
            <strong>Create new route</strong>
            <i @click="create_route = false" class="pointer fas fa-times padright025"></i>
          </div>
          <div class="fullwidth pad125">
            <strong>Name of the new route:</strong>
            <div>
              <input class="fullwidth pad025" type="text" />
            </div>
            <div class="padtop125 flex flexend pointer">
              <!-- <div class="">Create new page</div> -->
              <button
                :style="{...theme.modal_button_style}"
                class="buttonreset pad050"
              >Create new route</button>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="pad125">
        <div class="flex flexcenter">
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
                <span
                  @click="
                    cur_actv = `dq-page-${p_index}`,
                    $store.dispatch('pane_system/open',{name: 'pages', index: my_pane_index, data: {page,root: p_index}, data_index: p_index})"
                  class="underlinehover flex flexend"
                >sub pages - {{Object.keys(page).length}}</span>
                <span class="flex flexend padleft125">refresh</span>
                <span
                  @click="
                    cur_actv = `dq-page-${p_index}`,
                    $store.dispatch('pane_system/open',{name: 'pageSelected', index: my_pane_index, data: p_index, data_index: p_index})
                    "
                  :class="[cur_actv == `dq-page-${p_index}` && 'underline' , 'underlinehover', 'flex' ,'padleft125' ,'flexend']"
                >edit</span>
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
export default {
  props: ["my_pane_index", "data", "theme", "data_index"],
  data() {
    return {
      create_route: false,
      cur_actv: undefined,
      i_active: undefined,
      active: undefined,
      hoverBgColor: this.$store.state.theme.notify_tile_body_bg_hover_color,
      heverBgColor2: this.$store.state.theme.heading_bg_color,
      pages: {}
    };
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
  mounted() {
    console.log("page mounting");
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
      console.log("locating a sub route");

      if (this.data) {
        // assigning data to sub page
        this.pages = this.data.page;

        // altering pane title
        if (this.my_pane_index > 1) {
          console.log("hey");
          let r = [];
          let z = 0;

          this.$store.state.pane_system.pane_index_config_list.map(
            (configObject, configIndex) => {

              if (configIndex > 0 && configIndex != this.my_pane_index) {
                console.log(configObject.title);
                r.push(configObject.title);
              }

              if (configIndex == this.my_pane_index) {
                r.push(this.data.root);
              }
            }
          );

          if(this.my_pane_index > 2){
            const t = r
            r.splice(0,this.my_pane_index - 2)
          }

          console.log(r.join("/"));
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
      console.log("getting routes");
      this.$store.dispatch("pages/get_routes");

      this.$store.state.pages.route;
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
