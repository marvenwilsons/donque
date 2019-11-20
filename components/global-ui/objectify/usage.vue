<template>
<!-- @Objectify usage -->
  <div class="pad125">
    <div>
      <!-- Usage of Objectify -->
      <objectifyFlatSettings
        @onChange="change"
        @onError="err"
        @onSubmit="submit"
        @onEmpty="onEmpty"
        @onRemoveProp="onRemoveProp"
        @onData="onData"

        :config="{
          data: r_TestData, // object a schema
          operation:'r', // rw , r
          submit_button: 'DEMO SUBMIT', // string: if supplied the button will appear
          show_modal: modal_state,
          allowRemoveProp: true, // only in read only operations
        }"
        
        :appearance="{
          title_text_color: 'gray',
          sub_title_description_text_color: 'gray',

          wrap_around_border_color: 'lightgray',
          divider_border_color:'lightgray',
          
          keys_bg_color: 'whitesmoke',
          keys_text_color: 'black',
          values_bg_color: 'whitesmoke',
          values_text_color: 'black',

          select_arrow_down_color: 'black',

          button_bg_color: 'blue',
          button_text_color: 'white',

          background_selected: '',

          modal_overlay_bg: 'black'         
        }"
      >
        <div slot="modal" class="pad125 flex flexcenter" style="background:white;" ><pre>{{submit_data}}</pre></div>
      </objectifyFlatSettings>
      <!-- done usage -->
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: "Files",
      pane_width: "90%"
    });
  },

  data: () => ({
    submit_data: undefined,
    modal_state: false,
    r_TestData: {
      BookName:'String',
      BookAuthor: 'String',
      YearMade: 'String',
      Sale: 'Number',
      Publishing: 'String'
    },
    rw_TestData: {
      // Normal
      id: {
        type: "string",
        minChar: 3,
        maxChar: 20,
        allowSpecialChars: false,
        allowWhiteSpace: false,
        hoverInfo: "Element Id",
        default: undefined
      },
      name: {
        type: "string",
        minChar: 1,
        maxChar: 100,
        default: null,
        renderCondition: {
          controllers: ['id'],
          method: schema => {
            if(schema.id.default) {
              return schema.id.default.length > 5
            }
          }
        }
      },
      tabindex: {
        type: "number",
        min: 0,
        max: 999,
        step: 1,
        default: null,
        renderCondition: {
          controllers: ['id', 'name'],
          method: schema => {
            if(schema.id.default) {
              return schema.id.default.length > 2 && schema.name.default == 'test'
            }
          }
        }
      },
      // 
      isAList: {
        type: "select",
        options: ["Yes", "No"],
        default: 1,
        hoverInfo: "dq-studio global attribute: re renders element repeatedly",
        renderCondition: {
          controllers: ['tabindex'],
          method: schema => schema.tabindex.default == 5
        }
      },
      /**
       * list origin from depends on isAList value
       */
      "list origin from": {
        type: "select",
        options: ["models", "collections"],
        default: null,
        hoverInfo: "dq-studio global attribute: re renders element repeatedly",
        renderCondition: {
          controllers: ['isAList','tabindex'],
          method: schema => schema.isAList.default == 0 && schema.tabindex.default == 5
        }
      },
      /**
       * Collections list and Models depends on isAList value and list origin from value
       */
      "collections list": {
        type: "string",
        minChar: 1,
        maxChar: 900,
        allowWhiteSpace: false,
        default: null,
        renderCondition: {
          controllers: ["list origin from", "isAList"],
          method: schema => schema["list origin from"]["default"] == 1 && schema.isAList.default == 0
        }
      },
      models: {
        type: "string",
        minChar: 1,
        maxChar: 900,
        allowWhiteSpace: false,
        default: null,
        renderCondition: {
          controllers: ["list origin from", "isAList"],
          method: schema => schema["list origin from"]["default"] == 0 && schema.isAList.default == 0
        }
      },
    }
  }),

  methods: {
    // triggers when error occurs
    err(err) {
      // console.log(err)
    },

    // triggers when change occurs
    change(val) {
      // console.log(val)
    },

    // triggers when sumbit button is press
    submit(val) {
      // console.log(val)
      this.submit_data = val
      this.modal_state = true
    },

    // triggers on empty 
    onEmpty() {
      console.log('its not empty!')
    },

    // triggers on prop delete
    onRemoveProp(value) {
      // console.log('prop removed')
      // console.log(value)
    },

    // triggers on every mount
    onData(value) {

    }
  }
};
</script>