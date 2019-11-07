<template>
  <div class="fullheight-percent">
    <div class="fullheight-percent">
      <listify
        :inputData="sample_input_data"
        :config="{
           title: this.data['Collection Name'] + ' Categories total',
           isNumbered: false, // detemines if the list show numbered list
           propDisplay: 'Category Name', // detemines the display value of each list
           defaultSelected: null, // default selected option on load
           allowFilterSearch: false,
           search: true, // shows the search functionality if true,
           searchBarPlaceHolder: 'Search items',
           contextActions: ['View category items','Edit','Delete'],
           contextStyle: 'showOnTheSide', // showOnTheSide, showOnCLickExpand
           showModal:false,
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
      ></listify>
    </div>
  </div>
</template>

<script>
export default {
  props: ["my_pane_index", "data"],
  data: () => ({
    sample_input_data: [
      {
        "Category Name": "Books",
        "Year Created": 28,
      },
      {
        "Category Name": "Staff",
        "Year Created": 10,
      },
      {
        "Category Name": "Products",
        "Year Created": 5,
      },
      {
        "Category Name": "Portfolio",
        "Year Created": 38,
      },
      {
        "Category Name": "q3te",
        "Year Created": 28,
      }
    ]
  }),
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: null,
      pane_width: "500px",
      pane_head_bg_color: "rgb(48, 51, 64)",
      renderOnce: true,
      pane_head_title_color: "white"
    });
  },
  mounted() {
    this.$store.commit("pane_system/alter_pane_config", {
      pane_index: this.my_pane_index,
      alter: {
        title: `${this.data['Collection Name']} Categories`
      }
    });
  }
};
</script>