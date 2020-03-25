<template>
  <!-- @collections html -->
  <div class="fullheight-percent">
    <!-- <debug
      :data="{
      'Raw Data':$store.state.collections.rawData_fromServer,
      'Get All Collections': Collections,
      get_tempCmd}"
    ></debug>-->
    <d-listify
      @onAddItem="addNewCollection(true)"
      @onContextAction="contextAction"
      @onEmpty="onEmptyCollection"
      :inputData="Collections"
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
            'Add thumbnail',
            'Categories',
            'Delete',
            'Validation',
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
                <i
                v-if="can_be_close"
                @click="modal_State = false"
                class="fas fa-times padright025 pointer"
                ></i>
            </div>
            <!-- <div v-if="modal_Content == 'Create Collection'" class="pad125">
                <modalAddCollection @onCollectionCreated="onCollectionCreated" :data="null"></modalAddCollection>
            </div>-->
            <div v-if="modal_Content == 'Edit Schema'" class="pad125">
                hesy
                <modalAddCollection @onCollectionCreated="onCollectionCreated" @onEditSchemaDone="onCollectionCreated" :data="edit_schema_data"></modalAddCollection>
            </div>
            <!-- <div v-if="!modal_Content" class="pad125">
                <div>
                <strong>Fetching data ...</strong>
                </div>
            </div>-->
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
    </d-listify>
  </div>
</template>

<script>
import modal_AddCollection from "./modals/add_collection";
import { mapGetters } from "vuex";
import h from '../../h'

export default {
    mixins: [h],
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
    delete_collection_data: undefined,

    //
    Collections: undefined,
    can_be_close: false
  }),
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Data Collections",
      pane_width: "750px",
      pane_head_bg_color: "rgb(48, 51, 64)",
      pane_head_title_color: "white"
    });
  },
  components: {
    modalAddCollection: modal_AddCollection
  },
  computed: {
    ...mapGetters({
      _collections: "collections/getAllCollections",
      _getCollection: "collections/getCollection",
      _getAllCategoriesFromCollection:
        "collections/getAllCategoriesFromCollection"
    }),
    get_tempCmd() {
      // after confirming desctrutive function
      return this.$store.state.modal.temp_Cmd; // <- String, name of the fuction that is destructive
    }
  },
  watch: {
    _collections(current, prev) {
        let c = []
        current.map(e => {
            c.push({'Collection Name': e['Collection Name']})
        })
        this.Collections = c;
    },
    get_tempCmd(current, prev) {
      if (current == "deleteCollection") {
        this.$store.dispatch("collections/getCollectionDataFromServer");
        this.$store.commit("modal/reset_tempCmd");
      }
    },
    modal_State(current, prev) {
      if (current) {
        if (this._collections.length) {
          this.can_be_close = true;
        }
      }
    }
  },
  created() {
        this.mxn = this
        this.$store.dispatch("collections/getCollectionDataFromServer");
  },
  methods: {
    addNewCollection(closable) {
      this.mxnModalLog(modal_AddCollection, {
          title: 'Create Collection',
          width: '420px',
          closable,
          header: true
      })
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
            this.$store.dispatch("collections/getCollectionDataFromServer");
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    onCollectionCreated() {
        console.log('done creating collection')
      this.mxnModalDone()
    },
    contextAction(val) {
        switch(val.actionName) {
            case "Add New Entry":
                // open add new entery pane
                this.mxnPaneOpenSync('CollectionsAddEntry',`Add New ${val.actionCastOn['Collection Name']}`,{
                    "Collection Name": val.actionCastOn['Collection Name'],
                    schema: this._getCollection(val.actionCastOn['Collection Name']).schema
                })
            break
            case "Edit Schema":
                // Open Edit Modal Schema
                this.mxnModalLog(modal_AddCollection, {
                    title: 'Create Collection',
                    width: '420px',
                    closable: true,
                    header: true,
                    data:{
                        "Collection Name": val.actionCastOn["Collection Name"],
                        schema: this._getCollection(val.actionCastOn["Collection Name"]).schema
                    }
                })
            break
            case "Delete":
                //
                this.modal_State = true;
                this.modal_ContentObject = val.actionCastOn;
                this.modal_Content = "Delete A Collection";
                //
                this.delete_collection_data = {
                    "Collection Name": val.actionCastOn["Collection Name"],
                    schema: this._getCollection(val.actionCastOn["Collection Name"]).schema
                };
            break
            case "View All":
                const nextPaneTitle = `View All ${val.actionCastOn['Collection Name']}`
                this.mxnPaneOpenAsync('CollectionsViewAll',{
                    title: nextPaneTitle,
                    propertyToMutate: 'contents',
                    initData: {
                        "Collection Name": val.actionCastOn['Collection Name'],
                        contents: undefined
                    },
                    systemCall: {
                        command: 'getCollectionContents',
                        section: 'collectionMethods',
                        method: 'post',
                        data: {
                            collectionName: val.actionCastOn['Collection Name']
                        }
                    },
                    config: {
                        // pane_width:'1000px'
                    }
                })
            break
            case "Categories":
                this.$store.commit(
                    "collections/mutate_Category_being_opened",
                    val.actionCastOn["Collection Name"]
                );
                //
                function getCollectionIndex(collection, name) {
                    let index = 0;
                    collection.map((e, i) => e["Collection Name"] == name && (index = i));
                    return index;
                }
                // open category open
                this.mxnPaneOpenSync('CollectionsCategories',`${val.actionCastOn['Collection Name']} Categories`,{
                        indexOfCollection: getCollectionIndex(this._collections,val.actionCastOn["Collection Name"])
                    },{
                        pane_width: "600px",
                        pane_head_bg_color: "rgb(48, 51, 64)",
                        renderOnce: true
                })
            break
            case "Validation":
            break
            case "Edit Schema":
            break
        }

    },
    onEmptyCollection() {
      this.addNewCollection(false);
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
