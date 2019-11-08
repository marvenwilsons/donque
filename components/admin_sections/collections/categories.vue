<template>
  <div class="fullheight-percent">
    <div class="fullheight-percent">
      <listify
        @onContextAction="contextAction"
        :inputData="sample_input_data"
        :config="{
           title: this.data['Collection Name'] + ' Categories total',
           isNumbered: false, // detemines if the list show numbered list
           propDisplay: 'Category Name', // detemines the display value of each list
           defaultSelected: null, // default selected option on load
           allowFilterSearch: false,
           search: true, // shows the search functionality if true,
           searchBarPlaceHolder: 'Search items',
           contextActions: ['View category items','Sub Category','Rename','Delete'],
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
        <div
          style="background:white; width:420px; box-shadow:0px 0px 10px 5px #EEEEEF;"
          slot="modal"
        >
          <!-- editLater - style -->
          <div
            style="background: rgb(48, 51, 64);color:white;border-top-left-radius:5px;border-top-right-radius:5px;"
            class="flex spacebetween flexcenter pad050"
          >
            <strong class="padleft050">{{modal_Content}}</strong>
            <i @click="modal_State = false" class="fas fa-times padright025 pointer"></i>
          </div>
          <!-- rename -->
          <div class="pad125" v-if="modal_Content == 'Rename Category'">
            <div class="">
              <strong>New Name:</strong>
              <input id="dq-cat-rename-modal" class="fullwidth pad025" type="text">
            </div>
            <div class="margintop050 flex flexend">
                <button class="buttonreset pad050">Save</button>
                <span class="pad025"></span>
                <button @click="modal_State = false" class="buttonreset pad050">Cancel</button>
              </div>
          </div>
          <!-- delete category -->
          <div v-if="modal_Content == 'Delete'" class="pad125">
            <div>
              <strong>Are you sure you want to delete "{{modal_ContentObject['Category Name']}}" category?</strong>
              <br />
              <div class="pad050 margintop050 backgrounderr">
                Notice: After this category been deleted all of the collection entries that used to have this category
                will be in "no-category" category.
              </div>
              <div class="margintop050 flex flexend">
                <button class="buttonreset pad050">Yes Delete {{modal_ContentObject['Category Name']}} Category</button>
                <span class="pad025"></span>
                <button @click="modal_State = false" class="buttonreset pad050">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </listify>
    </div>
  </div>
</template>

<script>
export default {
  props: ["my_pane_index", "data"],
  data: () => ({
    modal_State: false,
    modal_Content: undefined,
    modal_ContentObject: undefined,
    sample_input_data: [
      {
        "Category Name": "Horror",
        "Year Created": 28
      },
      {
        "Category Name": "Love Story",
        "Year Created": 10
      },
      {
        "Category Name": "Childs Story",
        "Year Created": 5
      },
      {
        "Category Name": "Mystery",
        "Year Created": 38
      },
      {
        "Category Name": "SciFi",
        "Year Created": 28
      }
    ]
  }),
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: null,
      pane_width: "40%",
      pane_head_bg_color: "rgb(48, 51, 64)",
      renderOnce: true,
      pane_head_title_color: "white"
    });
  },
  methods: {
    contextAction(val) {
      if (val.actionName === "View category items") {
        this.$store.dispatch("pane_system/open", {
          name: "ViewCatItems",
          index: this.my_pane_index,
          data: val.actionCastOn
        });
      }

      if (val.actionName === "Rename") {
        this.modal_State = true;
        this.modal_Content = 'Rename Category'
        setTimeout(() => {
          document.getElementById('dq-cat-rename-modal').focus()
        }, 10);
      }

      if (val.actionName === "Delete") {
        this.modal_State = true;
        this.modal_Content = 'Delete'
        this.modal_ContentObject = val.actionCastOn
        setTimeout(() => {
          document.getElementById('dq-cat-rename-modal').focus()
        }, 10);
      }

      if (val.actionName === "Sub Category") {
        this.$store.dispatch("pane_system/open", {
          name: "CollectionsCategories",
          index: this.my_pane_index,
          data: val.actionCastOn
        });
      }
    }
  },
  mounted() {
    this.$store.commit("pane_system/alter_pane_config", {
      pane_index: this.my_pane_index,
      alter: {
        title: `${this.data["Collection Name"]} Categories`
      }
    });
  }
};
</script>