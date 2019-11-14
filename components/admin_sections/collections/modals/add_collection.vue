<template>
  <!-- Can be use also on Edit Schema -->
  <div class="margintop125 relative flex flexcol">
    <div v-if="isLoading"  class="absolute fullwidth fullheight-percent flex flexcenter"><strong>loading...</strong></div>
    <div v-if="!isLoading" class="relative" style="height:200px;border:1px solid lightgray;overflow:auto;">
      <div class="absolute fullwidth">
        <div v-if="Show_Objectify" class="flex">
          <div class="flex1">Key</div>
          <div class="flex2">
            <span style="margin-left:20px;">Type</span>
          </div>
        </div>
        <objectifyFlatSettings
          v-if="Show_Objectify"
          :config="{
            title: null, // string
            sub_title_description_text: null,
            data: Latest_SchemaModel ? Latest_SchemaModel : {}, // object a schema
            operation:'r', // rw , r
            submit_button: null, // string: if supplied the button will appear
            show_modal: false
            }"
          :appearance="{
            title_text_color: 'gray',
            sub_title_description_text_color: 'gray',

            wrap_around_border_color: 'white',
            divider_border_color:'lightgray',
            
            keys_bg_color: '#f1f2f5', // editLater
            keys_text_color: 'black',
            values_bg_color: '#f1f2f5', // editLater
            values_text_color: 'black',

            select_arrow_down_color: 'black',

            button_bg_color: 'blue',
            button_text_color: 'white',

            background_selected: '',

            modal_overlay_bg: 'black'         
            }"
        ></objectifyFlatSettings>
      </div>
    </div>
    <div v-if="Err">
      <div class="err backgrounderr pad050">{{Err}}</div>
    </div>
    <div>
      <div>
        <input
          id="ANC_inp_cn"
          v-model="Model_Collection_Name"
          placeholder="Collection Name"
          class="pad025 fullwidth"
          type="text"
        />
      </div>
    </div>
    <div v-if="Model_Collection_Name" class="flex">
      <input
        id="ANC_inp"
        v-model="SchemaModel_TextInput"
        placeholder="key name"
        class="pad025"
        type="text"
      />
      <select v-model="SchemaModel_SelectInput" class="fullwidth">
        <option>Any</option>
        <option>String</option>
        <option>Number</option>
        <option>Boolean</option>
        <option>Date</option>
        <option>Article</option>
        <option>file_sys_ref</option>
      </select>
      <button @click="SchemaModel_AddSchema_Property">
        <i class="fas fa-plus pointer pad050"></i>
      </button>
    </div>
    <div
      v-if="Show_Objectify && !SchemaModel_SelectInput && !SchemaModel_TextInput"
      class="margintop125 flex flexend"
    >
      <button @click="Create_Collection" class="buttonreset pad050 buttonBlue">
        <strong>Create collection</strong>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    SchemaModel: undefined,
    SchemaModel_TextInput: undefined,
    SchemaModel_SelectInput: undefined,
    Model_Collection_Name: undefined,
    Show_Objectify: false,
    Err: false,
    isLoading: false,
  }),
  computed: {
    Latest_SchemaModel() {
      return this.SchemaModel;
    }
  },
  watch: {
    Latest_SchemaModel() {
      this.Show_Objectify = false;
      setTimeout(() => {
        this.Show_Objectify = true;
      }, 0);
    }
  },
  mounted() {
    document.getElementById("ANC_inp_cn").focus();
  },
  methods: {
    SchemaModel_AddSchema_Property() {
      if (!this.SchemaModel_SelectInput) {
        this.Err = "Type cannot be undfined";
      } else if (!this.SchemaModel_TextInput) {
        this.Err = "Key name cannot be undefined";
      } else {
        this.Err = false;
        let x = { ...this.SchemaModel };
        x[this.SchemaModel_TextInput] = this.SchemaModel_SelectInput;

        this.SchemaModel = x;
        this.SchemaModel_TextInput = undefined;
        this.SchemaModel_SelectInput = undefined;
      }
    },
    Create_Collection() {
      this.isLoading = true
      this.$emit("onCreateCollectionDone");
      // SystemCall create new collection
      this.$store
        .dispatch("systemCall", {
          command: "addCollection",
          section: "collectionMethods",
          data: {
            collection_name: this.Model_Collection_Name,
            schema: this.Latest_SchemaModel
          },
          method: "post"
        })
        .then(({ data, status }) => {
          if (status) {
            this.isLoading = false
            this.$emit('onCollectionCreated')
          } else {
            this.isLoading = false
            this.Err = data.actions[0].msg;
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  }
};
</script>