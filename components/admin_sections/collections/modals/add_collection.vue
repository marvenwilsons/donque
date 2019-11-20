<template>
  <!-- Can be use also on Edit Schema -->
  <div class="margintop125 relative flex flexcol">
    <div v-if="isLoading" class="absolute fullwidth fullheight-percent flex flexcenter">
      <strong>loading...</strong>
    </div>
    <div>
      <div class="flex flexcol">
        <transition name="fade" appear mode="out-in">
          <span
            v-if="shouldUpdate_CollectionName"
            class="marginbottom050 backgroundinfo pad050 borderRad4 flex spacebetween"
          >
            <span>Collection name has changed</span>
            <span
              @click="undo(initial_CollectionName,'collectionName')"
              style="border-bottom: 1px dashed #1087CE"
              class="pointer"
            >undo</span>
          </span>
        </transition>
        <transition name="fade" appear mode="out-in">
          <span
            v-if="shouldUpdate_Schema"
            class="marginbottom050 backgroundinfo pad050 borderRad4 flex spacebetween"
          >
            <span>Collection schema has changed</span>
            <span
              @click="undo(initial_Schema,'schema')"
              style="border-bottom: 1px dashed #1087CE"
              class="pointer"
            >undo</span>
          </span>
        </transition>
      </div>
    </div>
    <div
      v-if="!isLoading"
      class="relative"
      style="height:200px;border:1px solid lightgray;overflow:auto;"
    >
      <div class="absolute fullwidth">
        <div v-if="Show_Objectify" class="flex">
          <div class="flex1">Key</div>
          <div class="flex2">
            <span style="margin-left:20px;">Type</span>
          </div>
        </div>
        <objectifyFlatSettings
          v-if="Show_Objectify"
          @onRemoveProp="onRemoveProp"
          @onData="onData"
          :config="{
            title: null, // string
            sub_title_description_text: null,
            data: Latest_SchemaModel ? Latest_SchemaModel : {}, // object a schema
            operation:'r', // rw , r
            submit_button: null, // string: if supplied the button will appear
            show_modal: false,
            allowRemoveProp: true
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
          class="pad050 fullwidth"
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
        <option>Short String</option>
        <option>Long String</option>
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
      <button
        v-if="mode == 'Add Collection'"
        @click="Create_Collection"
        class="buttonreset pad050 buttonBlue"
      >
        <strong>Create collection</strong>
      </button>
      <div v-if="mode == 'Edit Collection'">
        <button
          v-if="shouldUpdate_Schema || shouldUpdate_CollectionName"
          @click="Edit_Collection"
          class="buttonreset pad050 buttonBlue borderRad4"
        >
          <strong>Apply Changes</strong>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data: () => ({
    SchemaModel: undefined,
    SchemaModel_TextInput: undefined,
    SchemaModel_SelectInput: undefined,
    Model_Collection_Name: undefined,
    Show_Objectify: false,
    Err: false,
    isLoading: false,
    mode: undefined,
    shouldUpdate_Schema: false,
    shouldUpdate_CollectionName: false,
    initial_Schema: undefined,
    initial_CollectionName: undefined
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
    },
    SchemaModel(current, prev) {
      this.shouldUpdate_Schema = prev != undefined;
    },
    Model_Collection_Name(current, prev) {
      this.shouldUpdate_CollectionName = prev != undefined;
    }
  },
  mounted() {
    document.getElementById("ANC_inp_cn").focus();
    if (this.data) {
      console.log("Edit collection");
      this.Model_Collection_Name = this.data["Collection Name"];
      this.SchemaModel = this.data.schema;
      this.mode = "Edit Collection";

      const copy = o => {
        if (o === null) return null;

        var output, v, key;
        output = Array.isArray(o) ? [] : {};
        for (key in o) {
          v = o[key];
          output[key] = typeof v === "object" ? copy(v) : v;
        }

        return output;
      };
      const nschema = copy(this.data.schema);
      this.initial_Schema = nschema;
      this.initial_CollectionName = this.data["Collection Name"];
    } else {
      this.mode = "Add Collection";
    }
  },
  methods: {
    Edit_Collection() {
      this.$store
        .dispatch("systemCall", {
          command: "updateCollectionSchema",
          section: "collectionMethods",
          data: {
            old_collection_name: this.initial_CollectionName,
            new_collection_name: this.shouldUpdate_CollectionName
              ? this.Model_Collection_Name
              : null,
            new_schema: this.shouldUpdate_Schema ? this.SchemaModel : null,
            current_collectionName: this.Model_Collection_Name
          },
          method: "post"
        })
        .then(({ data, status }) => {
          // console.log(data.payload)

          this.$emit("onEditSchemaDone");
          if (status) {
            this.$emit("onCollectionCreated");
          } else {
            this.Err = data.actions[0].msg;
          }
        })
        .catch(err => {
          alert(err);
        });
    },
    undo(data, to_update) {
      if (to_update === "collectionName") {
        this.shouldUpdate_CollectionName = false;
        setTimeout(() => {
          this.shouldUpdate_CollectionName = false;
        }, 0);
        this.Model_Collection_Name = data;
      } else if (to_update === "schema") {
        this.SchemaModel = data;
        this.shouldUpdate_Schema = false;
        setTimeout(() => {
          this.shouldUpdate_Schema = false;
        }, 0);
      }
    },
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
    onRemoveProp(val) {
      this.SchemaModel = val;
    },
    onData(val) {
      this.SchemaModel = val;
    },
    Create_Collection() {
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
            this.$emit("onCollectionCreated");
          } else {
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

<style>
#ANC_inp_cn {
  border-top: none;
  border-bottom: none;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
}
.cb {
  border: 1px solid lightgray;
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.3s ease;
}
.fade-leave-active {
  transition: opacity 0.3s ease;
  opacity: 0;
}
</style>