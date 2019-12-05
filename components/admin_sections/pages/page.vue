<template>
  <div class="flex flex1 flexcol" v-if="listifyInputData">
    <!-- <debug :data="{$props:{data,listifyInputData}}"></debug> -->
    <listify
      v-if="ready"
      class="borderred"
      @onContextAction="contextAction"
      @onAddItem="addPage"
      :inputData="listifyInputData"
      :config="listifyConfig"
      :appearance="listifyAppearance"
    >
      <div
        v-if="modal_Content == 'loading'"
        style="background:white;width:; height:; box-shadow:0px 0px 10px 5px #EEEEEF;"
        class="pad050"
        slot="modal"
      >
        <strong>Loading resources ...</strong>
      </div>

      <div
        style="min-width:350px;  box-shadow:0px 0px 10px 5px #EEEEEF;"
        slot="modal"
        v-if="typeof modal_Content == 'string'"
        role="modal container"
        class="borderRad4"
      >
        <div class="darkprimary pad050 flex spacebetween">
          <div>{{modal_Content}}</div>
          <div>
            <i @click="Mutate_Modal(false)" class="fas fa-times pointer"></i>
          </div>
        </div>
        <div role="add page" style="background:white;">
          <div v-if="modal_Content == 'Add Page'">
            <div class="fullwidth pad125">
              <strong>Name of the new page:</strong>
              <div>
                <input
                  id="dq-create-new-page"
                  v-model="route_name"
                  class="fullwidth pad025"
                  type="text"
                />
              </div>
              <div v-if="err" style="color:#ae1100" class="pad025 backgrounderr err">{{err}}</div>
              <div class="padtop125 flex flexend pointer">
                <!-- <div class="">Create new page</div> -->
                <!-- <div class="">Create new page</div> -->
                <button
                  @click="sumbitNewPage"
                  class="buttonreset pad050 borderRad4 darkprimary"
                >Create new page</button>
              </div>
            </div>
          </div>
          <div v-if="modal_Content == 'Rename Page'">
            <div class="fullwidth pad125">
              <strong v-if="rename_subject" >Rename page:</strong>
              <i>{{rename_subject}}</i>
              <div>
                <input
                  id="dq-create-new-page"
                  v-model="route_name"
                  class="fullwidth pad025"
                  type="text"
                />
              </div>
              <transition name="fade">
                <div v-if="err" class="pad050 backgrounderr err">{{err}}</div>
              </transition>
              <div class="padtop125 flex flexend pointer">
                <button
                  @click="renamePage"
                  class="buttonreset pad050 borderRad4 darkprimary"
                >Rename page</button>
              </div>
            </div>
          </div>
          <div v-if="modal_Content == 'Delete Page'">delete page</div>
        </div>
      </div>

      <div slot="item-icon">
        <i class="fas fa-file-alt"></i>
      </div>
    </listify>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["my_pane_index", "data", "theme", "data_index"],
  beforeCreate() {
    this.$store.dispatch("pages/get_routes");
    this.$store.commit("pane_system/set_pane_config", {
      title: "Page Route list",
      pane_width: "600px",
      pane_head_bg_color: "rgb(48, 51, 64)",
      pane_head_title_color: "white",
      renderOnce: true,
      closable: false
    });
  },
  data: () => ({
    listifyConfig: {
      title: "pages",
      isNumbered: false, // detemines if the list show numbered list
      propDisplay: "PageName", // detemines the display value of each list
      defaultSelected: null, // default selected option on load
      allowFilterSearch: false,
      search: true, // shows the search functionality if true,
      searchBarPlaceHolder: "Search items",
      contextActions: ["open page", "sub pages", "rename", "delete"],
      contextStyle: "showOnTheSide", // showOnTheSide, showOnCLickExpand
      showModal: false,
      showFilter: true
    },
    listifyAppearance: {
      // dimensions
      height: "100%", // required
      width: "100%", // required

      // text
      textColor: "#196ADD",

      // border colors
      borderColor: "#F1F8FF",
      listBorderColor: "#e8f4f8",

      // backgrounds
      bodyBg: "white",
      searchBarBgColor: "#F1F8FF",
      searchBarTextColor: "#24292E",
      modalBgOverlay: "white",
      odds: "white", // background of odd index item in the list
      evens: "white", // background of even index item in the list

      // hovers
      hoverTextColor: "#196ADD",
      hoverBgColor: "#F1F8FF",
      hoverCustomStyle: {
        fontWeight: 700
      },

      // list padding
      listPadding: "l", // s m l
      listContainerPadding: true, // true false

      // active
      activeTextColor: "white",
      activeBgColor: "lightblue",
      acitveCustomStyle: {
        // fontWeight: 700,
        // padding:'5px',
      }
    },
    listifyInputData: undefined,
    modal_Content: undefined,
    route_name: undefined,
    err: undefined,
    ready: false,
    rawPages: undefined,
    rename_subject: undefined
  }),
  mounted() {
    this.listifyInputData = this.$store.state.pages.route;

    setTimeout(() => {
      this.rawPages = this.listifyInputData.map(({ PageName }) => {
        return PageName;
      });
    }, 100);
  },
  computed: {
    ...mapGetters({
      _routes: "pages/routes",
      _getCollection: "collections/getCollection"
    })
  },
  methods: {
    addPage() {
      /**
       * Opens the add page modal
       */
      this.Mutate_Modal(true, "Add Page");
      setTimeout(() => {
        const new_page_modal = document.getElementById("dq-create-new-page");
        new_page_modal.focus();
      }, 20);
    },
    renamePage() {},
    sumbitNewPage() {
      if (this.err == false) {
        this.err = false;
        const parent =
          this.data.page == undefined
            ? undefined
            : (() => {
                if (this.my_pane_index > 0) {
                  return this.data.page.split("/").join(".");
                } else {
                  return this.data.page;
                }
              })();
        this.$store
          .dispatch("systemCall", {
            command: "createPage",
            section: "pageMethods",
            data: {
              name: this.route_name,
              parent
            },
            method: "post"
          })
          .then(response => {
            if (response.status) {
              this.Mutate_Modal(false);
              this.$store.dispatch("pages/get_routes");
            }
          })
          .catch(err => {
            alert(err);
            console.log(err);
          });
      }
    },
    Mutate_Modal(state, content) {
      this.listifyConfig.showModal = state;

      if (state == true) {
        this.modal_Content = content;
      } else if (state == false) {
        setTimeout(() => {
          this.modal_Content = undefined;
        }, 200);
      }
    },
    Context_OpenPage(val) {
      /**
       * Spawn a new pane window : page-selected.vue
       */
      console.log("Context Open Page!");
      if (this.$store.state.pages.stages.length == 0) {
        this.$store.dispatch("pane_system/open", {
          name: "PageSelected",
          index: this.my_pane_index,
          pane_width: "800px",
          renderOnce: true,
          pane_head_bg_color: "rgb(48, 51, 64)",
          data: {
            page: val.actionCastOn.PageName,
            root: val.index,
            ui: "page_selected"
          }
        });
      } else {
        this.$store.commit("modal/set_modal", {
          head: "Unsave changes deteceted",
          body: "page_warn_unsaved",
          config: {
            ui_type: "custom",
            closable: false
          }
        });
      }
    },
    Context_OpenSubPage(val) {
      /**
       * Spawn a copy of this pane window
       */
      if (this.$store.state.pages.stages.length == 0) {
        this.$store.dispatch("pane_system/open", {
          name: "pages",
          index: this.my_pane_index,
          pane_width: "800px",
          renderOnce: true,
          pane_head_bg_color: "rgb(48, 51, 64)",
          data: {
            page: val.actionCastOn.PageName,
            root: val.index,
            ui: "page_selected"
          }
        });
      } else {
        this.$store.commit("modal/set_modal", {
          head: "Unsave changes deteceted",
          body: "page_warn_unsaved",
          config: {
            ui_type: "custom",
            closable: false
          }
        });
      }
    },
    Context_RenamePage({actionCastOn}) {
      /**
       * Opens the rename modal
       */
      this.Mutate_Modal(true, "Rename Page");
      this.rename_subject = actionCastOn.PageName
    },
    Context_DeletePage(actionCastOn) {
      /**
       * Opens the delete modal
       */
      this.Mutate_Modal(true, "Delete Page");
    },
    contextAction(val) {
      switch (val.actionName) {
        case "open page":
          this.Context_OpenPage(val);
          break;
        case "sub pages":
          this.Context_OpenSubPage(val);
          break;
        case "rename":
          this.Context_RenamePage(val);
          break;
        case "delete":
          this.Context_DeletePage(val);
          break;
      }
    }
  },
  watch: {
    route_name(current, old) {
      if (current.indexOf(" ") != -1) {
        this.err = "Error: page name cannot have white spaces";
      } else {
        this.err = false;
      }

      if (this.rawPages.includes(current)) {
        this.err = `Error: "${current}" already exist`;
      }
    },
    _routes(current, old) {
      // pane head mutation
      if (this.my_pane_index > 0) {
        this.$store.commit("pane_system/alter_pane_config", {
          pane_index: this.my_pane_index,
          alter: {
            title: `Sub Routes of: ${this.data.page}`
          }
        });
      }

      // variables
      const paneTitle = this.$store.state.pane_system.pane_index_config_list[
        this.my_pane_index
      ].title;
      let PageNameArray = [];

      // logic 1
      current.map(({ PageName }) => {
        if (this.my_pane_index + 1 == PageName.split("/").length) {
          const valid_amount_of_slash = this.my_pane_index;
          if (paneTitle == `Sub Routes of: ${this.data.page}`) {
            console.log("test");
            if (PageName.startsWith(`${this.data.page}/`)) {
              PageNameArray.push({ PageName });
            }
          } else {
            PageNameArray.push({ PageName });
          }
        }
      });
      this.listifyInputData = PageNameArray;

      setTimeout(() => {
        this.ready = true;
      }, 100);
    }
  }
};
</script>