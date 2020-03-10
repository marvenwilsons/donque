<template>
  <div class="fullheight-percent">
    <!-- <debug
      v-dq-disable-horizontal-scrolling
      :data="{
      $store: {
        _collections
      },
      $data: {data,CollectionName,CollectionsRootCategories}
    }"
    ></debug>-->
    <!--  -->
    <div class="fullheight-percent">
      <d-listify
        v-dq-disable-horizontal-scrolling
        @onContextAction="contextAction"
        @onAddItem="addCategory"
        :inputData="CollectionsRootCategories"
        :config="{
           title: 'Categories found',
           isNumbered: false, // detemines if the list show numbered list
           propDisplay: 'Category Name', // detemines the display value of each list
           defaultSelected: null, // default selected option on load
           allowFilterSearch: false,
           search: true, // shows the search functionality if true,
           searchBarPlaceHolder: 'Search categories',
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
            <div v-if="loading_Content == 'Category'">Adding Category ...</div>
            <addCatModal
              v-show="loading_Content != 'Category'"
              @onCancel="modal_State = false"
              @onRefreshCat="onRefreshCat"
              @onWritingData="onWritingData"
              :my_pane_index="my_pane_index - 1"
              :categories="CollectionsRootCategories"
              :data="{CollectionName}"
            ></addCatModal>
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
      </d-listify>
    </div>
  </div>
</template>

<script>
import addCatModal from "./categories/modals/add_root";
import subCategory from "./sub_categories";
import { mapGetters } from "vuex";

export default {
  props: ["my_pane_index", "my_pane", "data"],
  data: () => ({
    CollectionName: undefined,
    CollectionsRootCategories: undefined,

    // old
    modal_State: false,
    modal_Content: undefined,
    loading_Content: undefined,
    modal_ContentObject: undefined,
    mode: undefined,
    count: 0
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
  computed: {
    ...mapGetters({
      _collections: "collections/getAllCollections",
      _getCollection: "collections/getCollection"
    })
  },
  watch: {
    _collections(current, prev) {
      /**
       * Only triggers when there is change in collection object
       * mutating title of the pane
       */
      const indexOfCollection = this.data.indexOfCollection;
      this.CollectionName = current[indexOfCollection]["Collection Name"];
      this.$store.commit("pane_system/alter_pane_config", {
        pane_index: this.my_pane_index,
        alter: {
          title: `${this.CollectionName} Categories`
        }
      });

      this.CollectionsRootCategories = this.get_RootCategories(
        current[indexOfCollection].Categories
      );
    }
  },
  methods: {
    filter_Categories(expect_for, all_Categories) {
      /**
       * filters the raw array of categories
       * it will only return the set of strings that has
       * the value of "expect_for" in it
       */
      let final = [];

      // start
      all_Categories.map(categories => {
        if (categories.includes(`${expect_for}/`)) {
          final.push(categories);
        }
      });

      // fire away!
      return final;
    },
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
        let obj = {};
        // this is a hack just to make the sub_Category component always
        // triggers the vue watch property
        this.count++;

        // have to close the pane every sub category triggers
        // so that it will re new the data always.
        this.$store.dispatch("pane_system/close", this.my_pane_index + 1);

        // additional data to pass
        // val.categories = this.filter_Categories(
        //   val.actionCastOn["Category Name"],
        //   this.raw_Data
        // ); // retunrs  an array of strings

        obj.count = this.count;
        obj.CategoryName = val.actionCastOn["Category Name"];
        obj.CollectionName = this._collections[this.data.indexOfCollection][
          "Collection Name"
        ];
        obj.IndexOfCollection = this.data.indexOfCollection;

        // open pane
        this.$store.dispatch("pane_system/open", {
          name: "CollectionsSubCategories",
          index: this.my_pane_index,
          pane_width: "600px",
          pane_head_bg_color: "rgb(48, 51, 64)",
          renderOnce: true,
          data: obj
        });
      }
    },
    addCategory() {
      this.modal_State = true;
      this.modal_Content = "Add Category";
    },
    get_RootCategories(ArrayOfCategories) {
      // takes an array of strings (categories), loop over each item (type string), if the item
      // has slash in it that item will be ignored and that item that doesnt have slash in it will be
      // push to that "Transformed_ArrayOfCategories" inclosed in an Object with a key of "Category Name"
      let Transformed_ArrayOfCategories = [];
      ArrayOfCategories.map(cats => {
        if (cats.split("/").length == 1) {
          Transformed_ArrayOfCategories.push({
            "Category Name": cats
          });
        }
      });
      return Transformed_ArrayOfCategories;
    },
    onRefreshCat(val) {
      this.raw_Data = val.categories;
    },
    onWritingData(val) {
      if (val) {
        this.loading_Content = val;
      } else {
        this.modal_Content = undefined;
        this.modal_State = false;
        this.loading_Content = val;
      }
    }
  },
  components: {
    addCatModal,
    subCategory
  },
  mounted() {
    /**
     * Assigning Title
     */
    const CollectionName = this._collections[this.data.indexOfCollection][
      "Collection Name"
    ];
    this.CollectionName = CollectionName;
    this.$store.commit("pane_system/alter_pane_config", {
      pane_index: this.my_pane_index,
      alter: {
        title: `${CollectionName} Root Categories`
      }
    });

    /**
     * Assigning Root Categories
     */
    const Raw_ChoosenCategory = this._collections[this.data.indexOfCollection]
      .Categories;

    // assign parsed categories (Array of Objects)
    this.CollectionsRootCategories = this.get_RootCategories(
      Raw_ChoosenCategory
    );
    setTimeout(() => {
      if (this.CollectionsRootCategories.length == 0) {
        this.addCategory();
      }
    }, 0);
  }
};
</script>