<template>
  <div class="fullheight-percent">
    <!-- {{mode == 'collection' ? get_Categories : get_SubCategory}} -->
    <!-- {{my_pane_index - 1}} -->
    <div class="fullheight-percent">
      <listify
        @onContextAction="contextAction"
        @onAddItem="addCategory"
        :inputData="mode == 'collection' ? get_Categories : get_SubCategory"
        :config="{
           title: this.data['Collection Name'] ? this.data['Collection Name'] + ' found' : ' Categories found',
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
          <!-- add category -->
          <div class="pad125" v-if="modal_Content == 'Add Category'">
            <addCatModal
              @onCancel="modal_State = false"
              @onRefreshCat="onRefreshCat"
              @onWritingData="onWritingData"
              :my_pane_index="my_pane_index - 1"
              :categories="mode == 'collection' ? get_Categories : get_SubCategory"
              :data="data"
            ></addCatModal>
          </div>
          <!-- loading -->
          <div class="pad125" v-if="modal_Content == 'loading'">
            <div>Writing ...</div>
          </div>
          <!-- rename -->
          <div class="pad125" v-if="modal_Content == 'Rename Category'">
            <div class>
              <strong>New Name:</strong>
              <input id="dq-cat-rename-modal" class="fullwidth pad025" type="text" />
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
                <button
                  class="buttonreset pad050"
                >Yes Delete {{modal_ContentObject['Category Name']}} Category</button>
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
import addCatModal from "./categories/modals/add";
export default {
  props: ["my_pane_index", "my_pane", "data"],
  data: () => ({
    raw_Data: undefined,
    modal_State: false,
    modal_Content: undefined,
    modal_ContentObject: undefined,
    mode: undefined,
    sample_input_data: [
      {
        "Category Name": "Horror"
      },
      {
        "Category Name": "Love Story"
      },
      {
        "Category Name": "Childs Story"
      },
      {
        "Category Name": "Mystery"
      },
      {
        "Category Name": "SciFi"
      }
    ]
  }),
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: null,
      pane_width: "600px",
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
        this.modal_Content = "Rename Category";
        setTimeout(() => {
          document.getElementById("dq-cat-rename-modal").focus();
        }, 10);
      }

      if (val.actionName === "Delete") {
        this.modal_State = true;
        this.modal_Content = "Delete";
        this.modal_ContentObject = val.actionCastOn;
        setTimeout(() => {
          document.getElementById("dq-cat-rename-modal").focus();
        }, 10);
      }

      if (val.actionName === "Sub Category") {
        console.log("sub category!");
        console.log(this.data.actionCastOn["Collection Name"]);
        //
        val.actionCastOn["Collection Name"] = this.data.actionCastOn["Collection Name"];
        val.raw_Data = this.raw_Data;

        // console.log(this.raw_Data)
        this.$store.dispatch("pane_system/open", {
          name: "CollectionsCategories",
          index: this.my_pane_index,
          data: val
        });
      }
    },
    addCategory() {
      this.modal_State = true;
      this.modal_Content = "Add Category";
    },
    onRefreshCat(val) {
      console.log("refreshing data!");
      this.raw_Data = val;
      this.modal_State = false;
    },
    onWritingData(val) {
      console.log('lodaing',val)
      if(val) {
        this.modal_Content = 'loading'
      } else {
        this.modal_Content = undefined
        this.modal_State = false
      }
    }
  },
  computed: {
    get_Categories() {
      let o = [];
      if (this.raw_Data) {
        this.raw_Data.map(cats => {
          if (cats.split("/").length == 1) {
            o.push({
              "Category Name": cats
            });
          }
        });
      }
      return o;
    },
    get_SubCategory() {
      let o = [];
      if (this.my_pane_index - 1 > 0) {
        if (this.my_pane) {
          const pane_title = this.my_pane.title.split("sub category")[0].trim();
          if (this.raw_Data) {
            // o = [];

            this.raw_Data.map(cats => {
              if (cats.split("/").length > 1) {
                if (cats.split("/")[this.my_pane_index - 2] == pane_title) {
                  const nextCategory = cats.split("/")[this.my_pane_index - 1];
                  if (!o.includes(nextCategory)) {
                    o.push(nextCategory);
                  }
                }
              }
            });
          }
        }
      }

      const f = o.map(cats => {
        let x = undefined;
        if (cats != undefined) {
          x = { "Category Name": cats };
        }
        return x;
      });

      if (f.includes(undefined)) {
        f.shift();
      }

      return f;
    }
  },
  components: {
    addCatModal
  },
  mounted() {
    console.log("data", this.data);
    if (this.data.raw_Data) {
      this.raw_Data = this.data.raw_Data;
    } else {
      this.raw_Data = this.data.categories;
    }

    // title
    if (this.data.actionName == "Categories") {
      this.mode = "collection";
      this.$store.commit("pane_system/alter_pane_config", {
        pane_index: this.my_pane_index,
        alter: {
          title: `${this.data.actionCastOn["Collection Name"]} Categories`
        }
      });
    } else {
      console.log("category pane!");

      this.mode = "category";
      setTimeout(() => {
        this.$store.commit("pane_system/alter_pane_config", {
          pane_index: this.my_pane_index,
          alter: {
            title: `${this.data.actionCastOn["Category Name"]} sub category`,
          }
        });
      }, 0);

    }
  }
};
</script>