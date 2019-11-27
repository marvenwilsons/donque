<template>
  <!-- Sub categories -->
  <div v-dq-disable-horizontal-scrolling class="fullheight-percent">
    <debug :data="{
        data, 
        $data:{modal_State,raw_Data,modal_Content,modal_ContentObject,cats},
        $computed: {get_RootCategory,get_SubCategories},
      }"></debug>
      <!-- dubug end -->
    <div class="fullheight-percent">
      <listify
        @onContextAction="contextAction"
        @onAddItem="addSubCategory"
        :inputData="cats == undefined ? get_SubCategories : cats"
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
            <i @click="modal_State = false" class="fas fa-times padright025 pointer"></i>
          </div>
          <!-- add category -->
          <div class="pad125" v-if="modal_Content == 'Add Category'">
            <addSubCategoryModal
              @onCancel="modal_State = false"
              @onRefreshCat="onRefreshCat"
              @onWritingData="onWritingData"
              :my_pane_index="my_pane_index - 1"
              :categories="get_SubCategories"
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
import addSubCategoryModal from './categories/modals/add_sub'

export default {
  props: {
    data: Object,
    categories: Array,
    config: Object,
    my_pane_index: Number
  },
  components: {
    addSubCategoryModal
  },

  beforeCreate() {
    console.log("vefore create!");
    this.$store.commit("pane_system/set_pane_config", {
      title: "Sub Categories",
      pane_width: "750px",
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
  }),

  computed: {
    parse_RawCategories(raw_Array_of_Categories) {
      let parsed_categories = [];

        // start
        raw_Array_of_Categories.map(raw_category => {
          parsed_categories.push({ "Category Name": raw_category });
        });

        // done
        return parsed_categories;
    },
    get_RootCategory() {
      return this.data.actionCastOn["Category Name"];
    },
    get_TransitionCount() {
      return this.data.count;
    },
    get_SubCategories() {
      const parse_RawCategories = raw_Array_of_Categories => {
        let parsed_categories = [];

        // start
        raw_Array_of_Categories.map(raw_category => {
          parsed_categories.push({ "Category Name": raw_category });
        });

        // done
        return parsed_categories;
      };

      // parse and use
      return parse_RawCategories(this.data.categories);
    }
  },

  watch: {
    get_TransitionCount() {
      this.$store.commit("pane_system/set_pane_config", {
        title: `${this.get_RootCategory}/`,
        pane_width: "850px",
        pane_head_bg_color: "rgb(48, 51, 64)",
        pane_head_title_color: "white"
      });
    },
    modal_State(current,prev) {
      if(current == false) {
        this.modal_Content = undefined
      }
    }
  },

  methods: {
    addSubCategory() {
      this.modal_State = true
      this.modal_Content = 'Add Category'
    },
    contextAction() {},
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
      this.modal_State = false
      this.data.categories = value
      this.cats = parse_RawCategories(value.categories)
    }
  }
};
</script>