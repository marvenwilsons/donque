<template>
  <!-- @collections html -->
  <div class="fullheight-percent">
    <listify
      @onAddItem="addNewCollection"
      @onContextAction="contextAction"
      :inputData="get_CollectionNames"
      :config="{
           title: 'Collections total',
           isNumbered: false, // detemines if the list show numbered list
           propDisplay: 'Collection Name', // detemines the display value of each list
           defaultSelected: null, // default selected option on load
           allowFilterSearch: false,
           search: true, // shows the search functionality if true,
           searchBarPlaceHolder: 'Search Collection',
           contextActions: [  // @listify usage - dynamiContextActionTitles
            `Add New Entry`,
            `View All`,
            'Categories',
            'Delete',
            'Edit Schema'],
           dynamiContextActionTitles: false,
           contextStyle: 'showOnTheSide', // showOnTheSide, showOnCLickExpand
           showModal:modal_State,
           showFilter: true,
       }"
      :appearance="listify_Appearance"
    >
      <div slot="item-icon">
        <!-- icon that will show on each list item -->
        <i class="fas fa-layer-group padright125"></i>
      </div>
      <!-- @collection modal -->
      <div slot="modal">
        <div class style="background:white; width:420px; box-shadow:0px 0px 10px 5px #EEEEEF;">
          <!-- editLater - style -->
          <div
            style="background: rgb(48, 51, 64);color:white;border-top-left-radius:5px;border-top-right-radius:5px;"
            class="flex spacebetween flexcenter pad050"
          >
            <strong class="padleft050">{{modal_Content}}</strong>
            <i @click="modal_State = false" class="fas fa-times padright025 pointer"></i>
          </div>
          <div v-if="modal_Content == 'Create Collection'" class="pad125">
            <modalAddCollection @onCollectionCreated="onCollectionCreated" :data="null"></modalAddCollection>
          </div>
          <div v-if="modal_Content == 'Edit Schema'" class="pad125">
            <modalAddCollection @onEditSchemaDone="onCollectionCreated" :data="edit_schema_data"></modalAddCollection>
          </div>
          <div v-if="modal_Content == 'Delete A Collection'" class="pad125">
            <div>
              <strong>Are you sure you want to delete collection "{{modal_ContentObject['Collection Name']}}"?</strong>
              <br />
              <div class="pad050 margintop050 backgrounderr">
                <span style="font-weight:700;">Notice:</span>
                Once deleted all of the data connected to {{modal_ContentObject['Collection Name']}} collection
                will be lost forever.
              </div>
              <div class="margintop125 flex flexend">
                <!-- editLater - class darkprimary and borderRad4 attr in button -->
                <button
                  @click="delete_Collection"
                  class="buttonreset pad050 darkprimary borderRad4"
                >Yes Delete {{modal_ContentObject['Collection Name']}}</button>
                <span class="pad025"></span>
                <button
                  @click="modal_State = false"
                  class="buttonreset pad050 darkprimary borderRad4"
                >Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </listify>
  </div>
</template>

<script>
import modal_AddCollection from "./modals/add_collection";

