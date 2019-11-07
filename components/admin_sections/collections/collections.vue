<template>
  <!-- @collections html -->
  <div class="fullheight-percent">
    <listify
      @onAddItem="addNewCollection"
      :inputData="sample_input_data"
      :config="{
           title: 'Collections total',
           isNumbered: false, // detemines if the list show numbered list
           propDisplay: 'name', // detemines the display value of each list
           defaultSelected: null, // default selected option on load
           allowFilterSearch: false,
           search: true, // shows the search functionality if true,
           searchBarPlaceHolder: 'Search items',
           contextActions: ['Add New Entry','View All','Categories','Delete','Edit Schema'],
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
        <div
          class=""
          style="background:white; width:420px; box-shadow:0px 0px 10px 5px #EEEEEF;"
        >
        <!-- editLater - style -->
          <div style="background: rgb(48, 51, 64);color:white;border-top-left-radius:5px;border-top-right-radius:5px;" class="flex spacebetween flexcenter pad050">
            <strong class="padleft050">Add New Collection</strong>
            <i @click="modal_State = false" class="fas fa-times padright025 pointer"></i>
          </div>
          <div class="pad125">
              <modalAddCollection></modalAddCollection>
          </div>
        </div>
      </div>
    </listify>
  </div>
</template>

<script>
import modal_AddCollection from "./modals/add_collection";

export default {
  data: () => ({
    modal_State: false,
    sample_input_data: [
      {
        name: "Books",
        age: 28,
        height: "5.4cm"
      },
      {
        name: "Staff",
        age: 10,
        height: "5.2cm"
      },
      {
        name: "troy",
        age: 5,
        height: "2,0cm"
      },
      {
        name: "asfdfd",
        age: 38,
        height: "5.4cm"
      },
      {
        name: "q3te",
        age: 28,
        height: "5.2cm"
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
      pane_head_title_color: 'white'
    });
  },
  components: {
    modalAddCollection: modal_AddCollection
  },
  methods: {
    addNewCollection() {
      this.modal_State = true;
    }
  }
};
</script>

<style>
/* editLater - css */
.buttonBlue{
    background: #0086c0;
    color:white;
}
</style>
