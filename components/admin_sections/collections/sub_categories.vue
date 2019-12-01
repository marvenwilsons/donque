<template>
  <!-- Sub categories -->
  <div v-dq-disable-horizontal-scrolling class="fullheight-percent">
    <!-- <debug
      :data="{
        $store: {_collections},
        $data: {CategoryName,CollectionName,IndexOfCollection,Selected_RawCategories,Selected_Categories},
        $props:{data,my_pane_index}
      }"
    ></debug>-->
    <!-- dubug end -->
    <div class="fullheight-percent">
      <listify
        @onContextAction="contextAction"
        @onAddItem="addSubCategory"
        :inputData="Selected_Categories"
        :config="{
           title: 'Categories found',
           isNumbered: false, // detemines if the list show numbered list
           propDisplay: 'Category Name', // detemines the display value of each list
           defaultSelected: null, // default selected option on load
           allowFilterSearch: false,
           search: true, // shows the search functionality if true,
           searchBarPlaceHolder: 'Search sub categories',
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
            <i
              v-if="can_be_close"
              @click="modal_State = false"
              class="fas fa-times padright025 pointer"
            ></i>
          </div>
          <!-- add category -->
          <div class="pad125" v-if="modal_Content == 'Add Category'">
            <addSubCategoryModal
              @onCancel="modal_State = false"
              @onRefreshCat="onRefreshCat"
              :can_cancel="Selected_Categories_isEmpty"
              :my_pane_index="my_pane_index - 1"
              :categories="[]"
              :data="data"
            ></addSubCategoryModal>
          </div>
          <!-- rename sub category-->
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
          <!-- delete sub category -->
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
import addSubCategoryModal from "./categories/modals/add_sub";
import { mapGetters } from "vuex";