export default {
  props: ["my_pane_index"],
  data: () => ({
    dynamic_ContextTitle_entry: ["Books", "Staff", "Products", "asdfd", "q3te"],
    modal_State: false,
    modal_Content: undefined,
    modal_ContentObject: undefined,
    raw_server_data: undefined,
    listify_Appearance: {
      // dimensions
      height: "100%", // required
      width: "100%", // required

      // text
      textColor: "#196ADD",

      // border colors
      borderColor: "#F1F8FF",
      listBorderColor: "#e8f4f8",
      searchBoxBorderColor: "rgba(48, 51, 64, 0.521)",

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
      listPadding: "m", // s m l
      listContainerPadding: true, // true false

      // active
      activeTextColor: "white",
      activeBgColor: "lightblue",
      acitveCustomStyle: {
        // fontWeight: 700,
        // padding:'5px',
      }
    },
    edit_schema_data: undefined,
    delete_collection_data: undefined
  }),
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Data Collections",
      pane_width: "650px",
      pane_head_bg_color: "rgb(48, 51, 64)",
      pane_head_title_color: "white"
    });
  },
  components: {
    modalAddCollection: modal_AddCollection
  },
  computed: {
    get_CollectionNames() {
      if (this.raw_server_data) {
        const colNames = this.raw_server_data.map(e => {
          return { "Collection Name": e.collection_name };
        });

        return colNames;
      }
    },
    get_Schemas() {
      if (this.raw_server_data) {
        const schemas = {};
        this.raw_server_data.map(e => {
          return (schemas[e.collection_name] = e.schema);
        });

        return schemas;
      }
    },
    get_tempCmd() {
      return this.$store.state.modal.temp_Cmd;
    }
  },
  watch: {
    get_tempCmd(current, prev) {
      if (current == "deleteCollection") {
        this.$store
          .dispatch("systemCall", {
            command: "fetchCollections",
            section: "collectionMethods",
            data: {},
            method: "post"
          })
          .then(({ data, status }) => {
            if (status) {
              console.log(data);
              this.raw_server_data = data.actions[0].contents;
              this.$store.commit('modal/reset_tempCmd')
            }
          })
          .catch(err => {
            alert(err);
          });
      }
    }
  },
  created() {
    this.$store
      .dispatch("systemCall", {
        command: "fetchCollections",
        section: "collectionMethods",
        data: {},
        method: "post"
      })
      .then(({ data, status }) => {
        if (status) {
          console.log(data);
          this.raw_server_data = data.actions[0].contents;
        }
      })
      .catch(err => {
        alert(err);
      });
  },
  methods: {
    addNewCollection() {
      this.modal_State = true;
      this.modal_Content = "Create Collection";
    },
    delete_Collection() {
      setTimeout(() => {
        this.modal_State = false;
      }, 100);
      this.$store
        .dispatch("systemCall", {
          command: "deleteCollection",
          section: "collectionMethods",
          data: this.delete_collection_data,
          method: "post"
        })
        .then(({ data, status }) => {
          if (status) {
            console.log("collection deleted!");
            // this.modal_State = false;
            // this.raw_server_data = data.actions[0].contents;
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    onCollectionCreated() {
      this.$store
        .dispatch("systemCall", {
          command: "fetchCollections",
          section: "collectionMethods",
          data: {},
          method: "post"
        })
        .then(({ data, status }) => {
          if (status) {
            this.modal_State = false;
            this.raw_server_data = data.actions[0].contents;
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    contextAction(val) {
      if (val.actionName == "Edit Schema") {
        this.modal_State = true;
        this.modal_Content = "Edit Schema";
        this.edit_schema_data = {
          "Collection Name": val.actionCastOn["Collection Name"],
          schema: this.get_Schemas[val.actionCastOn["Collection Name"]]
        };
      }
      if (val.actionName == "Delete") {
        this.modal_State = true;
        this.modal_ContentObject = val.actionCastOn;
        this.modal_Content = "Delete A Collection";
        this.delete_collection_data = {
          "Collection Name": val.actionCastOn["Collection Name"],
          schema: this.get_Schemas[val.actionCastOn["Collection Name"]]
        };
      }
      if (val.actionName == "Add New Entry") {
        this.$store.dispatch("pane_system/open", {
          name: "CollectionsAddEntry",
          index: this.my_pane_index,
          data: {
            "Collection Name": val.actionCastOn["Collection Name"],
            schema: this.get_Schemas[val.actionCastOn["Collection Name"]]
          }
        });
      }
      if (val.actionName == "View All") {
        this.$store.dispatch("pane_system/open", {
          name: "CollectionsViewAll",
          index: this.my_pane_index,
          data: val.actionCastOn
        });
      }
      if (val.actionName == "Categories") {
        this.$store.dispatch("pane_system/open", {
          name: "CollectionsCategories",
          index: this.my_pane_index,
          data: val.actionCastOn
        });
      }
    }
  }
};
</script>

<style>
/* editLater - css */
.buttonBlue {
  background: #0086c0;
  color: white;
}
.darkprimary {
  background: rgba(48, 51, 64, 0.911);
  color: white;
  font-weight: 600;
}
.borderRad4 {
  border-radius: 4px;
}
</style>
