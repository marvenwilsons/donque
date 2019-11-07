<template>
  <!-- @collections html -->
  <div class="fullheight-percent">
    <listify
      @onAddItem="addNewCollection"
      @onContextAction="contextAction"
      :inputData="sample_input_data"
      :config="{
           title: 'Collections total',
           isNumbered: false, // detemines if the list show numbered list
           propDisplay: 'Collection Name', // detemines the display value of each list
           defaultSelected: null, // default selected option on load
           allowFilterSearch: false,
           search: true, // shows the search functionality if true,
           searchBarPlaceHolder: 'Search items',
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
      :appearance="{
           // dimensions
           height: '100%', // required 
           width: '100%', // required

           // text
           textColor: '#196ADD',

           // border colors
           borderColor: '#F1F8FF',
           listBorderColor: '#e8f4f8',
           searchBoxBorderColor: 'lightgray',

           // backgrounds
           bodyBg:'white',
           searchBarBgColor: '#F1F8FF',
           searchBarTextColor: '#24292E',
           modalBgOverlay: 'white',
           odds: 'white', // background of odd index item in the list
           evens: 'white', // background of even index item in the list

           // hovers
           hoverTextColor: '#196ADD',
           hoverBgColor: '#F1F8FF',
           hoverCustomStyle: {
               fontWeight: 700,
           },

           // list padding
           listPadding: 'm', // s m l
           listContainerPadding: true, // true false

           // active
           activeTextColor: 'white',
           activeBgColor: 'lightblue',
           acitveCustomStyle: {
              // fontWeight: 700,
              // padding:'5px',
           }

       }"
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
            <modalAddCollection :data="null"></modalAddCollection>
          </div>
          <div v-if="modal_Content == 'Edit Schema'" class="pad125">
            <modalAddCollection :data="null"></modalAddCollection>
          </div>
          <div v-if="modal_Content == 'Delete A Collection'" class="pad125">
            <div>
              <strong>Are you sure you want to delete collection "{{modal_ContentObject['Collection Name']}}"?</strong>
              <br />
              <div class="pad050 margintop050 backgrounderr">
                Notice: Once deleted all of the data connected to {{modal_ContentObject['Collection Name']}} collection
                will be lost forever.
              </div>
              <div class="margintop050 flex flexend">
                <button class="buttonreset pad050">Yes Delete {{modal_ContentObject['Collection Name']}}</button>
                <span class="pad025"></span>
                <button @click="modal_State = false" class="buttonreset pad050">Cancel</button>
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
    sample_input_data: [
      {
        "Collection Name": "Books",
        age: 28,
      },
      {
        "Collection Name": "Staff",
        age: 10,
      },
      {
        "Collection Name": "Products",
        age: 5,
      },
      {
        "Collection Name": "Portfolio",
        age: 38,
      },
      {
        "Collection Name": "q3te",
        age: 28,
      }
      // {
      //   name: "qwetdfsb",
      //   age: 30,
      //   height: "2,0cm"
      // },
      // {
      //   name: "asd2ry",
      //   age: 2,
      //   height: "5.4cm"
      // },
      // {
      //   name: "kiven",
      //   age: 10,
      //   height: "5.2cm"
      // },
      // {
      //   name: "ann",
      //   age: 28,
      //   height: "2,0cm"
      // },
      // {
      //   name: "anthony",
      //   age: 28,
      //   height: "5.4cm"
      // },
      // {
      //   name: "neil",
      //   age: 28,
      //   height: "5.2cm"
      // },
      // {
      //   name: "chefy",
      //   age: 28,
      //   height: "2,0cm"
      // },
      // {
      //   name: "adan",
      //   age: 28,
      //   height: "5.4cm"
      // },
      // {
      //   name: "trump",
      //   age: 28,
      //   height: "5.2cm"
      // },
      // {
      //   name: "person",
      //   age: 28,
      //   height: "2,0cm"
      // },
      // {
      //   name: "donal",
      //   age: 28,
      //   height: "5.4cm"
      // },
      // {
      //   name: "test",
      //   age: 28,
      //   height: "5.2cm"
      // },
      // {
      //   name: "hello",
      //   age: 28,
      //   height: "2,0cm"
      // },
      // {
      //   name: "shella",
      //   age: 28,
      //   height: "5.4cm"
      // },
      // {
      //   name: "rust",
      //   age: 28,
      //   height: "5.2cm"
      // },
      // {
      //   name: "ford",
      //   age: 28,
      //   height: "2,0cm"
      // },
      // {
      //   name: "tellf",
      //   age: 28,
      //   height: "5.4cm"
      // },
      // {
      //   name: "quin",
      //   age: 28,
      //   height: "5.2cm"
      // }
    ]
  }),
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Data Collections",
      pane_width: "600px",
      pane_head_bg_color: "rgb(48, 51, 64)",
      pane_head_title_color: "white"
    });
  },
  components: {
    modalAddCollection: modal_AddCollection
  },
  methods: {
    addNewCollection() {
      this.modal_State = true;
      this.modal_Content = "Create Collection";
    },
    contextAction(val) {
      if (val.actionName == "Edit Schema") {
        this.modal_State = true;
        this.modal_Content = "Edit Schema";
      }
      if (val.actionName == "Delete") {
        this.modal_State = true;
        this.modal_ContentObject = val.actionCastOn;
        this.modal_Content = "Delete A Collection";
      }
      if (val.actionName == "Add New Entry") {
        this.$store.dispatch("pane_system/open", {
          name: "CollectionsAddEntry",
          index: this.my_pane_index,
          data: val.actionCastOn
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
</style>