export default {
  name: "CollectionsSubCategories",
  props: {
    data: Object,
    config: Object,
    my_pane_index: Number
  },
  components: {
    addSubCategoryModal
  },

  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Sub Categories",
      pane_width: "650px",
      pane_head_bg_color: "rgb(48, 51, 64)",
      pane_head_title_color: "white"
    });
  },

  data: () => ({
    raw_Data: undefined,
    modal_State: false,
    modal_Content: undefined,
    modal_ContentObject: undefined,
    cats: undefined,
    count: 0,
    can_be_close: true,

    CategoryName: undefined,
    CollectionName: undefined,
    IndexOfCollection: undefined,
    Selected_RawCategories: undefined,
    Selected_Categories: undefined,
    Selected_Categories_isEmpty: undefined
  }),

  mounted() {
    const { CategoryName, CollectionName, IndexOfCollection } = this.data;
    this.CategoryName = CategoryName;
    this.CollectionName = CollectionName;
    this.IndexOfCollection = IndexOfCollection;

    // set up raw category
    const categories = this._collections[this.IndexOfCollection].Categories;
    this.Selected_RawCategories = this.filter_Categories(
      this.CategoryName,
      categories
    );

    // set up listify data
    this.Selected_Categories = this.construct_Categories(
      this.Selected_RawCategories,
      this.CategoryName
    );

    //
    this.$store.commit("pane_system/alter_pane_config", {
      pane_index: this.my_pane_index,
      alter: {
        title: `Sub categories of: ${this.CategoryName}`
      }
    });
  },

  computed: {
    ...mapGetters({
      _collections: "collections/getAllCollections",
      _getCollection: "collections/getCollection"
    }),
    getSelected_RawCategories() {
      return this.Selected_RawCategories;
    },
    get_RootCategory() {
      // return this.data.actionCastOn["Category Name"];
    },
    get_TransitionCount() {
      return this.data.count;
    }
  },

  watch: {
    get_TransitionCount() {
      this.$store.commit("pane_system/set_pane_config", {
        title: `${this.get_RootCategory}/`,
        pane_width: "650px",
        pane_head_bg_color: "rgb(48, 51, 64)",
        pane_head_title_color: "white"
      });
    },
    modal_State(current, prev) {
      if (current == false) {
        this.modal_Content = undefined;
      }
    },
    _collections(current, prev) {
      // when Collection Name change! it will change in real time too
      // in this view
      this.CollectionName = current[this.IndexOfCollection]["Collection Name"];
      this.$store.commit("pane_system/alter_pane_config", {
        pane_index: this.my_pane_index,
        alter: {
          title: `${this.CollectionName} Categories`
        }
      });

      //
      const categories = current[this.IndexOfCollection].Categories;
      this.Selected_RawCategories = this.filter_Categories(
        this.CategoryName,
        categories
      );

      // set up listify data
      this.Selected_Categories = this.construct_Categories(
        this.Selected_RawCategories,
        this.CategoryName
      );
    },
    data(current, prev) {
      // Category name assign
      this.CategoryName = current.CategoryName;

      // Selected Raw Category an array of string, assign
      const categories = this._collections[this.IndexOfCollection].Categories;
      this.Selected_RawCategories = this.filter_Categories(
        current.CategoryName,
        categories
      );

      // Selected Categories an array of objects, assing
      this.Selected_Categories = this.construct_Categories(
        this.Selected_RawCategories,
        current.CategoryName
      );

      //
      this.$store.commit("pane_system/alter_pane_config", {
        pane_index: this.my_pane_index,
        alter: {
          title: `Sub categories of: ${current.CategoryName}`
        }
      });
    },
    getSelected_RawCategories(current, prev) {
      console.log("current");
      if (current.length == 0) {
        setTimeout(() => {
          this.can_be_close = false;
          this.Selected_Categories_isEmpty = false;
          this.addSubCategory();
        }, 400);
      } else {
        this.Selected_Categories_isEmpty = true;
        this.modal_State = false;
        this.modal_Content = undefined;
      }
    }
  },

  methods: {
    addSubCategory() {
      this.modal_State = true;
      this.modal_Content = "Add Category";
    },
    contextAction(context) {
      if (context.actionName) {
        // console.log(this._collections[this.IndexOfCollection]['Collection Name'])
        let obj = {};
        // this is a hack just to make the sub_Category component always
        // triggers the vue watch property
        this.count++;

        // have to close the pane every sub category triggers
        // so that it will re new the data always.
        this.$store.dispatch("pane_system/close", this.my_pane_index + 1);

        // additional data to pass
        obj.count = this.count;
        obj.CategoryName = context.actionCastOn["Category Name"];
        obj.CollectionName = this._collections[this.IndexOfCollection][
          "Collection Name"
        ];
        obj.IndexOfCollection = this.IndexOfCollection;

        // open pane
        this.$store.dispatch("pane_system/open", {
          name: "CollectionsSubCategories",
          index: this.my_pane_index,
          pane_width: "650px",
          renderOnce: true,
          pane_head_bg_color: "green",
          data: obj
        });
      }
    },
    onRefreshCat(value) {
      const parse_RawCategories = raw_Array_of_Categories => {
        let parsed_categories = [];

        // start
        raw_Array_of_Categories.map(raw_category => {
          parsed_categories.push({ "Category Name": raw_category });
        });

        // done
        return parsed_categories;
      };
      // console.log(value)
      this.modal_State = false;
      this.data.categories = value;
      this.cats = parse_RawCategories(value.categories);
    },
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
    construct_Categories(Categories, CategoryName) {
      /**
       * function to construct the category object, to be use
       * in listify as the main input data
       */
      const parse_RawCategories = raw_Array_of_Categories => {
        let parsed_categories = [];
        // start
        raw_Array_of_Categories.map(raw_category => {
          parsed_categories.push({ "Category Name": raw_category });
        });
        // done
        return parsed_categories;
      };

      /**
       * if the category name does not have a hash in it, then only show the
       * relatives category that has one hash in it.
       *
       * the logic goes encrementaly, if category name has a hash then only show the
       * relatives category that has two hashes in it,
       * 0  hash == show 1 hash category
       * 1  hash == show 2 hash category
       * 2  hash == show 3 hash category
       * and so on ..
       */
      const current_HashState = CategoryName.split("/").length - 1;
      const lookFor_category_that_has_hashesh_of = current_HashState + 1;
      let Container_for_categories_correct_hash_amount = [];
      Categories.map(cats => {
        if (
          cats.split("/").length - 1 ==
          lookFor_category_that_has_hashesh_of
        ) {
          Container_for_categories_correct_hash_amount.push(cats);
        }
      });

      // parse and use
      return parse_RawCategories(Container_for_categories_correct_hash_amount);
    }
  }
};
</script>