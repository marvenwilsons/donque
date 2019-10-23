<template>
  <div class="smscr">
    <listify
      @onActiveHover="onActiveHover"
      @onSelect="select"
      @onContextAction="contextAction"
      @onAddItem="onAddItem"

      :inputData="sample_input_data"
      :config="{
           title: 'pages',
           isNumbered: false, // detemines if the list show numbered list
           propDisplay: 'name', // detemines the display value of each list
           defaultSelected: null, // default selected option on load
           allowFilterSearch: false,
           search: true, // shows the search functionality if true,
           searchBarPlaceHolder: 'Search items',
           contextActions: ['View','Add to playlist','Edit','Delete'],
           contextStyle: 'showOnTheSide', // showOnTheSide, showOnCLickExpand
           showModal:modalState,
           showFilter: true,
       }"
      :appearance="{
           // dimensions
           height: '100%', // required 
           width: '30%', // required

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
           listPadding: 'l', // s m l
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
      <div slot="top" class>
        <!-- top content that will show below the search bar -->
      </div>
      <div slot="bottom">
        <!-- bottom content that will show below the list -->
      </div>
      <div style="background:white;width:; height:; box-shadow:0px 0px 10px 5px #EEEEEF;" class="pad050" slot="modal">
        <!-- your custom modal content -->
        <strong>Loading resources ...</strong>
      </div>
      <div slot="item-icon">
        <!-- icon that will show on each list item -->
        <i class="fas fa-layer-group"></i>
      </div>
    </listify>
  </div>
</template>

<script>
export default {
  data: () => ({
    modalState: false,
    sample_input_data: [
      {
        "name": "Marven Donque",
        age: 28,
        height: "5.4cm",
      },
      {
        name: "Janny Ann Donque",
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
      },
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
  methods: {
    onActiveHover(val) {},
    select(val) { /** fires when user selected or click an item */},
    contextAction(val) { /** fires when user selected an option or action from the context menu */ },
    onAddItem(){ /** fires when user hits the + button beside the search bar it means add item to the list */ 
      this.modalState = !this.modalState
    }
  }
};
</script>

<style>
.smscr {
  scroll-behavior: smooth !important;
}
</style>
